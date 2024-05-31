import React, { useState, useEffect } from 'react';
import styles from '../General.module.css';
import styles2 from './CodeBattlePage.module.css';
import SelectCard from '../../components/selectCard/SelectCard.jsx';
import buzzerImg from '../../assets/buzzer.png';
import manipulationImg from '../../assets/manipulation.png';
import limitationImg from '../../assets/limitation.png';
import HomeButton from '../../components/homeButton/HomeButton';
import AccountButton from '../../components/accountButton/AccountButton';
import ChangeTopicButton from '../../components/changeTopicButton/ChangeTopicButton';
import { useNavigate } from 'react-router-dom';
import {socket, startBuzzerQueue, leaveBuzzerQueue, disconnectSocket, requestQuestion} from '../../socket.js';

/*
This is the code battle page that holds an account button, amount of lives and three different
game modes to choose from. Each game mode has a modal with the basic explanation of the mode
*/
function codeBattlePage() {
    
    const navigate = useNavigate();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedGameMode, setSelectedGameMode] = useState('');
    
    useEffect(() => {
        const handleGameFound = (fullRoom) => {
            console.log('Game found', fullRoom);
            setIsPopupVisible(false); // Hide the popup
            requestQuestion();
        };

        const handleQuestionType = (table) => {
            console.log('From table:', table);
            if (table === 'multiplechoicequestion') {
                navigate('/codebattle/buzzer/multiplechoice');
            } else {
                navigate('/codebattle/buzzer/gaptext');
            }
        };

        // Register the event listeners
        socket.on('Buzzer_GameFound', handleGameFound);
        socket.on('BUZZER_QUESTION_TYPE', handleQuestionType);

        // Clean up the listeners when the component is unmounted
        return () => {
            socket.off('Buzzer_GameFound', handleGameFound);
            socket.off('BUZZER_QUESTION_TYPE', handleQuestionType);
        };
    }, [navigate]);
    
    const handleHomeClick = () => {
        navigate('/select/code');
    };

    const handleAccountClick = () => {
        navigate('/account');
    };

    const handleChangeTopicClick = () => {
        navigate('/select');
    };

    const onBuzzerClick = () => {
        startBuzzerQueue();
        setSelectedGameMode('Buzzer');
        setIsPopupVisible(true); // Show the popup
    };

    const onManipulationClick = () => {
        setSelectedGameMode('Manipulation');
        setIsPopupVisible(true); // Show the popup
    };

    const onLimitationClick = () => {
        setSelectedGameMode('Limitation');
        setIsPopupVisible(true); // Show the popup
    };

    const closePopup = () => {
        if (selectedGameMode === 'Buzzer') {
            leaveBuzzerQueue();
        }
        setIsPopupVisible(false); // Hide the popup
    };

    return( 
        <div>
            <h1>
                Choose your battle
            </h1>
            <div className= {styles2.cardsGridContainer}>      
                <SelectCard 
                    buttonText= "Buzzer"
                    imageUrl={buzzerImg} 
                    /*linkTo={"/codebattle/buzzer"}*/
                    modalHeader= "Buzzer" 
                    modalText = "Compete against another player. Answer questions by pressing a buzzer in a limited time."
                    className= {styles2.selectCard}
                    handleClick={onBuzzerClick}
                />
                <SelectCard 
                    buttonText= "Manipulation" 
                    imageUrl={manipulationImg} 
                    /*linkTo={"*"}*/
                    modalHeader = "Manipulation" 
                    modalText = "Compete against another player. Manipulate given Code or fix manipulated Code in a limited time."
                    className= {styles2.selectCard}
                    handleClick={onManipulationClick}
                />
                <SelectCard 
                    buttonText= "Limitation" 
                    imageUrl={limitationImg} 
                    /*linkTo={"*"}*/
                    modalHeader= "Limitation" 
                    modalText= "Compete with a partner against another team. Each one of you only has a restricted input for solving the problem in a limited time."
                    className= {styles2.selectCard}
                    handleClick={onLimitationClick}
                />
            </div>
            <HomeButton handleClick={handleHomeClick} />
            <AccountButton handleClick={handleAccountClick} />
            <ChangeTopicButton handleClick={handleChangeTopicClick} />

            {isPopupVisible && (
                <>
                    <div className={styles2.overlay} />
                    <div className={styles2.popup}>
                        <div className={styles2.popupContent}>
                            <h2>Gamemode:&nbsp;<span className={styles2.highlighted}>{selectedGameMode}</span></h2>
                            <h2>Waiting for another player...</h2>
                            <button onClick={closePopup}>Cancel</button>
                        </div>
                    </div>
                </>
            )}
        </div>  
    );
}
export default codeBattlePage;