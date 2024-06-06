import React, {useContext, useEffect, useState} from 'react';
import styles from './MultipleChoicePage.module.css';
import { socket } from '../../socket.js';
import ConfirmButton from '../../components/confirmButton/ConfirmButton.jsx';
import BuzzerButton from '../../components/buzzerButton/BuzzerButton.jsx';
import PopUpRoundWinner from '../../components/popUpRoundWinner/PopUpRoundWinner.jsx';
import PopUpGameWinner from '../../components/popUpGameWinner/PopUpGameWinner.jsx';
import PopUpGameLoser from '../../components/popUpGameLoser/PopUpGameLoser.jsx';
import {PlayerContext} from '../../context/playerContext';
import { useNavigate } from 'react-router-dom';
import {BuzzerPlayerContext} from "../../context/buzzerQuestionContext.jsx";

//TODO: Debugging der Situationen, wenn Spieler falsch antworten. Solange immer beim ersten Buzzer korrekt geantwortet wird, funktioniert (eigentlich) alles ;)
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
    const [isGameLoserVisible, setIsGameLoserVisible] = useState(false);
    const [isRoundWinnerVisible, setIsRoundWinnerVisible] = useState(false);
    const [isGameWinnerVisible, setIsGameWinnerVisible] = useState(false);
    const [remainingSeconds, setRemainingSeconds] = useState(null);
    const [ownPoints, setOwnPoints] = useState(0);
    const [opponentPoints, setOpponentPoints] = useState(0);
    const { playerName } = useContext(PlayerContext);
    const { buzzerQuestion, setBuzzerQuestion } = useContext(BuzzerPlayerContext);

    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    const handleSubmit = () => {
        socket.emit('COMPARE_ANSWER', selectedAnswer);
    };

    /**
     * this function enables or disables the "CONFIRM" button
     * The "CONFIRM" button gets enabled after Buzzing
     */
    const toggleButton = () => {
        setIsConfirmButtonDisabled(!isConfirmButtonDisabled);
        setIsBuzzerButtonDisabled(true);
        socket.emit('PLAYER_BUZZERED');
        console.log('isButtonDisabled: ' + isConfirmButtonDisabled);
    }

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
        };

        const handleQuestionType = (table) => {
            if (table === 'multiplechoicequestion') {
                navigate('/codebattle/buzzer/multiplechoice');
            } else {
                navigate('/codebattle/buzzer/gaptext');
            }
        };

        const handleRoundEnd = (playerName, solution, ownPointsReceived, opponentPointsReceived ) => {
            setWinnerRound(playerName);
            setSolution(solution);
            setIsRoundWinnerVisible(true);

            console.log('Received own points:', ownPointsReceived);
            console.log('Received opponent points:', opponentPointsReceived);

            setOwnPoints(ownPointsReceived);
            setOpponentPoints(opponentPointsReceived);

            setTimeout(() => {
                setIsRoundWinnerVisible(false);
                setSelectedAnswer(null);
                setIsConfirmButtonDisabled(true);
                setIsBuzzerButtonDisabled(false);
            }, 3000);
        }

        const handleGameEnd = (ownPointsReceived, opponentPointsReceived) => {
            console.log('Received own points:', ownPointsReceived);
            console.log('Received opponent points:', opponentPointsReceived);

            setOwnPoints(ownPointsReceived);
            setOpponentPoints(opponentPointsReceived);

            if (ownPointsReceived > opponentPointsReceived) {
                setWinnerGame(playerName);
                setIsGameWinnerVisible(true);
            } else {
                setLoserGame(playerName);
                setIsGameLoserVisible(true);
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
            //TODO: Zwischen-Screen der dir sagt, dass der Gegner das Spiel verlassen hat, du hast automatisch gewonnen.
            navigate('/select/code/codeBattle');
        }

        const handleSetQuestion = (question) => {
            console.log(question);
            setBuzzerQuestion(question);
            console.log(buzzerQuestion);
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
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.scores}>
                <div>Your Points: {ownPoints}</div>
                <div>Opponent's Points: {opponentPoints}</div>
            </div>
            <div className={styles.questionAndTimer}>
                <div className={styles.questionBox}>
                    <div className={styles.questionContent}>
                        <p>{buzzerQuestion.question}</p>
                    </div>
                    {remainingSeconds !== null && (
                        <div className={styles.timer}>
                            Time remaining: <span className={`${styles.seconds} ${remainingSeconds <= 5 ? styles.red : ''}`}>{remainingSeconds}s</span>
                        </div>
                    )}
                </div>
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
                    <ConfirmButton isButtonDisabled={isConfirmButtonDisabled} handleSubmit={handleSubmit} />
                    <BuzzerButton toggle={toggleButton} disabled={isBuzzerButtonDisabled} /> 
                </div>
            </form>
            {!isGameWinnerVisible && !isGameLoserVisible && (
            <PopUpRoundWinner winner={winnerRound} isVisible={isRoundWinnerVisible} solution={solution} />
            )}
            <PopUpGameWinner winner={winnerGame} isVisible={isGameWinnerVisible} />
            <PopUpGameLoser loser={loserGame} isVisible={isGameLoserVisible} />
        </div>
    );
};

export default MultipleChoicePage;
