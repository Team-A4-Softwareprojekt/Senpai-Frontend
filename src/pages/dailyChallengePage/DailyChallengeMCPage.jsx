import styles from '../General.module.css';
import styles2 from './DailyChallengePage.module.css';
import { useEffect, useState } from 'react';
import { socket } from '../../socket.js';
import ConfirmButton from '../../buttons/confirmButton/ConfirmButton.jsx';

function DailyChallengeMCPage() {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [solution, setSolution] = useState('');
    const [winnerRound, setWinnerRound] = useState('');
    const [isRoundWinnerVisible, setIsRoundWinnerVisible] = useState(false);

    useEffect(() => {
        const handleQuestionMultipleChoice = (question) => {
            console.log('Received question', question);
            setQuestion(question);
        };

        const handleRoundEnd = (playerName, solution) => {
            setWinnerRound(playerName);
            setSolution(solution);
            setIsRoundWinnerVisible(true);
        };

        socket.on('RECEIVE_QUESTION_MULTIPLE_CHOICE', handleQuestionMultipleChoice);
        socket.on('END_ROUND', handleRoundEnd);

        return () => {
            socket.off('RECEIVE_QUESTION_MULTIPLE_CHOICE', handleQuestionMultipleChoice);
            socket.off('END_ROUND', handleRoundEnd);
        };
    }, []);

    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
    };

    const handleSubmit = () => {
        // handle form submission
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
            <form className={styles.form} onSubmit={handleSubmit}>
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
                </div>
            </form>
            {isRoundWinnerVisible && (
                <div className={styles.roundEndInfo}>
                    <p>Winner of the round: {winnerRound}</p>
                    <p>Solution: {solution}</p>
                </div>
            )}
        </div>
    );
}

export default DailyChallengeMCPage;
