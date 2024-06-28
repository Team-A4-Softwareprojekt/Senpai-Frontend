import styles2 from './DailyChallengePage.module.css';  
import FillInTheBlankText from '../../components/fillInTheBlankText/FillInTheBlankText.jsx';
import { socket } from '../../socket.js';
import { useEffect, useState } from 'react';
import HomeButton from '../../buttons/homeButton/HomeButton.jsx';
import {useNavigate} from 'react-router-dom';

function DailyChallengeGTPage() {
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [blankIndices, setBlankIndices] = useState([]);

    const handleHomeClick = () => {
        navigate('/select/code');
    };
    
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
        <div className={styles2.backgroundImage}>
            <HomeButton handleClick={handleHomeClick}/>
            <div className={styles2.centeredContainer}>
                <div className={styles2.text}>
                    <h1 className={styles2.infoText}>This is today's Daily Challenge</h1>
                    <p className={styles2.motivationText}>Challenge yourself! Put your skills to the test.</p>
                </div>
                {question && question.completedtext ? (
                    <div className={styles2.fillInTheBlanksDiv}>
                        <FillInTheBlankText text={question.completedtext} blankIndices={blankIndices} allowHelp={true}/>
                    </div>
                ) : (
                    <div className={styles2.fillInTheBlanksDiv}>
                        <p>Loading question...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DailyChallengeGTPage;
