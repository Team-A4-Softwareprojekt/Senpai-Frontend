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
import PopUpDailyChallengeCompleted from '../../popups/popUpDailyChallengeCompleted/PopUpDailyChallengeCompleted.jsx';
import { useNavigate } from 'react-router-dom';
import {socket, requestDailyChallengeQuestion} from '../../socket.js';
import {PlayerContext} from '../../context/playerContext';
import {GapTextContext} from '../../context/gapTextQuestionContext.jsx';

/**
 * The CodeSenpaiPage component handles the display and logic for selecting a training mode.
 * It manages state for various popups, player data, and navigation.
 * It also communicates with the server to fetch daily challenge questions and handle socket events.
 */
function codeSenpaiPage() {
    const navigate = useNavigate();
    const [isPopUpExerciseVisible, setIsPopUpExerciseVisible] = useState(false);
    const [isPopUpBuyPremiumVisible, setIsPopUpBuyPremiumVisible] = useState(false);
    const [isPopUpSubscribedTrueVisible, setIsPopUpSubscribedTrueVisible] = useState(false);
    const [isPopUpDailyChallengeCompletedVisible, setIsPopUpDailyChallengeCompletedVisible] = useState(false);
    const {playerData, setPlayerData} = useContext(PlayerContext);
    const {questionGT, setQuestionGT, blankIndices, setBlankIndices} = useContext(GapTextContext);

    // Handle home button click
    const handleHomeClick = () => {
        navigate('/select/code');
    };

    // Handle account button click
    const handleAccountClick = () => {
        navigate('/account');
    };

    // Handle change topic button click
    const handleChangeTopicClick = () => {
        navigate('/select');
    };

    // Handle buy premium button click
    const handleBuyPremiumClick = () => {
        if (playerData.subscribed === true) {
            setIsPopUpSubscribedTrueVisible(true);
        } else {   
            setIsPopUpBuyPremiumVisible(true);
        }
    };

    // Handle daily challenge button click
    const handleDailyChallenge = () => {
        if (playerData.streaktoday === false){
            requestDailyChallengeQuestion();
        } else{
            setIsPopUpDailyChallengeCompletedVisible(true);
        }
    };

    // Handle exercise button click
    const handleExerciseClick = () => {
        setIsPopUpExerciseVisible(true);
    };


    // Handle socket events for receiving questions and question type
    useEffect(() => {

        const handleQuestionType = (table) => {
            console.log('From table:', table);
            if (table === 'multiplechoicequestion') {
                navigate('/select/code/dailyChallenge/multipleChoice');
            } else {
                navigate('/select/code/dailyChallenge/gapText');
            }
        };

        const handleQuestionGapText = (question) => {
            console.log('Received question:', question);
            setQuestionGT(question);
            const indices = question.missingwordpositions.split(',').map(Number);
            setBlankIndices(indices);
        };

        socket.on('BUZZER_QUESTION_TYPE', handleQuestionType);
        socket.on('RECEIVE_QUESTION_GAP_TEXT', handleQuestionGapText);

        return () => {
            socket.off('RECEIVE_QUESTION_GAP_TEXT', handleQuestionGapText);
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
                    modalText={
                    <>
                        Absolviere täglich eine neue Herausforderung und baue deine Streak auf.<br/><br/>
                        Fülle die Lücken mit den richtigen Wörtern aus. Sobald du alle Lücken ausgefüllt hast, kannst du auf den Button "Überprüfen" klicken.<br/><br/>
                        Richtige Antworten werden grün hervorgehoben, während falsche Antworten rot hervorgehoben werden.<br/><br/>
                        Falls du Hilfe benötigst, kannst du auf den Button "Hilfe" klicken. Allerdings wird dadurch deine Streak zurückgesetzt.
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

            <PopUpDailyChallengeCompleted
                isVisible={isPopUpDailyChallengeCompletedVisible}
                closePopUp={() => setIsPopUpDailyChallengeCompletedVisible(false)}
            />
        </div>
    );
}

export default codeSenpaiPage;