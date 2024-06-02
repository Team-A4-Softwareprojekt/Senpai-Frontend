import React, {useEffect, useState} from 'react';
import styles from './MultipleChoicePage.module.css';
import {socket, startBuzzerQueue, leaveBuzzerQueue, disconnectSocket, requestQuestion} from '../../socket.js';
import BuzzerButton from '../../components/buzzerButton/BuzzerButton.jsx';
import PopUpWinnerRound from '../../components/popUpWinnerRound/PopUpWinnerRound.jsx';
import PopUpWinnerGame from '../../components/popUpWinnerGame/PopUpWinnerGame.jsx';
import {useNavigate} from 'react-router-dom';

//TODO: Debugging der Situationen, wenn spieler Falsch antworten. Solange immer beim ersten Buzzer korrekt geantwortet wird, funktioniert (eigentlich) alles ;)
const MultipleChoicePage = () => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isBuzzerDisabled, setIsBuzzerDisabled] = useState(false);
    const [winnerRound, setWinnerRound] = useState('');
    const [winnerGame, setWinnerGame] = useState('');
    const [isRoundWinnerVisible, setIsRoundWinnerVisible] = useState(false);
    const [isGameWinnerVisible, setIsGameWinnerVisible] = useState(false);
    console.log('On Site Load - isButtonDisabled: ' + isButtonDisabled);
    console.log('On Site Load - isBuzzerDisabled: '+ isBuzzerDisabled);


    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);

    };
    const handleSubmit = () => {
        //alert(`You selected: ${selectedAnswer}`);
        socket.emit('COMPARE_ANSWER', selectedAnswer);
    };

    /**
     * this function enables or disables the "CONFIRM" button
     * The "CONFIRM" button gets enabled after Buzzing
     */
    const toggleButton = () => {
        setIsButtonDisabled(!isButtonDisabled);
        socket.emit('PLAYER_BUZZERED');
        console.log('isButtonDisabled: ' + isButtonDisabled);
    }


    useEffect(() => {
        
        const handleQuestion = (task) => {
            setQuestion(task);
            console.log('Received question:', task);
        };

        const disableBuzzer = () => {
            setIsBuzzerDisabled(true);
            console.log('Buzzer disabled');
        };

        const enableBuzzer = ()=>{
            setIsBuzzerDisabled(false);
            setIsButtonDisabled(true);
            console.log('Buzzer enabled')
        };

        const handleCorrectAnswer = () => {
            //alert('Your Answer was Correct! You Win this Round!')
            setIsButtonDisabled(true);
            setIsBuzzerDisabled(false);
        };

        const handleWrongAnswer = () => {
            alert('Your Answer was wrong! Its your Opponents turn now!')
            setIsButtonDisabled(true);
            setIsBuzzerDisabled(true);
        };

        const handleQuestionType = (table) => {
            console.log('From table:', table);
            if (table === 'multiplechoicequestion') {
                navigate('/codebattle/buzzer/multiplechoice');
            } else {
                navigate('/codebattle/buzzer/gaptext');
            }
        };

        const handleRoundEnd = () => {
            setWinnerRound(socket.id);
            setIsRoundWinnerVisible(true);
            setTimeout(() => {
                setIsRoundWinnerVisible(false);
                setSelectedAnswer(null);
                setIsButtonDisabled(true);
                setIsBuzzerDisabled(false);
            }, 2000);
        }
        
        const handleGameEnd = (ownPoints, opponentPoints) => { 
            console.log('Game ended');

            /*
            if (ownPoints > opponentPoints) {
              alert('You won! :' + ownPoints + ":" + opponentPoints);
            }
            else {
              alert('enemy won! :' + opponentPoints + ":" + ownPoints);
            }
            */
            setWinnerGame(socket.id);
            setIsRoundWinnerVisible(false);
            setIsGameWinnerVisible(true);

            setTimeout(() => {
                setIsGameWinnerVisible(false);
                setSelectedAnswer(null);
                setIsButtonDisabled(true);
                setIsBuzzerDisabled(false);
                socket.emit('CLOSE_LOBBY');
                navigate('/select/code/codeBattle');
            }, 3000);
        };

        const opponentDisconnected = () => {
            //TODO: Zwischen-Screen der dir sagt, dass der Gegner das Spiel verlassen hat, du hast automatisch gewonnen.
            navigate('/select/code/codeBattle');
        }
        // Handle disabling the buzzer for the other player

        socket.on('SHOW_QUESTION_MULTIPLE_CHOICE', handleQuestion);
        socket.on('DISABLE_BUZZER', disableBuzzer);
        socket.on('ENABLE_BUZZER', enableBuzzer);
        socket.on('CORRECT_ANSWER', handleCorrectAnswer);
        socket.on('WRONG_ANSWER', handleWrongAnswer);
        socket.on('BUZZER_QUESTION_TYPE', handleQuestionType);
        socket.on('END_ROUND', handleRoundEnd);
        socket.on('END_BUZZER_GAME', handleGameEnd);
        socket.on('OPPONENT_DISCONNECTED', opponentDisconnected);

        return () => {
            socket.off('SHOW_QUESTION_MULTIPLE_CHOICE', handleQuestion);
            socket.off('DISABLE_BUZZER', disableBuzzer);
            socket.off('ENABLE_BUZZER', enableBuzzer);
            socket.off('CORRECT_ANSWER', handleCorrectAnswer);
            socket.off('WRONG_ANSWER', handleWrongAnswer);
            socket.off('BUZZER_QUESTION_TYPE', handleQuestionType);
            socket.off('END_ROUND', handleRoundEnd);
            socket.off('END_BUZZER_GAME', handleGameEnd);
            socket.off('OPPONENT_DISCONNECTED', opponentDisconnected)
        };

    }, []);


    return (
        <div className={styles.container}>
            <div className={styles.questionBox}>
                <div className={styles.questionContent}>
                    <p> {question.question} </p>
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
                <button type="button" disabled={isButtonDisabled} onClick={handleSubmit}
                        className={styles.submitButton}>
                    Confirm
                </button>
            </form>
            
            <BuzzerButton toggle={toggleButton} disabled={isBuzzerDisabled}/>
            {!isGameWinnerVisible && (
                <PopUpWinnerRound winner={winnerRound} isVisible={isRoundWinnerVisible} />
            )}
            <PopUpWinnerGame winner={winnerRound} isVisible={isGameWinnerVisible} />
        </div>
    );
};

export default MultipleChoicePage;
