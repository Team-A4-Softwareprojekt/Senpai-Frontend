import React, {useEffect, useState, useContext} from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import HomeButton from '../../buttons/homeButton/HomeButton.jsx';
import {useNavigate} from 'react-router-dom';
import {ManipulationPlayerContext} from '../../context/manipulationQuestionContext.jsx';
import {PlayerContext} from '../../context/playerContext.jsx';
import {ScoreContext} from "../../context/scoreContext.jsx";
import Modal from '../../components/modal/Modal';
import {socket} from '../../socket.js';

import PopUpManipulationCorrect from '../../popups/popUpManipulation/PopUpManipulationCorrect.jsx';
import PopUpManipulationWrong from '../../popups/popUpManipulation/PopUpManipulationWrong.jsx';

import styles from '../General.module.css';
import styles2 from './ManipulationPage.module.css';
import PopUpManipulationRoundEnd from "../../components/popUpManipulationRoundEnd/PopUpManipulationRoundEnd.jsx";
import PopUpGameWinner from "../../components/popUpGameWinner/PopUpGameWinner.jsx";
import PopUpGameLoser from "../../components/popUpGameLoser/PopUpGameLoser.jsx";
import PopUpTie from "../../components/popUpTie/PopUpTie.jsx";
import ScoresRound from "../../components/scoresRound/ScoresRound.jsx";

function ManipulationPage() {
    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const {manipulationQuestion} = useContext(ManipulationPlayerContext);
    const {playerName, playerData} = useContext(PlayerContext);
    const [output, setOutput] = useState('');
    const [expectedOutput, setExpectedOutput] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const {setManipulationQuestion} = useContext(ManipulationPlayerContext);
    const [codeTest, setCodeTest] = useState('');

    const [isPopupManipulationCorrectVisible, setIsPopupManipulationCorrectVisible] = useState(false);
    const [isPopupManipulationWrongVisible, setIsPopupManipulationWrongVisible] = useState(false);

    const [isPopupVisible, setPopupVisible] = useState(false);
    const [enemyPlayer, setEnemyPlayer] = useState('');
    const [hasFoundErrorP1, setHasFoundErrorP1] = useState(false);
    const [hasFoundErrorP2, setHasFoundErrorP2] = useState(false);

    const [winnerGame, setWinnerGame] = useState('');
    const [loserGame, setLoserGame] = useState('');
    const [isGameLoserVisible, setIsGameLoserVisible] = useState(false);
    const [isGameWinnerVisible, setIsGameWinnerVisible] = useState(false);
    const [isTieVisible, setIsTieVisible] = useState(false);

    const {ownPoints, opponentPoints, setOwnPoints, setOpponentPoints} = useContext(ScoreContext);

    //const [ownPoints, setOwnPoints] = useState(0);
    //const [opponentPoints, setOpponentPoints] = useState(0);

    const handleHomeClick = () => {
        navigate('/select/code');
    };

    const languages = [
        {value: 'javascript', label: 'JavaScript'},
        {value: 'python', label: 'Python', disabled: true},
        {value: 'java', label: 'Java', disabled: true},
        {value: 'ruby', label: 'Ruby', disabled: true},
    ];

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
                //setIsPopupManipulationCorrectVisible(true);
                socket.emit('ADD_POINT_MANIPULATION');
                socket.emit('ROUND_END_MANIPULATION', true);
                // Hier bekommt der Spieler einen Punkt
            } else {
                //setIsPopupManipulationWrongVisible(true);
                socket.emit('ROUND_END_MANIPULATION', false);
                // Hier bekommt der Spieler KEINEN Punkt
            }
        } catch (error) {
            console.log(error);
            socket.emit('ROUND_END_MANIPULATION', false);
            //setIsPopupManipulationWrongVisible(true);
        }
    };


    const onChange = (newCode) => {
        setCode(newCode);
    };

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    useEffect(() => {
        if (manipulationQuestion) {
            let codeLines = manipulationQuestion.code.split('\n');
            let codeExceptLastLine = codeLines.slice(0, -1).join('\n');
            let codeTest = codeLines[codeLines.length - 1]; // Get the last line

            setCode(codeExceptLastLine);
            setCodeTest(codeTest);
            console.log('Code test:', codeTest);
            setOutput('');
            setExpectedOutput(manipulationQuestion.outputtext);
        }
    }, [manipulationQuestion]);

    useEffect(() => {
        if (alertMessage) {
            alert(alertMessage);
            setAlertMessage('');
        }
    }, [alertMessage]);

    const handleInputManipulation = (data) => {

        console.log("handle Input manipulation");
        const {code, answer} = data;
        console.log('Received code:', code);

        let codeLines = code.split('\n');
        let codeExceptLastLine = codeLines.slice(0, -1).join('\n');
        let codeTest = codeLines[codeLines.length - 1]; // Get the last line
        console.log('Code test:', codeTest);
        setCode(codeExceptLastLine);
        setCodeTest(codeTest);
        setExpectedOutput(answer);
        console.log('Expected output:', expectedOutput);
        setOutput('');
        setIsDisabled(false);
    };

    const handleStartNewRound = (nameP2, boolP1, boolP2, ownPointsReceived, opponentPointsReceived) => {

        setOwnPoints(ownPointsReceived);
        setOpponentPoints(opponentPointsReceived);

        console.log(nameP2)

        setHasFoundErrorP1(boolP1);

        setEnemyPlayer(nameP2);
        setHasFoundErrorP2(boolP2);

        setPopupVisible(true);


        /*
            console.log('Starting new round');
            setTimeout(() => {
              navigate('/codebattle/manipulation/player1');
            }, 1000);
            */
    };

    const handleEndGame = (ownPointsReceived, opponentPointsReceived) => {
        console.log('Received own points:', ownPointsReceived);
        console.log('Received opponent points:', opponentPointsReceived);

        setOwnPoints(ownPointsReceived);
        setOpponentPoints(opponentPointsReceived);

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

    const handleSetQuestionManipulation = (question) => {
        console.log(question);
        setManipulationQuestion(question);
    };


    useEffect(() => {
        socket.on('SET_MANIPULATION_QUESTION', handleSetQuestionManipulation);
        socket.on('ENABLE_INPUT_MANIPULATION', handleInputManipulation);
        socket.on('START_NEW_ROUND_MANIPULATION', handleStartNewRound);
        socket.on('END_MANIPULATION_GAME', handleEndGame);


        return () => {
            socket.off('SET_MANIPULATION_QUESTION', handleSetQuestionManipulation);
            socket.off('ENABLE_INPUT_MANIPULATION', handleInputManipulation);
            socket.off('START_NEW_ROUND_MANIPULATION', handleStartNewRound);
            socket.off('END_MANIPULATION_GAME', handleEndGame);

        };
    }, []);

    const handlePopupManipulationCorrectVisible = () => {
        socket.emit('ROUND_END_MANIPULATION', true);
        setIsPopupManipulationCorrectVisible(false);
        setIsDisabled(true);
    };

    const handlePopupManipulationWrongVisible = () => {
        socket.emit('ROUND_END_MANIPULATION', false);
        setIsPopupManipulationWrongVisible(false);
        setIsDisabled(true);
    };


    return (
        <div className={styles2.backgroundImage}>
          <HomeButton handleClick={handleHomeClick}/>
          <div className={styles2.whiteBackground}>
            <header className={styles2.header}>
                
                <h1 className={styles2.manipulationText}>Manipulation</h1>
            </header>
            <ScoresRound ownPoints={ownPoints} opponentPoints={opponentPoints}/>
            <div>
                <h2 className={styles2.infoText}>
                    {isDisabled
                        ? 'Wait for the other player to finish...'
                        : `It's your turn. Change the code to achieve the desired output: ${expectedOutput} when the input is: ${manipulationQuestion.inputtext}`
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
                            editorProps={{$blockScrolling: true}}
                            value={code}
                            style={{width: '50vw', height: '300px'}}
                            className={styles2.enabledEditor}
                        />
                        <div className={styles2.footer}>
                            <button
                                onClick={executeCode}
                                className={styles2.runButton}
                            >
                                Submit
                            </button>
                            <Modal
                                header="This is the manipulation game mode"
                                text="In this game mode you have to manipulate the code so the output is not the same as the expected output. You have a limited number of characters you can change. If you have to wait, your next goal is to fix the mistakes to get to the expected output. Good luck!"
                            />
                        </div>
                    </div>
                </>
            )}
            <PopUpManipulationRoundEnd isVisible={isPopupVisible} player1={playerData.playername} player2={enemyPlayer}
                                       hasFoundErrorP1={hasFoundErrorP1} hasFoundErrorP2={hasFoundErrorP2}/>
            <PopUpManipulationCorrect isVisible={isPopupManipulationCorrectVisible}
                                      closePopup={handlePopupManipulationCorrectVisible}/>
            <PopUpManipulationWrong isVisible={isPopupManipulationWrongVisible}
                                    closePopup={handlePopupManipulationWrongVisible}/>

            <PopUpGameWinner winner={winnerGame} isVisible={isGameWinnerVisible} ownPoints={ownPoints} opponentPoints={opponentPoints}/>
            <PopUpGameLoser loser={loserGame} isVisible={isGameLoserVisible} ownPoints={ownPoints} opponentPoints={opponentPoints}/>
            <PopUpTie winner={winnerGame} isVisible={isTieVisible} ownPoints={ownPoints} opponentPoints={opponentPoints}/>

          </div>

        </div>
    );
}

export default ManipulationPage;