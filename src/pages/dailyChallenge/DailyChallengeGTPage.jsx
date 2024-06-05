import styles from '../General.module.css'; 
import styles2 from './DailyChallengePage.module.css';  
import FillInTheBlankText from '../../components/fillInTheBlankText/FillInTheBlankText.jsx';
import { socket, requestQuestion } from '../../socket.js';
import { useEffect, useState } from 'react';

function DailyChallengeGTPage() {
    const blankIndices = [];
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        const handleQuestionGapText = (question) => {  
            console.log('Received question', question);
            setQuestion(question);
        };

        socket.on('RECEIVE_QUESTION_GAP_TEXT', handleQuestionGapText);

        return () => {
            socket.off('RECEIVE_QUESTION_GAP_TEXT', handleQuestionGapText);
        };
    }, []);

    return (
        <>
        <div className={styles2.text}>
            <h1>This is today's Daily Challenge</h1>
            <p className={styles2.motivationText}>Challenge yourself! Put your skills to the test.</p>
        </div>
        {question && question.questiontext && (
            <div className={styles2.fillInTheBlanksDiv}>
                <FillInTheBlankText text={question.questiontext} blankIndices={blankIndices} />
            </div>
        )}
        </>
    );
}

export default DailyChallengeGTPage;
