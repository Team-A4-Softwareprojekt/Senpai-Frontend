import React, { useState, useEffect, useContext } from 'react';
import styles from './CodeBattlePage.module.css';
import SelectGameCard from '../../components/selectGameCard/SelectGameCard.jsx';
import buzzerImg from '../../assets/buzzer.png';
import manipulationImg from '../../assets/manipulation.png';
import limitationImg from '../../assets/limitation.png';
import slideShowGame from '../../assets/slideShowGame.png';
import slideConfirmAnswer from '../../assets/slideConfirmAnswer.png';
import slideRightAnswer from '../../assets/slideRightAnswer.png';
import slideWrongAnswer from '../../assets/slideWrongAnswer.png';
import buzzerGrayImg from '../../assets/buzzerGray.png';
import manipulationGrayImg from '../../assets/manipulationGray.png';
import limitationGrayImg from '../../assets/limitationGray.png';
import emptyHeart from '../../assets/emptyHeart.png';
import redHeart from '../../assets/redHeart.png';
import goldenHeart from '../../assets/goldenHeart.png';
import HomeButton from '../../components/homeButton/HomeButton';
import AccountButton from '../../components/accountButton/AccountButton';
import ChangeTopicButton from '../../components/changeTopicButton/ChangeTopicButton';
import PremiumButton from '../../components/premiumButton/PremiumButton';
import PopUpQueue from '../../components/popUpQueue/PopUpQueue.jsx';
import PopUpCountdown from '../../components/popUpCountdown/PopUpCountdown.jsx';
import PopUpNoHearts from '../../components/popUpNoHearts/PopUpNoHearts.jsx';
import PopUpPremium from '../../components/popUpPremium/PopUpPremium.jsx';
import PopUpSubscribedTrue from '../../components/popUpSubscribedTrue/PopUpSubscribedTrue.jsx';
import {useNavigate} from 'react-router-dom';
import {socket, startBuzzerQueue, leaveBuzzerQueue, disconnectSocket, requestQuestion} from '../../socket.js';
import {PlayerContext} from "../../context/playerContext.jsx";
import {BuzzerPlayerContext} from "../../context/buzzerQuestionContext.jsx";
import { ManipulationPlayerContext } from "../../context/manipulationQuestionContext.jsx";
import {URL} from '../../../url.js';

/*
This is the code battle page that holds an account button, amount of lives and three different
game modes to choose from. Each game mode has a modal with the basic explanation of the mode
*/
function CodeBattlePage() {
    const { playerName, playerData, setPlayerData } = useContext(PlayerContext);
    const { buzzerQuestion, setBuzzerQuestion } = useContext(BuzzerPlayerContext);
    const { setManipulationQuestion } = useContext(ManipulationPlayerContext);

    const navigate = useNavigate();
    const [isPopUpQueueVisible, setIsPopUpQueueVisible] = useState(false);
    const [isPopUpCountdownVisible, setIsPopUpCountdownVisible] = useState(false);
    const [isPopUpNoHeartsVisible, setIsPopUpNoHeartsVisible] = useState(false);
    const [isPopUpBuyPremiumVisible, setIsPopUpBuyPremiumVisible] = useState(false);
    const [isPopUpSubscribedTrueVisible, setIsPopUpSubscribedTrueVisible] = useState(false);
    const [selectedGameMode, setSelectedGameMode] = useState('');
    const [countdown, setCountdown] = useState(null);
    const [hearts, setHearts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [player1Manipulation, setPlayer1Manipulation] = useState(false);
    const [player2Manipulation, setPlayer2Manipulation] = useState(false);

    

    const handleSetQuestionManipulation = (question) => {   
        console.log(question);
        setManipulationQuestion(question);
    };

    useEffect(() => {
        const url = URL + "/loadAccountData";

        const fetchPlayerData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ playerName })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setPlayerData(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerData();
    }, [playerName, setPlayerData]);


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
    
    // Function to render hearts based on player lives
    useEffect(() => {
        const renderHearts = () => {
            const hearts = [];
            if (playerData && playerData.lives !== undefined) {
                for (let i = 0; i < 3; i++) {
                    if (playerData.subscribed === true && i < playerData.lives) {
                        hearts.push(<img key={i} src={goldenHeart} alt="Golden Heart" className={styles.goldenHeart} />);
                    } else {
                        if (i < playerData.lives) {
                            hearts.push(<img key={i} src={redHeart} alt="Red Heart" className={styles.fullRedHeart} />);
                        } else {
                            hearts.push(<img key={i} src={emptyHeart} alt="Empty Heart" className={styles.emptyHeart} />);
                        }
                    }
                }
            }
            return hearts;
        };

        setHearts(renderHearts());
    }, [playerData]);



    const handleHomeClick = () => {
        navigate('/select/code');
    };

    const handleAccountClick = () => {
        navigate('/account');
    };

    const handleChangeTopicClick = () => {
        navigate('/select');
    };

    const handleBuyPremiumClick = () => {
        if (playerData.subscribed === true) {
            setIsPopUpSubscribedTrueVisible(true);
        } else {   
            setIsPopUpBuyPremiumVisible(true);
        }
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


    const slideTexts = [
        "Zu Beginn jeder Runde siehst du eine Frage und vier Antwortmöglichkeiten. Wenn du die Frage beantworten möchtest, dann drücke auf den roten Buzzer unten rechts. Behalte den Timer im Auge und sei schneller als dein Gegner!",
        "Nachdem du den Buzzer gedrückt hast, musst du innerhalb von 5 Sekunden deine Antwort bestätigen. Wenn du dies nicht tust oder falsch antwortest, dann bekommt dein Gegner die Möglichkeit die Frage zu beantworten.",
        "Wenn du richtig geantwortet hast, dann bekommst du einen Punkt. Der Spieler mit den meisten Punkten nach 3 Runden gewinnt das Spiel.",
        "Wenn du nach dem Drücken des Buzzers nicht innerhalb der vorgegebenen Zeit oder falsch antwortest, dann verlierst du einen Punkt."
    ];
    
    const buzzerSlides = [
        { header: "Buzzer", text: slideTexts[0], image: slideShowGame },
        { header: "Buzzer", text: slideTexts[1], image: slideConfirmAnswer },
        { header: "Buzzer", text: slideTexts[2], image: slideRightAnswer },
        { header: "Buzzer", text: slideTexts[3], image: slideWrongAnswer },
    ];


    const handleNoHeartsClick = () => {
        console.log("No hearts click handled");
        setIsPopUpNoHeartsVisible(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }


    return( 
        <div>
            <h1>
                Choose your battle
            </h1>
            <div className={styles.heartsContainer}>
                {hearts}
            </div>
            <div className= {styles.cardsGridContainer}>      
                <SelectGameCard 

                    buttonText= "Buzzer"
                    imageUrl={playerData.lives > 0 ? buzzerImg : buzzerGrayImg}
                    slides={buzzerSlides}
                    handleClick={onBuzzerClick}
                    handleNoHeartsClick={handleNoHeartsClick}
                    lives={playerData.lives}
                    modalHeader="Buzzer"
                    modalText="Compete against another player. Answer questions by pressing a buzzer in a limited time."
                />

                <SelectGameCard 
                    buttonText= "Manipulation" 
                    imageUrl={playerData.lives > 0 ? manipulationImg : manipulationGrayImg}
                    handleClick={onManipulationClick}
                    handleNoHeartsClick={handleNoHeartsClick}
                    lives={playerData.lives}
                    modalHeader="Manipulation"
                    modalText="Compete against another player. Manipulate given Code or fix manipulated Code in a limited time."
                />


                <SelectGameCard 
                    buttonText="Limitation"
                    imageUrl={playerData.lives > 0 ? limitationImg : limitationGrayImg}
                    handleClick={onLimitationClick}
                    handleNoHeartsClick={handleNoHeartsClick}
                    lives={playerData.lives}
                    modalHeader="Limitation"
                    modalText="Compete with a partner against another team. Each one of you only has a restricted input for solving the problem in a limited time."
                />
            </div>
            <HomeButton handleClick={handleHomeClick} />
            <AccountButton handleClick={handleAccountClick} />
            <ChangeTopicButton handleClick={handleChangeTopicClick} />
            <PremiumButton handleClick={handleBuyPremiumClick}/>

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
            
            <PopUpNoHearts
                isVisible={isPopUpNoHeartsVisible}
                closePopup={() => setIsPopUpNoHeartsVisible(false)}
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

export default CodeBattlePage;
