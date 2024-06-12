import React, {useState, useEffect, useContext} from 'react';
import styles from './CodeBattlePage.module.css';
import SelectCard from '../../components/selectCard/SelectCard.jsx';
import buzzerImg from '../../assets/buzzer.png';
import manipulationImg from '../../assets/manipulation.png';
import limitationImg from '../../assets/limitation.png';
import HomeButton from '../../components/homeButton/HomeButton';
import AccountButton from '../../components/accountButton/AccountButton';
import ChangeTopicButton from '../../components/changeTopicButton/ChangeTopicButton';
import PopUpQueue from '../../components/popUpQueue/PopUpQueue.jsx';
import PopUpCountdown from '../../components/popUpCountdown/PopUpCountdown.jsx';
import {useNavigate} from 'react-router-dom';
import {socket, startBuzzerQueue, leaveBuzzerQueue, disconnectSocket, requestQuestion} from '../../socket.js';
import {PlayerContext} from "../../context/playerContext.jsx";
import {BuzzerPlayerContext} from "../../context/buzzerQuestionContext.jsx";

/*
This is the code battle page that holds an account button, amount of lives and three different
game modes to choose from. Each game mode has a modal with the basic explanation of the mode
*/
function codeBattlePage() {

    const { playerName } = useContext(PlayerContext);
    const { buzzerQuestion, setBuzzerQuestion } = useContext(BuzzerPlayerContext);
    
    const navigate = useNavigate();
    const [isPopUpQueueVisible, setIsPopUpQueueVisible] = useState(false);
    const [isPopUpCountdownVisible, setIsPopUpCountdownVisible] = useState(false);
    const [selectedGameMode, setSelectedGameMode] = useState('');
    const [countdown, setCountdown] = useState(null);
    
    useEffect(() => {
        const handleGameFound = (fullRoom) => {
            console.log('Game found', fullRoom);
            setIsPopUpQueueVisible(false); // Hide the popup
            setIsPopUpCountdownVisible(true);
        };

        const handleQuestionType = (table) => {
            console.log('From table:', table);
            if (table === 'multiplechoicequestion') {
                navigate('/codebattle/buzzer/multiplechoice');
            } else {
                navigate('/codebattle/buzzer/gaptext');
            }
        };

        const handleStartCountdown = (countdown) => {
            console.log('Countdown started', countdown);
            setCountdown(countdown);

        };

        const handleSetQuestion = (question) => {
            console.log(question);
            setBuzzerQuestion(question);
            console.log(buzzerQuestion);
        };

        // Register the event listeners
        socket.on('Buzzer_GameFound', handleGameFound);
        socket.on('BUZZER_QUESTION_TYPE', handleQuestionType);
        socket.on('BUZZER_COUNTDOWN', handleStartCountdown);
        socket.on('SET_BUZZER_QUESTION', handleSetQuestion);

        // Clean up the listeners when the component is unmounted
        return () => {
            socket.off('Buzzer_GameFound', handleGameFound);
            socket.off('BUZZER_QUESTION_TYPE', handleQuestionType);
            socket.off('BUZZER_COUNTDOWN', handleStartCountdown);
            socket.off('SET_BUZZER_QUESTION', handleSetQuestion)
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
        startBuzzerQueue(playerName);
        setSelectedGameMode('Buzzer');
        setIsPopUpQueueVisible(true); // Show the popup
    };

    const onManipulationClick = () => {
        setSelectedGameMode('Manipulation');
        setIsPopUpQueueVisible(true); // Show the popup
    };

    const onLimitationClick = () => {
        setSelectedGameMode('Limitation');
        setIsPopUpQueueVisible(true); // Show the popup
    };

    const closePopup = () => {
        if (selectedGameMode === 'Buzzer') {
            leaveBuzzerQueue();
        }
        setIsPopUpQueueVisible(false); // Hide the popup
    };

    return( 
        <div>
            <h1>
                Choose your battle
            </h1>
            <div className= {styles.cardsGridContainer}>      
                <SelectCard 
                    buttonText= "Buzzer"
                    imageUrl={buzzerImg} 
                    /*linkTo={"/codebattle/buzzer"}*/
                    modalHeader= "Buzzer" 
                    modalText = "Compete against another player. Answer questions by pressing a buzzer in a limited time."
                    className= {styles.selectCard}
                    handleClick={onBuzzerClick}
                />
                <SelectCard 
                    buttonText= "Manipulation" 
                    imageUrl={manipulationImg} 
                    linkTo={"/codebattle/manipulation"}
                    modalHeader = "Manipulation" 
                    modalText = "Compete against another player. Manipulate given Code or fix manipulated Code in a limited time."
                    className= {styles.selectCard}
                    //handleClick={onManipulationClick}
                />
                <SelectCard 
                    buttonText= "Limitation" 
                    imageUrl={limitationImg} 
                    /*linkTo={"*"}*/
                    modalHeader= "Limitation" 
                    modalText= "Compete with a partner against another team. Each one of you only has a restricted input for solving the problem in a limited time."
                    className= {styles.selectCard}
                    handleClick={onLimitationClick}
                />
            </div>
            <HomeButton handleClick={handleHomeClick} />
            <AccountButton handleClick={handleAccountClick} />
            <ChangeTopicButton handleClick={handleChangeTopicClick} />

            <PopUpQueue
                isVisible={isPopUpQueueVisible}
                selectedGameMode={selectedGameMode}
                closePopup={closePopup}
            />

            <PopUpCountdown
                isVisible={isPopUpCountdownVisible}
                closePopup={() => setIsPopUpCountdownVisible(false)}
                countdown={countdown} // Transfer countdown value to the component
            />   
        </div>  
    );
}
export default codeBattlePage;