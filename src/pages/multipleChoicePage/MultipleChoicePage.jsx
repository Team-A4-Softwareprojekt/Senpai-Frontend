import React, { useEffect, useState } from 'react';
import styles from './MultipleChoicePage.module.css';
import { socket } from '../../socket.js';
import ConfirmButton from '../../components/confirmButton/ConfirmButton.jsx';
import BuzzerButton from '../../components/buzzerButton/BuzzerButton.jsx';
import PopUpWinnerRound from '../../components/popUpWinnerRound/PopUpWinnerRound.jsx';
import PopUpWinnerGame from '../../components/popUpWinnerGame/PopUpWinnerGame.jsx';
import {PlayerContext} from '../../context/playerContext';
import { useNavigate } from 'react-router-dom';

//TODO: Debugging der Situationen, wenn spieler Falsch antworten. Solange immer beim ersten Buzzer korrekt geantwortet wird, funktioniert (eigentlich) alles ;)
const MultipleChoicePage = () => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(true);
    const [isBuzzerButtonDisabled, setIsBuzzerButtonDisabled] = useState(false);
    const [solution, setSolution] = useState('');
    const [winnerRound, setWinnerRound] = useState('');
    const [winnerGame, setWinnerGame] = useState('');
    const [isRoundWinnerVisible, setIsRoundWinnerVisible] = useState(false);
    const [isGameWinnerVisible, setIsGameWinnerVisible] = useState(false);
    const [remainingSeconds, setRemainingSeconds] = useState(null);

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
        const handleQuestion = (task) => {
            setQuestion(task);
        };

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

        const handleRoundEnd = (playerName, solution) => {
            setWinnerRound(playerName);
            setSolution(solution);
            setIsRoundWinnerVisible(true);
            
            setTimeout(() => {
                setIsRoundWinnerVisible(false);
                setSelectedAnswer(null);
                setIsConfirmButtonDisabled(true);
                setIsBuzzerButtonDisabled(false);
            }, 3000);
        }

        const handleGameEnd = (ownPoints, opponentPoints) => {
            setWinnerGame(socket.id);
            setIsRoundWinnerVisible(false);
            setIsGameWinnerVisible(true);

            setTimeout(() => {
                setIsGameWinnerVisible(false);
                setSelectedAnswer(null);
                setIsConfirmButtonDisabled(true);
                setIsBuzzerButtonDisabled(false);
                socket.emit('CLOSE_LOBBY');
                navigate('/select/code/codeBattle');
            }, 3000);
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

        socket.on('SHOW_QUESTION_MULTIPLE_CHOICE', handleQuestion);
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

        return () => {
            socket.off('SHOW_QUESTION_MULTIPLE_CHOICE', handleQuestion);
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
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.questionAndTimer}>
                <div className={styles.questionBox}>
                    <div className={styles.questionContent}>
                        <p>{question.question}</p>
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
                    {question.aanswer}
                </label>
                <label className={styles.answerOption}>
                    <input
                        type="radio"
                        value="B"
                        checked={selectedAnswer === 'B'}
                        onChange={handleAnswerChange}
                    />
                    {question.banswer}
                </label>
                <label className={styles.answerOption}>
                    <input
                        type="radio"
                        value="C"
                        checked={selectedAnswer === 'C'}
                        onChange={handleAnswerChange}
                    />
                    {question.canswer}
                </label>
                <label className={styles.answerOption}>
                    <input
                        type="radio"
                        value="D"
                        checked={selectedAnswer === 'D'}
                        onChange={handleAnswerChange}
                    />
                    {question.danswer}
                </label>
                <div className={styles.buttonRow}>
                    <ConfirmButton isButtonDisabled={isConfirmButtonDisabled} handleSubmit={handleSubmit} />
                    <BuzzerButton toggle={toggleButton} disabled={isBuzzerButtonDisabled} /> 
                </div>
            </form>
            {!isGameWinnerVisible && (
                <PopUpWinnerRound winner={winnerRound} isVisible={isRoundWinnerVisible} solution={solution} />
            )}
            <PopUpWinnerGame winner={winnerRound} isVisible={isGameWinnerVisible} />
        </div>
    );
};

export default MultipleChoicePage;
