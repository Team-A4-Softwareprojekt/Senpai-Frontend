import React, {useEffect, useState, useContext} from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import {useNavigate} from 'react-router-dom';
import {ManipulationPlayerContext} from '../../context/manipulationQuestionContext.jsx';
import {PlayerContext} from '../../context/playerContext.jsx';
import {ScoreContext} from "../../context/scoreContext.jsx";
import {socket} from '../../socket.js';
import PopUpManipulationCorrect from '../../popups/popUpManipulation/PopUpManipulationCorrect.jsx';
import PopUpManipulationWrong from '../../popups/popUpManipulation/PopUpManipulationWrong.jsx';
import styles2 from './ManipulationPage.module.css';
import PopUpManipulationRoundEnd from "../../popups/popUpManipulationRoundEnd/PopUpManipulationRoundEnd.jsx";
import PopUpGameWinner from "../../popups/popUpGameWinner/PopUpGameWinner.jsx";
import PopUpGameLoser from "../../popups/popUpGameLoser/PopUpGameLoser.jsx";
import PopUpGameTie from "../../popups/popUpGameTie/PopUpGameTie.jsx";
import ScoresRound from "../../components/scoresRound/ScoresRound.jsx";
import PopUpPlayerManipulationDisconnect from "../../popups/popUpPlayerDisconnected/PopUpPlayerManipulationDisconnect.jsx";

/**
 * ManipulationPage Component
 * 
 * This component renders the manipulation game page where players can manipulate
 * a given piece of code. It provides functionalities to submit the code, execute it,
 * and check the results against the expected output.
 * 
 * Props:
 * - None
 * 
 * Context:
 * - ManipulationPlayerContext: Manages the state of the manipulation question.
 * - PlayerContext: Manages the state of the player data.
 * - ScoreContext: Manages the state of the scores.
 * 
 * State:
 * - code: The current code being manipulated.
 * - selectedLanguage: The programming language selected for the editor.
 * - output: The output of the executed code.
 * - expectedOutput: The expected output of the code after manipulation.
 * - inputParameterQuestion: The input parameter for the question.
 * - isDisabled: Boolean to control the state of the submit button.
 * - codeTest: The test code to append to the main code.
 * - isPopupManipulationCorrectVisible: Boolean to control the visibility of the correct answer popup.
 * - isPopupManipulationWrongVisible: Boolean to control the visibility of the wrong answer popup.
 * - isPlayerDisconnected: Boolean to check if the opponent player is disconnected.
 * - isPopUpPlayerDisconnectedVisible: Boolean to control the visibility of the player disconnected popup.
 * - showManipulationContainer: Boolean to control the visibility of the manipulation container.
 * - isPopupVisible: Boolean to control the visibility of the round end popup.
 * - enemyPlayer: The name of the enemy player.
 * - hasFoundErrorP1: Boolean to check if player 1 has found an error.
 * - hasFoundErrorP2: Boolean to check if player 2 has found an error.
 * - winnerGame: The name of the game winner.
 * - loserGame: The name of the game loser.
 * - isGameLoserVisible: Boolean to control the visibility of the game loser popup.
 * - isGameWinnerVisible: Boolean to control the visibility of the game winner popup.
 * - isTieVisible: Boolean to control the visibility of the game tie popup.
 * - isGameFinished: Boolean to check if the game is finished.
 */
function ManipulationPage() {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const {manipulationQuestion} = useContext(ManipulationPlayerContext);
    const {playerName, playerData} = useContext(PlayerContext);
    const [output, setOutput] = useState('');
    const [expectedOutput, setExpectedOutput] = useState('');
    const [inputParameterQuestion, setInputParameterQuestion] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const {setManipulationQuestion} = useContext(ManipulationPlayerContext);
    const [codeTest, setCodeTest] = useState('');
    const [isPopupManipulationCorrectVisible, setIsPopupManipulationCorrectVisible] = useState(false);
    const [isPopupManipulationWrongVisible, setIsPopupManipulationWrongVisible] = useState(false);
    const [isPlayerDisconnected, setIsPlayerDisconnected] = useState(false);
    const [isPopUpPlayerDisconnectedVisible, setIsPopUpPlayerDisconnectedVisible] = useState(false);
    const [showManipulationContainer, setShowManipulationContainer] = useState(true);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [enemyPlayer, setEnemyPlayer] = useState('');
    const [hasFoundErrorP1, setHasFoundErrorP1] = useState(false);
    const [hasFoundErrorP2, setHasFoundErrorP2] = useState(false);
    const [winnerGame, setWinnerGame] = useState('');
    const [loserGame, setLoserGame] = useState('');
    const [isGameLoserVisible, setIsGameLoserVisible] = useState(false);
    const [isGameWinnerVisible, setIsGameWinnerVisible] = useState(false);
    const [isTieVisible, setIsTieVisible] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const {ownPoints, opponentPoints, setOwnPoints, setOpponentPoints} = useContext(ScoreContext);

    // Function to execute the code
    const executeCode = () => {
        setIsDisabled(true);
        try {
            const consoleOutput = [];
            const originalConsoleLog = console.log;

            // Temporarily override console.log to capture output
            console.log = (...args) => {
                consoleOutput.push(args.join(' '));
                originalConsoleLog(...args);
            };

            let modifiedCode = code;

            // Remove unnecessary console.log statements
            if (modifiedCode.includes('console.log')) {
                modifiedCode = modifiedCode.replace(/console\.log\([^)]*\);?/g, '');
            }

            // Ensure codeTest (last line) is added back
            modifiedCode += '\n' + codeTest;

            // Create and execute the new function
            const func = new Function(modifiedCode);
            func();

            // Restore the original console.log
            console.log = originalConsoleLog;

            const resultOutput = consoleOutput.join('\n');
            const expected = expectedOutput

            if (resultOutput === expected) {
                socket.emit('ADD_POINT_MANIPULATION');
                socket.emit('ROUND_END_MANIPULATION', true);
            } else {
                socket.emit('ROUND_END_MANIPULATION', false);  
            }
        } catch (error) {
            console.log(error);
            socket.emit('ROUND_END_MANIPULATION', false);
        }
    };

    // Function to handle changes in the editor
    const onChange = (newCode) => {
        setCode(newCode);
    };

    useEffect(() => {
        // Check if manipulationQuestion is not null
        if (manipulationQuestion) {
            // Set initial code, expected output, input parameter, and characters left
            let codeLines = manipulationQuestion.code.split('\n');
            let codeExceptLastLine = codeLines.slice(0, -1).join('\n');
            let codeTest = codeLines[codeLines.length - 1];

            // Set the code and codeTest
            setCode(codeExceptLastLine);
            setCodeTest(codeTest);
            setOutput('');
            setExpectedOutput(manipulationQuestion.outputtext);
            setInputParameterQuestion(manipulationQuestion.inputtext);
        }
    }, [manipulationQuestion]);

    // Socket event listeners
    const handleInputManipulation = (data) => {
        const {code, answer, input} = data;
        let codeLines = code.split('\n');
        let codeExceptLastLine = codeLines.slice(0, -1).join('\n');
        let codeTest = codeLines[codeLines.length - 1];
        setCode(codeExceptLastLine);
        setCodeTest(codeTest);
        setExpectedOutput(answer);
        setInputParameterQuestion(input);
        setOutput('');
        setIsDisabled(false);
    };

    // Function to handle the start of a new round
    const handleStartNewRound = (nameP2, boolP1, boolP2, ownPointsReceived, opponentPointsReceived) => {
        setOwnPoints(ownPointsReceived);
        setOpponentPoints(opponentPointsReceived);
        setHasFoundErrorP1(boolP1);
        setEnemyPlayer(nameP2);
        setHasFoundErrorP2(boolP2);
        setPopupVisible(true);
    };

    // Function to handle the end of the game
    const handleGameEnd = (ownPointsReceived, opponentPointsReceived) => {
        setOwnPoints(ownPointsReceived);
        setOpponentPoints(opponentPointsReceived);
        setIsGameFinished(true);

        if (ownPointsReceived > opponentPointsReceived) {
            setWinnerGame(playerName);
            setIsGameWinnerVisible(true);
        } else if (opponentPointsReceived > ownPointsReceived) {
            setLoserGame(playerName);
            setIsGameLoserVisible(true);
        } else {
            setIsTieVisible(true);
        }
    };

    // Function to handle setting the question for manipulation
    const handleSetQuestionManipulation = (question) => {
        setManipulationQuestion(question);
    };

    useEffect(() => {  
        // Function to handle the player disconnecting
        const opponentDisconnected = () => {
            setIsPlayerDisconnected(true);
            setShowManipulationContainer(false);
            setIsPopUpPlayerDisconnectedVisible(true);
            setTimeout(() => {
                setIsPopUpPlayerDisconnectedVisible(false);
                navigate('/select/code/codeBattle');
            }, 3000);
        }

        // Set up socket event listeners
        socket.on('SET_MANIPULATION_QUESTION', handleSetQuestionManipulation);
        socket.on('ENABLE_INPUT_MANIPULATION', handleInputManipulation);
        socket.on('START_NEW_ROUND_MANIPULATION', handleStartNewRound);
        socket.on('END_MANIPULATION_GAME', handleGameEnd);
        socket.on('OPPONENT_DISCONNECTED', opponentDisconnected);

        // Clean up socket event listeners
        return () => {
            socket.off('SET_MANIPULATION_QUESTION', handleSetQuestionManipulation);
            socket.off('ENABLE_INPUT_MANIPULATION', handleInputManipulation);
            socket.off('START_NEW_ROUND_MANIPULATION', handleStartNewRound);
            socket.off('END_MANIPULATION_GAME', handleGameEnd);
            socket.off('OPPONENT_DISCONNECTED', opponentDisconnected);

        };
    }, []);

    // Function to handle closing the correct answer popup
    const handlePopupManipulationCorrectVisible = () => {
        socket.emit('ROUND_END_MANIPULATION', true);
        setIsPopupManipulationCorrectVisible(false);
        setIsDisabled(true);
    };

    // Function to handle closing the wrong answer popup
    const handlePopupManipulationWrongVisible = () => {
        socket.emit('ROUND_END_MANIPULATION', false);
        setIsPopupManipulationWrongVisible(false);
        setIsDisabled(true);
    };

    // Function to handle closing the round end popup
    const handlePopupClose = () => {
        setPopupVisible(false);
        setIsDisabled(false);
    };


    return (
        <div className={styles2.backgroundImage}>
            {!isPopupVisible && !isGameFinished && showManipulationContainer && (
                <div className={styles2.manipulationContainer}>
                    <ScoresRound ownPoints={ownPoints} opponentPoints={opponentPoints} />
                    <div className={styles2.infoContainer}>
                        <div className={styles2.infoBox}>
                            Parameterwert:
                            <div className={styles2.dynamicContainer}>
                                <span className={styles2.dynamicData}>{inputParameterQuestion}</span>
                            </div>
                        </div>
                        <div className={styles2.infoBox}>
                            Konsolenausgabe:
                            <div className={styles2.dynamicContainer}>
                                <span className={styles2.dynamicData}>{expectedOutput}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className={styles2.infoText}>
                            {isDisabled
                                ? 'Warte bis dein Gegner fertig ist...'
                                : ``
                            }
                        </h2>
                    </div>
                    {!isDisabled && (
                        <>
                            <div className={styles2.editor}>
                                <AceEditor
                                    mode={selectedLanguage}
                                    theme="monokai"
                                    onChange={onChange}
                                    name="UNIQUE_ID_OF_EDITOR"
                                    editorProps={{ $blockScrolling: true }}
                                    value={code}
                                    style={{ width: '700px', height: '305px' }}
                                    fontSize={20}
                                    className={styles2.enabledEditor}
                                />
                            </div>
                            <button onClick={executeCode} className={styles2.runButton}>
                                Kompilieren
                            </button>
                        </>
                    )}
                    <PopUpManipulationCorrect isVisible={isPopupManipulationCorrectVisible} closePopup={handlePopupManipulationCorrectVisible} />
                    <PopUpManipulationWrong isVisible={isPopupManipulationWrongVisible} closePopup={handlePopupManipulationWrongVisible} />

                </div>
            )}
            <PopUpGameWinner winner={winnerGame} isVisible={isGameWinnerVisible} ownPoints={ownPoints} opponentPoints={opponentPoints} />
            <PopUpGameLoser loser={loserGame} isVisible={isGameLoserVisible} ownPoints={ownPoints} opponentPoints={opponentPoints} />
            <PopUpGameTie winner={winnerGame} isVisible={isTieVisible} ownPoints={ownPoints} opponentPoints={opponentPoints} />
            <PopUpManipulationRoundEnd
                isVisible={isPopupVisible}
                player1={playerData.playername}
                player2={enemyPlayer}
                hasFoundErrorP1={hasFoundErrorP1}
                hasFoundErrorP2={hasFoundErrorP2}
                onClose={handlePopupClose}
            />
            {isPlayerDisconnected && (
                <PopUpPlayerManipulationDisconnect isVisible={isPopUpPlayerDisconnectedVisible}/>
            )}
        </div>
    );
}

export default ManipulationPage;