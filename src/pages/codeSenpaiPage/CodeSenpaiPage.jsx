import styles from './CodeSenpaiPage.module.css';
import SelectContentCard from '../../cards/selectContentCard/SelectContentCard.jsx';
import codeChallengeImg from '../../assets/codeChallenge.png';
import codeBattleImg from '../../assets/codeBattle.png';
import codeExerciseImg from '../../assets/codeExercise.png';
import React, {useState, useEffect, useContext} from 'react';
import HomeButton from '../../buttons/homeButton/HomeButton.jsx';
import ChangeTopicButton from '../../buttons/changeTopicButton/ChangeTopicButton.jsx';
import PremiumButton from '../../buttons/premiumButton/PremiumButton.jsx';
import AccountButton from '../../buttons/accountButton/AccountButton';
import PopUpExercise from '../../popups/popUpExercise/PopUpExercise.jsx';
import PopUpPremium from '../../popups/popUpPremium/PopUpPremium.jsx';
import PopUpSubscribedTrue from '../../popups/popUpSubscribedTrue/PopUpSubscribedTrue.jsx';
import { useNavigate } from 'react-router-dom';
import {socket, requestDailyChallengeQuestion} from '../../socket.js';
import {PlayerContext} from '../../context/playerContext';

/*
This is the code-senpai page that holds an account button, amount of lives and three different
game modes to choose from. Each game mode has a modal with the basic explanation of the mode
*/
function codeSenpaiPage() {
    const [isPopUpExerciseVisible, setIsPopUpExerciseVisible] = useState(false);
    const [isPopUpBuyPremiumVisible, setIsPopUpBuyPremiumVisible] = useState(false);
    const [isPopUpSubscribedTrueVisible, setIsPopUpSubscribedTrueVisible] = useState(false);
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

    const handleBuyPremiumClick = () => {
        if (playerData.subscribed === true) {
            setIsPopUpSubscribedTrueVisible(true);
        } else {   
            setIsPopUpBuyPremiumVisible(true);
        }
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
        <div className={styles.backgroundContainer}>
            <div className={styles.buttonBar}>
                <HomeButton handleClick={handleHomeClick} />
                <ChangeTopicButton handleClick={handleChangeTopicClick} />
                <PremiumButton handleClick={handleBuyPremiumClick} />
                <AccountButton handleClick={handleAccountClick} />
            </div>
            <div className={styles.h1}>
                Wähle einen Trainingsmodus
            </div>
            <div className={styles.cardsGridContainer}>
                <SelectContentCard 
                    buttonText="Daily Challenge"
                    imageUrl={codeChallengeImg}
                    modalHeader="Daily Challenge" 
                    modalText={<>
                        Absolviere täglich eine neue Herausforderung und baue deine Streak auf.<br/><br/>
                        Fülle die Lücken mit den richtigen Wörtern aus. Sobald du alle Lücken ausgefüllt hast, kannst du auf den Button "Überprüfen" klicken.<br/><br/>
                        Richtige Antworten werden grün hervorgehoben, während falsche Antworten rot hervorgehoben werden.
                    </>}
                    className={styles.selectCard}
                    handleClick={handleDailyChallenge}
                />
                <SelectContentCard 
                    buttonText="Code Battle"
                    imageUrl={codeBattleImg}
                    linkTo="/select/code/codeBattle"
                    modalHeader="Code Battle" 
                    modalText="Stelle dich der Herausforderung und trete gegen andere Spieler in spannenden Wettkämpfen an."
                    className={styles.selectCard}
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
            
            <PopUpExercise 
                isVisible={isPopUpExerciseVisible} 
                closePopUp={() => setIsPopUpExerciseVisible(false)}
            />

            <PopUpPremium
                isVisible={isPopUpBuyPremiumVisible}
                closePopUp={() => setIsPopUpBuyPremiumVisible(false)}
            />

            <PopUpSubscribedTrue
                isVisible={isPopUpSubscribedTrueVisible}
                closePopUp={() => setIsPopUpSubscribedTrueVisible(false)}
            />
        </div>
    );
}

export default codeSenpaiPage;