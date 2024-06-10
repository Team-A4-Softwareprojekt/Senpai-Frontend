import styles from '../General.module.css'; 
import styles2 from './DailyChallengePage.module.css';  
import FillInTheBlankText from '../../components/fillInTheBlankText/FillInTheBlankText.jsx';
import { socket, requestQuestion } from '../../socket.js';
import { useEffect, useState } from 'react';

function DailyChallengeGTPage() {
    const [question, setQuestion] = useState(null);
    const [blankIndices, setBlankIndices] = useState([]);

    useEffect(() => {
        const handleQuestionGapText = (question) => {  
            console.log('Received question:', question);
            setQuestion(question);
            const indices = question.missingwordpositions.split(',').map(Number);
            setBlankIndices(indices);
        };

        console.log('Setting up socket listener for RECEIVE_QUESTION_GAP_TEXT');
        socket.on('RECEIVE_QUESTION_GAP_TEXT', handleQuestionGapText);

        return () => {
            console.log('Cleaning up socket listener for RECEIVE_QUESTION_GAP_TEXT');
            socket.off('RECEIVE_QUESTION_GAP_TEXT', handleQuestionGapText);
        };
    }, []);

    return (
        <>
        <div className={styles2.text}>
            <h1>This is today's Daily Challenge</h1>
            <p className={styles2.motivationText}>Challenge yourself! Put your skills to the test.</p>
        </div>
        {question && question.completedtext ? (
            <div className={styles2.fillInTheBlanksDiv}>
                <FillInTheBlankText text={question.completedtext} blankIndices={blankIndices} allowHelp= {true}/>
            </div>
        ) : (
            <div className={styles2.fillInTheBlanksDiv}>
                <p>Loading question...</p>
            </div>
        )}
        </>
    );
}

export default DailyChallengeGTPage;
