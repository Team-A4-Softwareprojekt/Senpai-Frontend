import styles from '../General.module.css';
import styles2 from './CodeSenpaiPage.module.css';
import SelectCard from '../../components/selectCard/SelectCard.js';
import codeChallengeImg from '../../assets/codeChallenge.jpg';
import codeBattleImg from '../../assets/codeBattle.jpg';
import codeExerciseImg from '../../assets/codeExercise.jpg';

/*
This is the code-senpai page that holds an account button, amount of lives and three different
game modes to choose from. Each game mode has a modal with the basic explanation of the mode
*/
function codeSenpaiPage() {
    return(
        <div>
            <h1>
                Choose Your Form Of Training
            </h1>
            <div className= {styles2.cardsGridContainer}>
            
            <SelectCard buttonText= "Daily Challenge" imageUrl={codeChallengeImg} linkTo={"*"}
            modalHeader= "Daily Challenge" 
            modalText = "Participate in daily challenges to improve your skills and build a continuous learning routine."/>
            <SelectCard buttonText= "Code Battle" imageUrl={codeBattleImg} linkTo={"*"}
            modalHeader = "Code Battle" 
            modalText = "Challenge yourself and compete with others in entertaining code duels to expand your knowledge in a playful way."/>
            <SelectCard buttonText= "Exercise" imageUrl={codeExerciseImg} linkTo={"*"}
            modalHeader= "Exercise" 
            modalText= "Work on complex tasks in different categories and receive individual feedback from experienced tutors to deepen your understanding."/>
            </div>
            <div className= {styles2.accountButtonContainer}>
                <button className= {styles.button01}>Account</button>
            </div>
            
        </div>
        
    );
}
export default codeSenpaiPage;