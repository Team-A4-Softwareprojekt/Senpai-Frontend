import React, {useContext, useEffect, useState} from 'react';
import styles from './MultipleChoicePage.module.css';
import {socket} from '../../socket.js';
import ConfirmButton from '../../buttons/confirmButton/ConfirmButton.jsx';
import BuzzerButton from '../../buttons/buzzerButton/BuzzerButton.jsx';
import PopUpRoundWinner from '../../popups/popUpRoundWinner/PopUpRoundWinner.jsx';
import PopUpGameWinner from '../../popups/popUpGameWinner/PopUpGameWinner.jsx';
import PopUpGameLoser from '../../popups/popUpGameLoser/PopUpGameLoser.jsx';
import PopUpTie from '../../popups/popUpTie/PopUpTie.jsx';
import PopUpPlayerDisconnected from '../../popups/popUpPlayerDisconnected/PopUpPlayerDisconnected.jsx';
import ScoresRound from '../../components/scoresRound/ScoresRound.jsx';
import {PlayerContext} from '../../context/playerContext';
import {useNavigate} from 'react-router-dom';
import {BuzzerPlayerContext} from "../../context/buzzerQuestionContext.jsx";

let roundCounter = 0;

const MultipleChoicePage = () => {
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
    const [remainingSeconds, setRemainingSeconds] = useState(null);
    const [ownPoints, setOwnPoints] = useState(0);
    const [opponentPoints, setOpponentPoints] = useState(0);
    const {playerName} = useContext(PlayerContext);
    const {buzzerQuestion, setBuzzerQuestion} = useContext(BuzzerPlayerContext);
    const [buzzerMessage, setBuzzerMessage] = useState(null);
    
    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    const handleSubmit = () => {
        if (selectedAnswer !== null) {
            socket.emit('COMPARE_ANSWER', selectedAnswer);
        }
    };

    /**
     * this function enables or disables the "CONFIRM" button
     * The "CONFIRM" button gets enabled after Buzzing
     */
    const toggleButton = () => {
        setIsConfirmButtonDisabled(!isConfirmButtonDisabled);
        setIsBuzzerButtonDisabled(true);

        setBuzzerMessage("Du hast den Buzzer gedrückt. Bestätige deine Antwort!"); 

        socket.emit('PLAYER_BUZZERED');
        console.log('isButtonDisabled: ' + isConfirmButtonDisabled);
    }

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    useEffect(() => {

        const disableBuzzer = () => {
            setIsBuzzerButtonDisabled(true);
            console.log('Buzzer disabled');
        };

        const enableBuzzer = () => {
            setIsBuzzerButtonDisabled(false);
            setIsConfirmButtonDisabled(true);
            console.log('Buzzer enabled');
        };

        const handleCorrectAnswer = () => {
            setIsConfirmButtonDisabled(true);
            setIsBuzzerButtonDisabled(false);
        };

        const handleWrongAnswer = () => {
            setIsConfirmButtonDisabled(true);
            setIsBuzzerButtonDisabled(true);
            setBuzzerMessage("Deine Antwort war falsch. Jetzt ist dein Gegner dran!");
        };

        const handleOpponentBuzzered = () => {
            if (buzzerMessage !== "Deine Antwort war falsch. Jetzt ist dein Gegner dran!") {
                setBuzzerMessage("Dein Gegner hat den Buzzer schneller gedrückt!");
            }
        };

        const handleOpponentWrongAnswer = () => {
            setBuzzerMessage("Dein Gegner hat falsch geantwortet. Du kannst antworten!");

            setIsConfirmButtonDisabled(false);
            setIsBuzzerButtonDisabled(true);
            socket.emit('PLAYER_BUZZERED');
            console.log("Handle Opponent Wrong Answer")
        };

        const handleQuestionType = (table) => {
            if (table === 'multiplechoicequestion') {
                navigate('/codebattle/buzzer/multiplechoice');
            } else {
                navigate('/codebattle/buzzer/gaptext');
            }
        };

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

        const handleGameEnd = (ownPointsReceived, opponentPointsReceived) => {
            console.log('Received own points:', ownPointsReceived);
            console.log('Received opponent points:', opponentPointsReceived);

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

        const displayRoundTime = (remainingSecondsRound) => {
            setRemainingSeconds(remainingSecondsRound);
            console.log('Round time left:', remainingSecondsRound);
        }

        const displayTurnTime = (remainingSecondsTurn) => {
            setRemainingSeconds(remainingSecondsTurn);
            console.log('Turn time left:', remainingSecondsTurn);
        }

        const triggerBuzzer = () => {
            toggleButton();
        }

        const opponentDisconnected = () => {
            setIsPlayerDisconnected(true);
            setIsBuzzerGameVisible(false);
            setIsPopUpPlayerDisconnectedVisible(true);
            setTimeout(() => {
                setIsPopUpPlayerDisconnectedVisible(false);
                navigate('/select/code/codeBattle');
            }, 3000);
        }

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
                            <ConfirmButton isButtonDisabled={isConfirmButtonDisabled} handleSubmit={handleSubmit}/>
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
                    <PopUpGameWinner winner={winnerGame} isVisible={isPopUpGameWinnerVisible} ownPoints={ownPoints} opponentPoints={opponentPoints}/>
                    <PopUpGameLoser loser={loserGame} isVisible={isPopUpGameLoserVisible} ownPoints={ownPoints} opponentPoints={opponentPoints}/>
                    <PopUpTie winner={winnerGame} isVisible={isPopUpTieVisible} ownPoints={ownPoints} opponentPoints={opponentPoints}/>
                </>
            )}
            {isPlayerDisconnected && (
                <PopUpPlayerDisconnected isVisible={isPopUpPlayerDisconnectedVisible}/>
            )}
        </div>
    );
};

export default MultipleChoicePage;
