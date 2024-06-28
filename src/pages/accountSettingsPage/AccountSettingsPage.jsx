import styles from './AccountSettingsPage.module.css';
import UserCard from '../../cards/userCard/UserCard.jsx';
import React, {useContext, useState} from 'react';
import HomeButton from '../../buttons/homeButton/HomeButton';
import {useNavigate} from 'react-router-dom';
import {PlayerContext} from '../../context/playerContext';
import PopUpChangeEmail from '../../popups/popUpChangeEmail/PopUpChangeEmail.jsx';
import PopUpChangePassword from '../../popups/popUpChangePassword/PopUpChangePassword.jsx';
import PopUpPremium from '../../popups/popUpPremium/PopUpPremium.jsx';
import PopUpSubscribedTrue from '../../popups/popUpSubscribedTrue/PopUpSubscribedTrue.jsx';
import PopUpDeleteAccount from '../../popups/popUpDeleteAccount/PopUpDeleteAccount.jsx';

function AccountSettingsPage() {
    const navigate = useNavigate();
    const {playerData} = useContext(PlayerContext);
    const [showFriendPopup, setShowFriendPopup] = useState(false);
    const [isPopUpChangeEmailVisible, setIsPopUpChangeEmailVisible] = useState(false);
    const [isPopUpChangePasswordVisible, setIsPopUpChangePasswordVisible] = useState(false);
    const [isPopUpPremiumVisible, setIsPopUpPremiumVisible] = useState(false);
    const [isPopUpSubscribedTrueVisible, setIsPopUpSubscribedTrueVisible] = useState(false);
    const [isPopUpDeleteAccountVisible, setIsPopUpDeleteAccountVisible] = useState(false);
    const today = new Date();
    const missedStreakDate = new Date(playerData.missedstreak);


    const handleHomeClick = () => {
        navigate('/select');
    };

    const handleChangeEmailClick = () => {
        setIsPopUpChangeEmailVisible(true);
    }

    const handleChangePasswordClick = () => {
        setIsPopUpChangePasswordVisible(true);
    }

    const handleBuyPremiumClick = () => {
        if (playerData.subscribed === true) {
            setIsPopUpSubscribedTrueVisible(true);
        } else {   
            setIsPopUpPremiumVisible(true);
        }
    }

    const handleDeleteAccountClick = () => {
        setIsPopUpDeleteAccountVisible(true);
    }

    const toggleFriendPopup = () => {
        setShowFriendPopup(!showFriendPopup);
    };

    const calculateStreak = () =>{
        let today = new Date();
        let missedStreakDate = new Date(playerData.missedstreak);
        let timeDifference = 0;
        let daysDifference = 0;
        console.log(today.date);
        console.log(playerData.missedstreak);



        if(playerData.streaktoday === false){
            // Berechnen der Differenz in Millisekunden
            timeDifference = Math.abs(today.getTime() - missedStreakDate.getTime());
            // Konvertieren der Differenz in Tage
            daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24) - 2); // Verwende Math.ceil, um aufzurunden
        }else{
            // Berechnen der Differenz in Millisekunden
            timeDifference = Math.abs(today.getTime() - missedStreakDate.getTime());

            // Konvertieren der Differenz in Tage
            daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24) -1); // Verwende Math.ceil, um aufzurunden
        }


        return daysDifference;
    }

    const streakValue = calculateStreak();
    console.log(streakValue);

    return (
        <>
            <div className={styles.backgroundContainer}>
                <HomeButton handleClick={handleHomeClick} />
                <div className={`${styles.accountDiv} ${showFriendPopup ? styles.blurBackground : ''}`}>
                    <div className={styles.infoContainer}>
                        <div className={styles.container}>
                            <div className={styles.heading}><strong>Allgemeine Informationen</strong></div>
                            <div className={styles.infoRowContainer}>
                                <div className={styles.infoRow}>
                                    <strong>Name:</strong> <span>{playerData.playername}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <strong>E-Mail:</strong> <span>{playerData.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.container}>
                            <div className={styles.heading}><strong>Spieler Informationen</strong></div>
                            <div className={styles.infoRowContainer}>
                                <div className={styles.infoRow}>
                                    <strong>Streak:</strong> <span>{streakValue}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <strong>Rang:</strong> <span>bald verfügbar</span>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={handleChangeEmailClick}>E-Mail ändern</button>
                        <button className={styles.button} onClick={handleChangePasswordClick}>Passwort ändern</button>
                        <button className={styles.button} onClick={handleBuyPremiumClick}>Premium kaufen</button>
                        <button className={styles.button} onClick={toggleFriendPopup}>Freundesliste</button>
                        <button className={styles.deleteAccountButton} onClick={handleDeleteAccountClick}>Account löschen</button>
                    </div>
                </div>
                {showFriendPopup && (
                    <div className={styles.overlay}>
                        <div className={styles.friendPopup}>
                            <input type="text" placeholder="Search friend" />
                            <div className={styles.friendList}>
                                <UserCard userName="Jane Doe" userEmail="jane.doe@gmail.com" userStreak="44" />
                                <UserCard userName="John Smith" userEmail="john.smith@gmail.com" userStreak="30" />
                                <UserCard userName="Alice Johnson" userEmail="alice.johnson@gmail.com" userStreak="15" />
                                <UserCard userName="Bob Anderson" userEmail="bob.anderson@gmail.com" userStreak="10" />
                                <UserCard userName="Peter Neumann" userEmail="peter.neumann@gmail.com" userStreak="20" />
                            </div>
                            <button className={styles.closeButton} onClick={toggleFriendPopup}>Close</button>
                        </div>
                    </div>
                )}
                <PopUpChangeEmail 
                    closePopUp={() => setIsPopUpChangeEmailVisible(false)} 
                    isVisible={isPopUpChangeEmailVisible} 
                />

                <PopUpChangePassword 
                    closePopUp={() => setIsPopUpChangePasswordVisible(false)} 
                    isVisible={isPopUpChangePasswordVisible}
                />

                <PopUpPremium 
                    closePopUp={() => setIsPopUpPremiumVisible(false)} 
                    isVisible={isPopUpPremiumVisible}
                />

                <PopUpSubscribedTrue
                    closePopUp={() => setIsPopUpSubscribedTrueVisible(false)}
                    isVisible={isPopUpSubscribedTrueVisible}
                />
                
                <PopUpDeleteAccount 
                    closePopUp={() => setIsPopUpDeleteAccountVisible(false)} 
                    isVisible={isPopUpDeleteAccountVisible}
                />
            </div>
        </>
    );
}

export default AccountSettingsPage;
