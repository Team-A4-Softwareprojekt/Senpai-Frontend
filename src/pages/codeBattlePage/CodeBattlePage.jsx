import React, { useState, useEffect, useContext } from 'react';
import styles from './CodeBattlePage.module.css';
import SelectGameCard from '../../cards/selectGameCard/SelectGameCard.jsx';
import buzzerImg from '../../assets/buzzerGame.png';
import manipulationImg from '../../assets/manipulationGame.png';
import limitationImg from '../../assets/limitationGame.png';

import slideShowGame from '../../assets/slideShowGame.png';
import slideConfirmAnswer from '../../assets/slideConfirmAnswer.png';
import slideRightAnswer from '../../assets/slideRightAnswer.png';
import slideWrongAnswer from '../../assets/slideWrongAnswer.png';

import manipulationSlide01 from '../../assets/manipulationSlide01.png';
import manipulationSlide02 from '../../assets/manipulationSlide02.png';
import manipulationSlide03 from '../../assets/manipulationSlide03.png';

import buzzerGrayImg from '../../assets/buzzerGray.png';
import manipulationGrayImg from '../../assets/manipulationGray.png';
import limitationGrayImg from '../../assets/limitationGray.png';
import brokenHeart from '../../assets/brokenHeart.png';
import redHeart from '../../assets/redHeart.png';
import goldenHeart from '../../assets/goldenHeart.png';
import HomeButton from '../../buttons/homeButton/HomeButton';
import AccountButton from '../../buttons/accountButton/AccountButton';
import ChangeTopicButton from '../../buttons/changeTopicButton/ChangeTopicButton';
import PremiumButton from '../../buttons/premiumButton/PremiumButton';
import PopUpQueue from '../../popups/popUpQueue/PopUpQueue.jsx';
import PopUpCountdown from '../../popups/popUpCountdown/PopUpCountdown.jsx';
import PopUpNoHearts from '../../popups/popUpNoHearts/PopUpNoHearts.jsx';
import PopUpPremium from '../../popups/popUpPremium/PopUpPremium.jsx';
import PopUpSubscribedTrue from '../../popups/popUpSubscribedTrue/PopUpSubscribedTrue.jsx';
import PopUpMissingContent from '../../popups/popUpMissingContent/PopUpMissingContent.jsx';
import {useNavigate} from 'react-router-dom';
import {socket, startBuzzerQueue, leaveBuzzerQueue, disconnectSocket, startManipulationQueue, leaveManipulationQueue} from '../../socket.js';
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
    const [isPopUpMissingContentVisible, setIsPopUpMissingContentVisible] = useState(false);
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
                console.log('Response from server:', data);
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

        };
    
        const handleQuestionType = (table) => {
            console.log('From table:', table);
            if (table === 'multiplechoicequestion') {
                navigate('/codebattle/buzzer/multiplechoice');
            } else {
                navigate('/codebattle/buzzer/gaptext');
            }
        };

        const handleQuestionTypeManipulation = () => {
            navigate('/codebattle/manipulation/player1');
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

        /*
        const handlePlayerOneManipulation = (player) => {
            console.log('Player one:', player);
            setPlayer1Manipulation(true);
            navigate('/codebattle/manipulation/player1');
        }

        const handlePlayerTwoManipulation = (player) => {
            console.log('Player two:', player);
            setPlayer2Manipulation(true);
            navigate('/codebattle/manipulation/player1');
        }

         */
    
        // Register the event listeners
        socket.on('Buzzer_GameFound', handleGameFound);
        socket.on('Manipulation_GameFound', handleGameFoundManipulation);
        socket.on('MANIPULATION_QUESTION_TYPE', handleQuestionTypeManipulation);
        socket.on('BUZZER_QUESTION_TYPE', handleQuestionType);
        socket.on('BUZZER_COUNTDOWN', handleStartCountdown);
        socket.on('MANIPULATION_COUNTDOWN', handleStartCountdown); 
        socket.on('SET_BUZZER_QUESTION', handleSetQuestion);
        socket.on('SET_MANIPULATION_QUESTION', handleSetQuestionManipulation);
        //socket.on('PLAYER_ONE_MANIPULATION', handlePlayerOneManipulation);
        //socket.on('PLAYER_TWO_MANIPULATION', handlePlayerTwoManipulation);
    
        // Clean up the listeners when the component is unmounted
        return () => {
            socket.off('Buzzer_GameFound', handleGameFound);
            socket.off('Manipulation_GameFound', handleGameFoundManipulation);
            socket.off('MANIPULATION_QUESTION_TYPE', handleGameFoundManipulation);
            socket.off('BUZZER_QUESTION_TYPE', handleQuestionType);
            socket.off('BUZZER_COUNTDOWN', handleStartCountdown);
            socket.off('MANIPULATION_COUNTDOWN', handleStartCountdown); 
            socket.off('SET_BUZZER_QUESTION', handleSetQuestion);
            socket.off('SET_MANIPULATION_QUESTION', handleSetQuestionManipulation);
            //socket.off('PLAYER_ONE_MANIPULATION', handlePlayerOneManipulation);
            //socket.off('PLAYER_TWO_MANIPULATION', handlePlayerTwoManipulation);
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
                            hearts.push(<img key={i} src={brokenHeart} alt="Broken Heart" className={styles.brokenHeart} />);
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
        setIsPopUpMissingContentVisible(true);
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

    const manipulationSlideTexts = [
        "Zu Beginn erhältst du einen Codeausschnitt, den du so verändern musst, dass er nicht mehr kompiliert. Zeige deine Fähigkeiten, indem du den Code geschickt manipulierst und deinen Gegner herausforderst.",
        "Sobald du fertig bist, klicke auf den Submit-Button und warte auf deinen Gegner.",
        "Wenn dein Gegner fertig ist, dann wird der Code deines Gegners angezeigt und du musst diesen reparieren."
    ];
    
    const buzzerSlides = [
        { header: "Buzzer", text: slideTexts[0], image: slideShowGame },
        { header: "Buzzer", text: slideTexts[1], image: slideConfirmAnswer },
        { header: "Buzzer", text: slideTexts[2], image: slideRightAnswer },
        { header: "Buzzer", text: slideTexts[3], image: slideWrongAnswer },
    ];

    const limitationInfoText = 
        `Dieser Spielmodi wird nur im „2vs2“ angeboten, sodass insgesamt vier Spieler teilnehmen müssen, damit das Spiel beginnen kann.
        Es wird eine Aufgabe präsentiert, die die beiden Teams in begrenzter Zeit lösen müssen.
        Dabei hat jeder Spieler nur eine begrenzte Anzahl an Zeichen zur Verfügung.
        Eine Kommunikation zwischen den beiden Spielern im Team ist nicht möglich.
        Aufgrund dessen müssen beide Spieler genau wissen, wie die Aufgabe gelöst werden kann, um das Spiel zu gewinnen.
        Das Gewinnerteam bekommt einen Punkt.`;

    const limitationInfo = [
        { 
            header: "Limitation", 
            text: limitationInfoText.trim(), 
        }];

    const manipulationSlides = [
        { header: "Manipulation", text: manipulationSlideTexts[0], image: manipulationSlide01 },
        { header: "Manipulation", text: manipulationSlideTexts[1], image: manipulationSlide02 },
        { header: "Manipulation", text: manipulationSlideTexts[2], image: manipulationSlide03 },

    ];

    const handleNoHeartsClick = () => {
        console.log("No hearts click handled");
        setIsPopUpNoHeartsVisible(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }


    return( 
        <div className={styles.backgroundContainer}>
            <div className={styles.buttonBar}>
                <HomeButton handleClick={handleHomeClick} />
                <ChangeTopicButton handleClick={handleChangeTopicClick} />
                <PremiumButton handleClick={handleBuyPremiumClick} />
                <AccountButton handleClick={handleAccountClick} />
            </div>
            <div className={styles.heartsContainer}>
                {hearts}
            </div>
            <div className={styles.h1}>
                Wähle einen Spielmodus
            </div>
            <div className= {styles.cardsGridContainer}>      
                <SelectGameCard 
                    buttonText= "Buzzer"
                    imageUrl={playerData.lives > 0 ? buzzerImg : buzzerGrayImg}
                    slides={buzzerSlides}
                    handleClick={onBuzzerClick}
                    handleNoHeartsClick={handleNoHeartsClick}
                    lives={playerData.lives}
                    selectedOption="Java"
                />
                <SelectGameCard 
                    buttonText= "Manipulation" 
                    imageUrl={playerData.lives > 0 ? manipulationImg : manipulationGrayImg}
                    slides = {manipulationSlides}
                    handleClick={onManipulationClick}
                    handleNoHeartsClick={handleNoHeartsClick}
                    lives={playerData.lives}
                    selectedOption="JavaScript"
                />
                <SelectGameCard 
                    buttonText="Limitation"
                    imageUrl={playerData.lives > 0 ? limitationImg : limitationGrayImg}
                    slides={limitationInfo}
                    handleClick={onLimitationClick}
                    handleNoHeartsClick={handleNoHeartsClick}
                    lives={playerData.lives}
                    selectedOption="Python"
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

            <PopUpMissingContent
                isVisible={isPopUpMissingContentVisible}
                closePopUp={() => setIsPopUpMissingContentVisible(false)}
            />
        </div>  
    );
}

export default CodeBattlePage;
