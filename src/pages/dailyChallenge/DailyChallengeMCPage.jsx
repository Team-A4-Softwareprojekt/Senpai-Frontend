import styles from '../General.module.css';
import styles2 from './DailyChallengePage.module.css';
import FillInTheBlankText from '../../components/fillInTheBlankText/FillInTheBlankText.jsx';
import { socket, requestQuestion } from '../../socket.js';
import { useEffect, useState } from 'react';
import ConfirmButton from '../../components/confirmButton/ConfirmButton.jsx';
import BuzzerButton from '../../components/buzzerButton/BuzzerButton.jsx';


function DailyChallengeMCPage() {
    const blankIndices = [];
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');

    useEffect(() => {
        const handleQuestionMultipleChoice = (question) => {  
            console.log('Received question', question);
            setQuestion(question);
        };

        socket.on('RECEIVE_QUESTION_MULTIPLE_CHOICE', handleQuestionMultipleChoice);

        return () => {
            socket.off('RECEIVE_QUESTION_MULTIPLE_CHOICE', handleQuestionMultipleChoice);
        };
    }, []);

    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
    };

    const handleSubmit = () => {
        // handle form submission
    };

    const toggleButton = () => {
        // handle toggle button action
    };

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.questionAndTimer}>
                <div className={styles.questionBox}>
                    <div className={styles.questionContent}>
                        <p>{question.question}</p>
                    </div>
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
                    <ConfirmButton isButtonDisabled={false} handleSubmit={handleSubmit} />
                    <BuzzerButton toggle={toggleButton} disabled={false} />
                </div>
            </form>
        </div>
    );
}

export default DailyChallengeMCPage;
