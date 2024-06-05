import styles from '../General.module.css';
import styles2 from './CodeSenpaiPage.module.css';
import SelectCard from '../../components/selectCard/SelectCard.jsx';
import codeChallengeImg from '../../assets/codeChallenge.jpg';
import codeBattleImg from '../../assets/codeBattle.jpg';
import codeExerciseImg from '../../assets/codeExercise.jpg';
import React, { useEffect } from 'react';
import HomeButton from '../../components/homeButton/HomeButton';
import AccountButton from '../../components/accountButton/AccountButton';
import ChangeTopicButton from '../../components/changeTopicButton/ChangeTopicButton';
import { useNavigate } from 'react-router-dom';
import {socket,requestQuestion, requestDailyChallengeQuestion} from '../../socket.js';

/*
This is the code-senpai page that holds an account button, amount of lives and three different
game modes to choose from. Each game mode has a modal with the basic explanation of the mode
*/
function codeSenpaiPage() {

    const navigate = useNavigate();
    
    const handleHomeClick = () => {
        navigate('/select/code');
    };

    const handleAccountClick = () => {
        navigate('/account');
    };

    const handleChangeTopicClick = () => {
        navigate('/select');
    };

    const handleDailyChallenge = () => {
        requestDailyChallengeQuestion();
        //navigate('/select/code/dailyChallenge');
    };

    useEffect(() => {

        const handleQuestionType = (table) => {
            console.log('From table:', table);
            if (table === 'multiplechoicequestion') {
                // navigate('/codebattle/buzzer/multiplechoice');
            } else {
                navigate('/select/code/dailyChallenge');
            }
        };
        //socket.on('RECEIVE_QUESTION_MULTIPLE_CHOICE',handleQuestionMultipleChoice );
        socket.on('BUZZER_QUESTION_TYPE', handleQuestionType);

        return () => {
           // socket.off('RECEIVE_QUESTION_MULTIPLE_CHOICE',handleQuestionMultipleChoice );
            socket.off('BUZZER_QUESTION_TYPE', handleQuestionType);
        };
    }),[];

    return( 
        <div>
            <h1>
                Choose your form of training
            </h1>
            <div className= {styles2.cardsGridContainer}>      
                <SelectCard 
                    buttonText= "Daily Challenge"
                    imageUrl={codeChallengeImg}
                    /*linkTo={"/select/code/dailyChallenge"}*/
                    modalHeader= "Daily Challenge" 
                    modalText = "Participate in daily challenges to improve your skills and build a continuous learning routine."
                    className= {styles2.selectCard}
                    handleClick = {handleDailyChallenge}
                    />
                    	
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
            <ChangeTopicButton handleClick={handleChangeTopicClick} />
        </div>
        
    );
}
export default codeSenpaiPage;