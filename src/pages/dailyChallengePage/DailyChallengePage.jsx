import styles from '../General.module.css'; 
import styles2 from './DailyChallengePage.module.css';  

import FillInTheBlankText from '../../components/fillInTheBlankText/FillInTheBlankText.jsx';

function DailyChallengePage() {
    const text = "This is an example Text, where some words are missing";
    const blankIndices = [2, 5, 7];
    
    return (
        <>
        <div className = {styles2.text} >
            <h1>This is todays Daily Challenge</h1>
            <p className = {styles2.motivationText}>Challenge yourself! Put your skills to the test.</p>
        </div>
        <div className={styles2.fillInTheBlanksDiv}>
            <FillInTheBlankText text={text} blankIndices={blankIndices} />
        </div>
        </>
        
    );
}   
export default DailyChallengePage;