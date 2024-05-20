import styles from '../General.module.css'; 
import styles2 from './DailyChallengePage.module.css';  

import FillInTheBlankText from '../../components/fillInTheBlankText/FillInTheBlankText.jsx';

function DailyChallengePage() {
    const text = "Das ist ein Beispieltext, in dem einige Wörter fehlen.";
    const blankIndices = [2, 5, 7]; // Die Indizes der Wörter, die ausgelassen werden sollen
    return (
        <div>
            <h1>Daily Challenge</h1>
            <FillInTheBlankText text={text} blankIndices={blankIndices} />
        </div>
    );
}   
export default DailyChallengePage;