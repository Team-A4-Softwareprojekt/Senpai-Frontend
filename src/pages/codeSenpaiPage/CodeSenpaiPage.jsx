import styles from '../General.module.css';
import styles2 from './CodeSenpaiPage.module.css';
import SelectCard from '../../components/selectCard/SelectCard.jsx';
import codeChallengeImg from '../../assets/codeChallenge.jpg';
import codeBattleImg from '../../assets/codeBattle.jpg';
import codeExerciseImg from '../../assets/codeExercise.jpg';
import React from 'react';
import HomeButton from '../../components/homeButton/HomeButton';
import AccountButton from '../../components/accountButton/AccountButton';

import { useNavigate } from 'react-router-dom';

/*
This is the code-senpai page that holds an account button, amount of lives and three different
game modes to choose from. Each game mode has a modal with the basic explanation of the mode
*/
function codeSenpaiPage() {

    const navigate = useNavigate();
    
    const handleHomeClick = () => {
        navigate('/select');
    };

    const handleAccountClick = () => {
        navigate('/account');
    };

    return( 
        <div>
            <h1>
                Choose your form of training
            </h1>
            <div className= {styles2.cardsGridContainer}>      
                <SelectCard 
                    buttonText= "Daily Challenge"
                    imageUrl={codeChallengeImg}
                    linkTo={"/select/code/dailyChallenge"}
                    modalHeader= "Daily Challenge" 
                    modalText = "Participate in daily challenges to improve your skills and build a continuous learning routine."
                    className= {styles2.selectCard}/>
                <SelectCard 
                    buttonText= "Code Battle"
                    imageUrl={codeBattleImg}
                    linkTo={"/select/code/codeBattle"}
                    modalHeader = "Code Battle" 
                    modalText = "Challenge yourself and compete with others in entertaining code duels to expand your knowledge in a playful way."
                    className= {styles2.selectCard}/>
                <SelectCard 
                    buttonText= "Exercise"
                    imageUrl={codeExerciseImg}
                    linkTo={"/select/code/exercise"}
                    modalHeader= "Exercise" 
                    modalText= "Work on complex tasks in different categories and receive individual feedback from experienced tutors to deepen your understanding."
                    className= {styles2.selectCard}/>
            </div>
            <HomeButton handleClick={handleHomeClick} />
            <AccountButton handleClick={handleAccountClick} />
            
        </div>
        
    );
}
export default codeSenpaiPage;