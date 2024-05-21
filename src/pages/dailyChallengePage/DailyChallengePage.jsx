import styles from '../General.module.css'; 
import styles2 from './DailyChallengePage.module.css';  

import FillInTheBlankText from '../../components/fillInTheBlankText/FillInTheBlankText.jsx';

function DailyChallengePage() {
    const text = "This is an example Text, where some words are missing";
    const blankIndices = [2, 5, 7];
    
    return (
        <div>
            <h1>Daily Challenge</h1>
            <FillInTheBlankText text={text} blankIndices={blankIndices} />
        </div>
    );
}   
export default DailyChallengePage;