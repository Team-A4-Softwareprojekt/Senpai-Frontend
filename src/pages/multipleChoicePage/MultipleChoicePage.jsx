import React, {useEffect, useState} from 'react';
import styles from './MultipleChoicePage.module.css';
import {socket, startBuzzerQueue, leaveBuzzerQueue, disconnectSocket, requestQuestion} from '../../socket.js';
import BuzzerButton from '../../components/buzzerButton/BuzzerButton.jsx';
import {useNavigate} from 'react-router-dom';

//TODO: Debugging der Situationen, wenn spieler Falsch antworten. Solange immer beim ersten Buzzer korrekt geantwortet wird, funktioniert (eigentlich) alles ;)
const MultipleChoicePage = () => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isBuzzerDisabled, setIsBuzzerDisabled] = useState(false);
    console.log('On Site Load - isButtonDisabled: ' + isButtonDisabled);
    console.log('On Site Load - isBuzzerDisabled: '+ isBuzzerDisabled);


    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);

    };
    const handleSubmit = () => {
        alert(`You selected: ${selectedAnswer}`);
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

        const enableBuzzer=()=>{
            setIsBuzzerDisabled(false);
            console.log('Buzzer enabled')
        }

        const handleCorrectAnswer = () => {
            alert('Your Answer was Correct! You Win this Round!')
            setIsButtonDisabled(true)
        }

        const handleWrongAnswer = () => {
            alert('Your Answer was wrong! Its your Opponents turn now!')
            setIsButtonDisabled(true);
        }

        const handleQuestionType = (table) => {
            console.log('From table:', table);
            if (table === 'multiplechoicequestion') {
                navigate('/codebattle/buzzer/multiplechoice');
            } else {
                navigate('/codebattle/buzzer/gaptext');
            }
        };

        const handleEndRound = () =>{
            requestQuestion();
            setSelectedAnswer(null);
            setIsButtonDisabled(true);
            setIsBuzzerDisabled(false);
        }

        // Handle disabling the buzzer for the other player

        socket.on('SHOW_QUESTION_MULTIPLE_CHOICE', handleQuestion);

        socket.on('DISABLE_BUZZER', disableBuzzer);

        socket.on('ENABLE_BUZZER', enableBuzzer);

        socket.on('CORRECT_ANSWER', handleCorrectAnswer);

        socket.on('WRONG_ANSWER', handleWrongAnswer);

        socket.on('BUZZER_QUESTION_TYPE', handleQuestionType);

        socket.on('END_ROUND', handleEndRound);

        return () => {
            socket.off('SHOW_QUESTION_MULTIPLE_CHOICE', handleQuestion);
            socket.off('DISABLE_BUZZER', disableBuzzer);
            socket.off('ENABLE_BUZZER', enableBuzzer);
            socket.off('CORRECT_ANSWER', handleCorrectAnswer);
            socket.off('WRONG_ANSWER', handleWrongAnswer);
            socket.off('BUZZER_QUESTION_TYPE', handleQuestionType);
            socket.off('END_ROUND', handleEndRound);
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
        </div>
    );
};

export default MultipleChoicePage;
