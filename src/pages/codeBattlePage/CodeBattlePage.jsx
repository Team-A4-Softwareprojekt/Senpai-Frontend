import React, { useState, useEffect, useContext } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { socket, startBuzzerQueue, leaveBuzzerQueue, startManipulationQueue, leaveManipulationQueue } from '../../socket.js';
import { PlayerContext } from "../../context/playerContext.jsx";
import { BuzzerPlayerContext } from "../../context/buzzerQuestionContext.jsx";
import { ManipulationPlayerContext } from "../../context/manipulationQuestionContext.jsx";

function CodeBattlePage() {
    const { playerName } = useContext(PlayerContext);
    const { buzzerQuestion, setBuzzerQuestion } = useContext(BuzzerPlayerContext);
    const { setManipulationQuestion } = useContext(ManipulationPlayerContext);

    const navigate = useNavigate();
    const [isPopUpQueueVisible, setIsPopUpQueueVisible] = useState(false);
    const [isPopUpCountdownVisible, setIsPopUpCountdownVisible] = useState(false);
    const [selectedGameMode, setSelectedGameMode] = useState('');
    const [countdown, setCountdown] = useState(null);

    const [player1Manipulation, setPlayer1Manipulation] = useState(false);
    const [player2Manipulation, setPlayer2Manipulation] = useState(false);
    

    const handleSetQuestionManipulation = (question) => {   
        console.log(question);
        setManipulationQuestion(question);
    };

    useEffect(() => {
        const handleGameFound = (fullRoom) => {
            console.log('Game found', fullRoom);
            setIsPopUpQueueVisible(false);
            setIsPopUpCountdownVisible(true);
        };
    
        const handleGameFoundManipulation = (fullRoom) => {
            console.log('Game found Manipulation', fullRoom);
            setIsPopUpQueueVisible(false);
            setIsPopUpCountdownVisible(true);
            //navigate('/codebattle/manipulation');
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
        };
    
        const handleSetQuestionManipulation = (question) => {   
            console.log(question);
            setManipulationQuestion(question);
        };

        const handlePlayerOneManipulation = (player) => {
            console.log('Player one:', player);
            setPlayer1Manipulation(true);
            navigate('/codebattle/manipulation/player1');
        }

        const handlePlayerTwoManipulation = (player) => {
            console.log('Player two:', player);
            setPlayer2Manipulation(true);
            navigate('/codebattle/manipulation/player2');
        }
    
        // Register the event listeners
        socket.on('Buzzer_GameFound', handleGameFound);
        socket.on('Manipulation_GameFound', handleGameFoundManipulation);
        socket.on('BUZZER_QUESTION_TYPE', handleQuestionType);
        socket.on('BUZZER_COUNTDOWN', handleStartCountdown);
        socket.on('MANIPULATION_COUNTDOWN', handleStartCountdown); 
        socket.on('SET_BUZZER_QUESTION', handleSetQuestion);
        socket.on('SET_MANIPULATION_QUESTION', handleSetQuestionManipulation);
        socket.on('PLAYER_ONE_MANIPULATION', handlePlayerOneManipulation);
        socket.on('PLAYER_TWO_MANIPULATION', handlePlayerTwoManipulation);
    
        // Clean up the listeners when the component is unmounted
        return () => {
            socket.off('Buzzer_GameFound', handleGameFound);
            socket.off('Manipulation_GameFound', handleGameFoundManipulation);
            socket.off('BUZZER_QUESTION_TYPE', handleQuestionType);
            socket.off('BUZZER_COUNTDOWN', handleStartCountdown);
            socket.off('MANIPULATION_COUNTDOWN', handleStartCountdown); 
            socket.off('SET_BUZZER_QUESTION', handleSetQuestion);
            socket.off('SET_MANIPULATION_QUESTION', handleSetQuestionManipulation);
            socket.off('PLAYER_ONE_MANIPULATION', handlePlayerOneManipulation);
            socket.off('PLAYER_TWO_MANIPULATION', handlePlayerTwoManipulation);
        };
    }, [navigate, setBuzzerQuestion, setManipulationQuestion]);

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
        setIsPopUpQueueVisible(true);
    };

    const onManipulationClick = () => {
        startManipulationQueue(playerName);
        setSelectedGameMode('Manipulation');
        setIsPopUpQueueVisible(true);
    };

    const onLimitationClick = () => {
        setSelectedGameMode('Limitation');
        setIsPopUpQueueVisible(true);
    };

    const closePopup = () => {
        if (selectedGameMode === 'Buzzer') {
            leaveBuzzerQueue();
        } else if (selectedGameMode === 'Manipulation') {
            leaveManipulationQueue();
        }
        setIsPopUpQueueVisible(false);
    };

    return ( 
        <div>
            <h1>Choose your battle</h1>
            <div className={styles.cardsGridContainer}>      
                <SelectCard 
                    buttonText="Buzzer"
                    imageUrl={buzzerImg} 
                    modalHeader="Buzzer" 
                    modalText="Compete against another player. Answer questions by pressing a buzzer in a limited time."
                    className={styles.selectCard}
                    handleClick={onBuzzerClick}
                />
                <SelectCard 
                    buttonText="Manipulation" 
                    imageUrl={manipulationImg}
                    modalHeader="Manipulation" 
                    modalText="Compete against another player. Manipulate given Code or fix manipulated Code in a limited time."
                    className={styles.selectCard}
                    handleClick={onManipulationClick}
                />
                <SelectCard 
                    buttonText="Limitation" 
                    imageUrl={limitationImg} 
                    linkTo="*"
                    modalHeader="Limitation" 
                    modalText="Compete with a partner against another team. Each one of you only has a restricted input for solving the problem in a limited time."
                    className={styles.selectCard}
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
                countdown={countdown}
            />   
        </div>  
    );
}

export default CodeBattlePage;
