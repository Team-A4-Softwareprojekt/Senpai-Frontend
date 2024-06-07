import styles from '../General.module.css';
import styles2 from './AccountSettingsPage.module.css';
import UserCard from '../../components/userCard/UserCard.jsx';
import React, { useContext } from 'react';
import HomeButton from '../../components/homeButton/HomeButton';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../../context/playerContext';

function AccountSettingsPage() {
    const navigate = useNavigate();
    const { playerData } = useContext(PlayerContext);

    const handleHomeClick = () => {
        navigate('/select');
    };

    return (
        <>
            <HomeButton handleClick={handleHomeClick} />
            <div className={styles2.accountDiv}>
                <div className={styles2.userDiv}>
                    <p>Name: {playerData.playername}</p>
                    <p>Mail: {playerData.email}</p>
                    <p>Streak: {playerData.streaktoday ? 'Active' : 'Inactive'}</p>
                    <button className={styles.button01}>Courses</button>
                    <button className={styles.button01}>Corrected Exercises</button>
                </div>
                <input type="text" placeholder="Search friends" />
                <div className={styles2.friendList}>
                    {/* Example UserCards */}
                    <UserCard userName="Jane Doe" userEmail="jane.doe@gmail.com" userStreak="44"/>
                    <UserCard userName="John Smith" userEmail="john.smith@gmail.com" userStreak="30"/>
                    <UserCard userName="Alice Johnson" userEmail="alice.johnson@gmail.com" userStreak="15"/>
                    <UserCard userName="Bob Anderson" userEmail="bob.anderson@gmail.com" userStreak="10"/>
                </div>
                <footer className={styles2.footerButtons}>
                    <div className={styles2.buttons}>
                        <button className={styles.button01}>Change Password</button>
                        <button className={styles.button01}>Change Subscription</button>
                        <button className={styles.button01}>Delete Account</button>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default AccountSettingsPage;
