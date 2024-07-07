import styles from './DailyChallengePage.module.css';  
import FillInTheBlankText from '../../components/fillInTheBlankText/FillInTheBlankText.jsx';
import {socket} from '../../socket.js';
import {useContext, useEffect} from 'react';
import HomeButton from '../../buttons/homeButton/HomeButton.jsx';
import {useNavigate} from 'react-router-dom';
import {GapTextContext} from '../../context/gapTextQuestionContext.jsx';

/**
 * DailyChallengeGTPage Component
 * 
 * This component renders the daily challenge page for gap text questions.
 * It uses the GapTextContext to manage the state of the question and blank indices.
 * The component listens for a socket event to receive the question data and updates
 * the state accordingly. It also provides a HomeButton to navigate back to the code
 * selection page.
 * 
 * Props:
 * - None
 * 
 * Context:
 * - GapTextContext: Manages the state of the gap text question and blank indices.
 * 
 * State:
 * - questionGT: The current gap text question received from the server.
 * - blankIndices: The positions of the blanks in the gap text question.
 * 
 * Hooks:
 * - useNavigate: Used to navigate to different routes.
 * - useContext: Used to access the GapTextContext.
 * - useEffect: Used to set up and clean up the socket event listener.
 */
function DailyChallengeGTPage() {
    const navigate = useNavigate();

    // Accessing context for gap text question data
    const {questionGT, setQuestionGT, blankIndices, setBlankIndices} = useContext(GapTextContext);

    // Function to handle home button click, navigates to the code selection page
    const handleHomeClick = () => {
        navigate('/select/code');
    };
    
    useEffect(() => {
        // Function to handle receiving a gap text question from the server
        const handleQuestionGapText = (question) => {  
            setQuestionGT(question);
            const indices = question.missingwordpositions.split(',').map(Number);
            setBlankIndices(indices);
        };

        // Register the event listener for receiving gap text questions
        socket.on('RECEIVE_QUESTION_GAP_TEXT', handleQuestionGapText);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            socket.off('RECEIVE_QUESTION_GAP_TEXT', handleQuestionGapText);
        };
    }, []);


    return (
        <div className={styles.backgroundImage}>
            <div className={styles.container}>
                <HomeButton handleClick={handleHomeClick}/>
                <div className={styles.centeredContainer}>
                    <div className={styles.text}>
                        <h1 className={styles.infoText}>Das ist die heutige Daily Challenge</h1>
                        <p className={styles.motivationText}>Stelle dich der Herausforderung und überprüfe dein Wissen!</p>
                    </div>
                    {questionGT && questionGT.completedtext ? (
                        <div className={styles.fillInTheBlanksDiv}>
                            <FillInTheBlankText text={questionGT.completedtext} blankIndices={blankIndices} allowHelp={true}/>
                        </div>
                    ) : (
                        <div className={styles.fillInTheBlanksDiv}>
                            Frage wird geladen...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DailyChallengeGTPage;
