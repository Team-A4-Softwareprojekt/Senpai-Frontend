import styles from './CodeSenpaiPage.module.css';
import SelectContentCard from '../../components/selectContentCard/SelectContentCard.jsx';
import codeChallengeImg from '../../assets/codeChallenge.jpg';
import codeBattleImg from '../../assets/codeBattle.jpg';
import codeExerciseImg from '../../assets/codeExercise.jpg';
import React, {useState, useEffect, useContext} from 'react';
import HomeButton from '../../components/homeButton/HomeButton';
import AccountButton from '../../components/accountButton/AccountButton';
import ChangeTopicButton from '../../components/changeTopicButton/ChangeTopicButton';
import PopUpExercise from '../../components/popUpExercise/PopUpExercise';
import { useNavigate } from 'react-router-dom';
import {socket, requestDailyChallengeQuestion} from '../../socket.js';
import {PlayerContext} from '../../context/playerContext';

/*
This is the code-senpai page that holds an account button, amount of lives and three different
game modes to choose from. Each game mode has a modal with the basic explanation of the mode
*/
function codeSenpaiPage() {
    const [isPopUpExerciseVisible, setIsPopUpExerciseVisible] = useState(false);
    const navigate = useNavigate();

    const {playerData, setPlayerData} = useContext(PlayerContext);

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
        if (playerData.streaktoday === false){
            requestDailyChallengeQuestion();
        }else{
            //TODO: Hier bitte ein nettes Popup einfügen
            window.alert('You have already completed the daily challenge for today! Come back tomorrow and see which question is waiting for you.');
        }
        //navigate('/select/code/dailyChallenge');
    };

    const handleExerciseClick = () => {
        setIsPopUpExerciseVisible(true);
    };

    useEffect(() => {

        const handleQuestionType = (table) => {
            console.log('From table:', table);
            if (table === 'multiplechoicequestion') {
                navigate('/select/code/dailyChallenge/multipleChoice');
            } else {
                navigate('/select/code/dailyChallenge/gapText');
            }
        };
        //socket.on('RECEIVE_QUESTION_MULTIPLE_CHOICE',handleQuestionMultipleChoice );
        socket.on('BUZZER_QUESTION_TYPE', handleQuestionType);

        return () => {
            // socket.off('RECEIVE_QUESTION_MULTIPLE_CHOICE',handleQuestionMultipleChoice );
            socket.off('BUZZER_QUESTION_TYPE', handleQuestionType);
        };
    }), [];

    return (
        <div>
            <h1 className={styles.h1}>
                Choose your form of training
            </h1>
            <div className= {styles.cardsGridContainer}>      
                <SelectContentCard 
                    buttonText= "Daily Challenge"
                    imageUrl={codeChallengeImg}
                    /*linkTo={"/select/code/dailyChallenge"}*/
                    modalHeader= "Daily Challenge" 
                    modalText = "Absolviere täglich eine neue Herausforderung und baue deine Streak auf."
                    className= {styles.selectCard}
                    handleClick = {handleDailyChallenge}
                /> 	
                <SelectContentCard 
                    buttonText= "Code Battle"
                    imageUrl={codeBattleImg}
                    linkTo={"/select/code/codeBattle"}
                    modalHeader = "Code Battle" 
                    modalText = "Stelle dich der Herausforderung und trete gegen andere Spieler in spannenden Wettkämpfen an."
                    className= {styles.selectCard}
                />  
                <SelectContentCard 
                     buttonText="Exercise"
                     imageUrl={codeExerciseImg}
                     modalHeader="Exercise" 
                     modalText="Bearbeite komplexe Aufgaben und erhalte direktes Feedback zu deinem Code."
                     className={styles.selectCard}
                     handleClick={handleExerciseClick}
                 />
            </div>
            <HomeButton handleClick={handleHomeClick} />
            <AccountButton handleClick={handleAccountClick} />
            <ChangeTopicButton handleClick={handleChangeTopicClick} />
            
            <PopUpExercise 
                isVisible={isPopUpExerciseVisible} 
                closePopUp={() => setIsPopUpExerciseVisible(false)}/>
        </div>

    );
}

export default codeSenpaiPage;