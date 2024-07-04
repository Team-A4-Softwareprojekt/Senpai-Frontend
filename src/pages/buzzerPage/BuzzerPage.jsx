import React, {useContext, useEffect, useState} from 'react';
import styles from './BuzzerPage.module.css';
import {socket} from '../../socket.js';
import ConfirmButton from '../../buttons/confirmButton/ConfirmButton.jsx';
import BuzzerButton from '../../buttons/buzzerButton/BuzzerButton.jsx';
import PopUpRoundWinner from '../../popups/popUpRoundWinner/PopUpRoundWinner.jsx';
import PopUpGameWinner from '../../popups/popUpGameWinner/PopUpGameWinner.jsx';
import PopUpGameLoser from '../../popups/popUpGameLoser/PopUpGameLoser.jsx';
import PopUpGameTie from '../../popups/popUpGameTie/PopUpGameTie.jsx';
import PopUpPlayerBuzzerDisconnect from '../../popups/popUpPlayerDisconnected/PopUpPlayerBuzzerDisconnect.jsx';
import ScoresRound from '../../components/scoresRound/ScoresRound.jsx';
import {PlayerContext} from '../../context/playerContext.jsx';
import {useNavigate} from 'react-router-dom';
import {BuzzerPlayerContext} from "../../context/buzzerQuestionContext.jsx";

// Used for the correct display of end screens
let roundCounter = 0;

/**
 * BuzzerPage Component
 * 
 * This component handles the game logic for a buzzer-based quiz game.
 * It manages the state of the game, including the current question, the selected answer,
 * the state of the buzzer and confirm buttons, and the visibility of various popups.
 * 
 * It communicates with a socket server to handle events such as buzzing in, answering questions,
 * and game state changes. The component also handles navigation to different question types
 * and manages the timer for each round and turn.
 * 
 * The component uses several contexts to share state with other parts of the application,
 * including PlayerContext for player information and BuzzerPlayerContext for question data.
 */
const BuzzerPage = () => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(true);
    const [isBuzzerButtonDisabled, setIsBuzzerButtonDisabled] = useState(false);
    const [solution, setSolution] = useState('');
    const [winnerRound, setWinnerRound] = useState('');
    const [winnerGame, setWinnerGame] = useState('');
    const [loserGame, setLoserGame] = useState('');
    const [isPopUpPlayerDisconnectedVisible, setIsPopUpPlayerDisconnectedVisible] = useState(false);
    const [isPopUpGameLoserVisible, setIsPopUpGameLoserVisible] = useState(false);
    const [isPopUpRoundWinnerVisible, setIsPopUpRoundWinnerVisible] = useState(false);
    const [isPopUpGameWinnerVisible, setIsPopUpGameWinnerVisible] = useState(false);
    const [isPopUpTieVisible, setIsTieVisible] = useState(false);
    const [isBuzzerGameVisible, setIsBuzzerGameVisible] = useState(true);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [isPlayerDisconnected, setIsPlayerDisconnected] = useState(false);
    const [remainingSeconds, setRemainingSeconds] = useState(20);
    const [ownPoints, setOwnPoints] = useState(0);
    const [opponentPoints, setOpponentPoints] = useState(0);
    const {playerName} = useContext(PlayerContext);
    const {buzzerQuestion, setBuzzerQuestion} = useContext(BuzzerPlayerContext);
    const [buzzerMessage, setBuzzerMessage] = useState(null);
    
    // Handle answer selection
    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    // Handle form submission to compare the selected answer with the correct one
    const handleSubmit = () => {
        if (selectedAnswer !== null) {
            socket.emit('COMPARE_ANSWER', selectedAnswer);
        }
    };

    // Enable or disable the confirm button
    const toggleButton = () => {
        setIsConfirmButtonDisabled(!isConfirmButtonDisabled);
        setIsBuzzerButtonDisabled(true);
        setBuzzerMessage("Du hast den Buzzer gedrückt. Bestätige deine Antwort!"); 
        socket.emit('PLAYER_BUZZERED');
    }

    // Format time for displaying the remaining time
    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    // Reset the round counter to 0
    const resetRoundCounter = () => {
        roundCounter = 0;
    };

    useEffect(() => {

        // Disable the buzzer button
        const disableBuzzer = () => {
            setIsBuzzerButtonDisabled(true);
        };

        // Enable the buzzer button
        const enableBuzzer = () => {
            setIsBuzzerButtonDisabled(false);
            setIsConfirmButtonDisabled(true);
        };

        // Handle correct answer
        const handleCorrectAnswer = () => {
            setIsConfirmButtonDisabled(true);
            setIsBuzzerButtonDisabled(false);
        };

        // Handle wrong answer
        const handleWrongAnswer = () => {
            setIsConfirmButtonDisabled(true);
            setIsBuzzerButtonDisabled(true);
            setBuzzerMessage("Deine Antwort war falsch. Jetzt ist dein Gegner dran!");
        };

        // Handle opponent pressing the buzzer button
        const handleOpponentBuzzered = () => {
            if (buzzerMessage !== "Deine Antwort war falsch. Jetzt ist dein Gegner dran!") {
                setBuzzerMessage("Dein Gegner hat den Buzzer schneller gedrückt!");
            }
        };

        // Handle opponent's wrong answer
        const handleOpponentWrongAnswer = () => {
            setBuzzerMessage("Dein Gegner hat falsch geantwortet. Du kannst antworten!");
            setIsConfirmButtonDisabled(false);
            setIsBuzzerButtonDisabled(true);
            socket.emit('PLAYER_BUZZERED');
        };

        // Navigate to the question type (multiple choice or gap text)
        const handleQuestionType = (table) => {
            if (table === 'multiplechoicequestion') {
                navigate('/codebattle/buzzer/multiplechoice');
            } else {
                navigate('/codebattle/buzzer/gaptext');
            }
        };

        // Handle the end of a round
        const handleRoundEnd = (playerName, solution, ownPointsReceived, opponentPointsReceived) => {
            setWinnerRound(playerName);
            setSolution(solution);
            setBuzzerMessage(null);
            setIsPopUpRoundWinnerVisible(true);
            setIsBuzzerGameVisible(false);
            setOwnPoints(ownPointsReceived);
            setOpponentPoints(opponentPointsReceived);
            roundCounter++;

            setTimeout(() => {
                if (roundCounter < 3) {
                    setIsBuzzerGameVisible(true);
                }
                setIsPopUpRoundWinnerVisible(false);
                setSelectedAnswer(null);
                setIsConfirmButtonDisabled(true);
                setIsBuzzerButtonDisabled(false);
            }, 3000);
        }

        // Handle the end of the game
        const handleGameEnd = (ownPointsReceived, opponentPointsReceived) => {
            setIsBuzzerGameVisible(false);
            setOwnPoints(ownPointsReceived);
            setOpponentPoints(opponentPointsReceived);
            setIsGameFinished(true);

            if (ownPointsReceived > opponentPointsReceived) {
                setWinnerGame(playerName);
                setIsPopUpGameWinnerVisible(true);
            } else if (opponentPointsReceived > ownPointsReceived) {
                setLoserGame(playerName);
                setIsPopUpGameLoserVisible(true);
            } else {
                setIsTieVisible(true);
            }
            setSelectedAnswer(null);
            setIsConfirmButtonDisabled(true);
            setIsBuzzerButtonDisabled(false);
        };

        // Display the remaining round time
        const displayRoundTime = (remainingSecondsRound) => {
            setRemainingSeconds(remainingSecondsRound);
        }

        // Display the remaining turn time
        const displayTurnTime = (remainingSecondsTurn) => {
            setRemainingSeconds(remainingSecondsTurn);
        }

        // Trigger the buzzer action
        const triggerBuzzer = () => {
            toggleButton();
        }

        // Handle opponent disconnection
        const opponentDisconnected = () => {
            setIsPlayerDisconnected(true);
            setIsBuzzerGameVisible(false);
            setIsPopUpPlayerDisconnectedVisible(true);
            setTimeout(() => {
                setIsPopUpPlayerDisconnectedVisible(false);
                navigate('/select/code/codeBattle');
            }, 3000);
        }

        // Set the question for the buzzer round
        const handleSetQuestion = (question) => {
            setBuzzerQuestion(question);
        };

        socket.on('DISABLE_BUZZER', disableBuzzer);
        socket.on('ENABLE_BUZZER', enableBuzzer);
        socket.on('CORRECT_ANSWER', handleCorrectAnswer);
        socket.on('WRONG_ANSWER', handleWrongAnswer);
        socket.on('BUZZER_QUESTION_TYPE', handleQuestionType);
        socket.on('END_ROUND', handleRoundEnd);
        socket.on('END_BUZZER_GAME', handleGameEnd);
        socket.on('OPPONENT_DISCONNECTED', opponentDisconnected);
        socket.on('BUZZER_TIMER_TICK', displayRoundTime);
        socket.on('PLAYER_TURN_TIMER_TICK', displayTurnTime);
        socket.on('TRIGGER_BUZZER', triggerBuzzer);
        socket.on('SET_BUZZER_QUESTION', handleSetQuestion);
        socket.on('OPPONENT_BUZZERED', handleOpponentBuzzered);
        socket.on('OPPONENT_WRONG_ANSWER', handleOpponentWrongAnswer);

        return () => {
            socket.off('DISABLE_BUZZER', disableBuzzer);
            socket.off('ENABLE_BUZZER', enableBuzzer);
            socket.off('CORRECT_ANSWER', handleCorrectAnswer);
            socket.off('WRONG_ANSWER', handleWrongAnswer);
            socket.off('BUZZER_QUESTION_TYPE', handleQuestionType);
            socket.off('END_ROUND', handleRoundEnd);
            socket.off('END_BUZZER_GAME', handleGameEnd);
            socket.off('OPPONENT_DISCONNECTED', opponentDisconnected);
            socket.off('BUZZER_TIMER_TICK', displayRoundTime);
            socket.off('PLAYER_TURN_TIMER_TICK', displayTurnTime);
            socket.off('TRIGGER_BUZZER', triggerBuzzer);
            socket.off('SET_BUZZER_QUESTION', handleSetQuestion);
            socket.off('OPPONENT_BUZZERED', handleOpponentBuzzered);
            socket.off('OPPONENT_WRONG_ANSWER', handleOpponentWrongAnswer);
        };
    }, [buzzerMessage]);

    return (
        <div className={styles.backgroundContainer}>
            {isBuzzerGameVisible && (
                <div className={styles.container}>
                    <div className={styles.headerContainer}>
                        <ScoresRound ownPoints={ownPoints} opponentPoints={opponentPoints} />
                        {remainingSeconds !== null && (
                            <div className={styles.timer}>
                                Verbleibende Zeit:&nbsp;
                                <strong> <span className={`${styles.seconds} ${remainingSeconds <= 5 ? styles.red : ''}`}>{formatTime(remainingSeconds)}s</span> </strong>
                            </div>
                        )}
                    </div>
                    <div className={styles.questionBox}>
                        <p className={styles.p}>{buzzerQuestion.question}</p>
                    </div>
                    <form className={styles.form}>
                        <label className={styles.answerOption}>
                            <input
                                type="radio"
                                value="A"
                                checked={selectedAnswer === 'A'}
                                onChange={handleAnswerChange}
                            />
                            {buzzerQuestion.aanswer}
                        </label>
                        <label className={styles.answerOption}>
                            <input
                                type="radio"
                                value="B"
                                checked={selectedAnswer === 'B'}
                                onChange={handleAnswerChange}
                            />
                            {buzzerQuestion.banswer}
                        </label>
                        <label className={styles.answerOption}>
                            <input
                                type="radio"
                                value="C"
                                checked={selectedAnswer === 'C'}
                                onChange={handleAnswerChange}
                            />
                            {buzzerQuestion.canswer}
                        </label>
                        <label className={styles.answerOption}>
                            <input
                                type="radio"
                                value="D"
                                checked={selectedAnswer === 'D'}
                                onChange={handleAnswerChange}
                            />
                            {buzzerQuestion.danswer}
                        </label>
                        <div className={styles.buttonRow}>
                            <ConfirmButton isButtonDisabled={isConfirmButtonDisabled} handleSubmit={handleSubmit} buttonText={"Bestätigen"}/>
                            <BuzzerButton toggle={toggleButton} disabled={isBuzzerButtonDisabled}/>
                        </div>
                    </form>
                    {buzzerMessage && (
                        <div className={styles.message}>
                            {buzzerMessage}
                        </div>
                    )}
                </div>
            )}
            {!isBuzzerGameVisible && (
                <PopUpRoundWinner winner={winnerRound} isVisible={isPopUpRoundWinnerVisible} solution={solution}/>
            )}
            {isGameFinished && (
                <>
                    <PopUpGameWinner winner={winnerGame} isVisible={isPopUpGameWinnerVisible} ownPoints={ownPoints} opponentPoints={opponentPoints} resetRoundCounter={resetRoundCounter}/>
                    <PopUpGameLoser loser={loserGame} isVisible={isPopUpGameLoserVisible} ownPoints={ownPoints} opponentPoints={opponentPoints} resetRoundCounter={resetRoundCounter}/>
                    <PopUpGameTie isVisible={isPopUpTieVisible} ownPoints={ownPoints} opponentPoints={opponentPoints} resetRoundCounter={resetRoundCounter}/>
                </>
            )}
            {isPlayerDisconnected && (
                <PopUpPlayerBuzzerDisconnect isVisible={isPopUpPlayerDisconnectedVisible} resetRoundCounter={resetRoundCounter}/>
            )}
        </div>
    );
};

export default BuzzerPage;
