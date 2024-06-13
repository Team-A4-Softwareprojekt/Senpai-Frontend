import styles from './AccountSettingsPage.module.css';
import UserCard from '../../components/userCard/UserCard.jsx';
import React, {useContext, useState} from 'react';
import HomeButton from '../../components/homeButton/HomeButton';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../../context/playerContext';


function AccountSettingsPage() {
    const navigate = useNavigate();
    const {playerData} = useContext(PlayerContext);
    const [showFriendPopup, setShowFriendPopup] = useState(false);

    const handleHomeClick = () => {
        navigate('/select');
    };

    const toggleFriendPopup = () => {
        setShowFriendPopup(!showFriendPopup);
    };

    return (
        <>
            <HomeButton handleClick={handleHomeClick} />
            <div className={`${styles.accountDiv} ${showFriendPopup ? styles.blurBackground : ''}`}>
                <div className={styles.infoContainer}>
                    <div className={styles.container}>
                        <div className={styles.heading}><strong>General Information</strong></div>
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
                        <div className={styles.heading}><strong>Player Information</strong></div>
                        <div className={styles.infoRowContainer}>
                            <div className={styles.infoRow}>
                                <strong>Streak:</strong> <span>{playerData.streaktoday ? 'Active' : 'Inactive'}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <strong>Rank:</strong> <span>coming soon</span>
                            </div>
                        </div>  
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.button}>Change E-Mail</button>
                    <button className={styles.button}>Change Password</button>
                    <button className={styles.button} onClick={toggleFriendPopup}>Manage Friends</button>
                    <button className={styles.button}>Manage Subscription</button>
                    <button className={styles.button}>Delete Account</button>
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
        </>
    );
}

export default AccountSettingsPage;
