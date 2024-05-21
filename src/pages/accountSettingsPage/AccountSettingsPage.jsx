import styles from '../General.module.css';
import styles2 from './AccountSettingsPage.module.css';
import UserCard from '../../components/userCard/UserCard.jsx';
import React from 'react';
import HomeButton from '../../components/homeButton/HomeButton';
import { useNavigate } from 'react-router-dom';

function AccountSettingsPage() {

    const navigate = useNavigate();
    
    const handleHomeClick = () => {
        navigate('/select');
    };

    return (
        <>
        <HomeButton handleClick={handleHomeClick} />
        <div className={styles2.accountDiv}>
            <div className= {styles2.userDiv}>
                <p>Name: Max Mustermann</p>
                <p>Mail: max.mustermann@gmail.com</p>
                <p>Streak: 20 </p>
                <button className={styles.button01}>Courses</button>
                <button className={styles.button01}>Corrected Exercises</button>
                
            </div>
            <input type="text" placeholder="Search friends"/>
            <div className={styles2.friendList}>
                
                <UserCard 
                    userName = "Jane Doe" 
                    userEmail= "jane.doe@gmail.com"
                    userStreak= "44">
                </UserCard>
                <UserCard 
                    userName="John Smith" 
                    userEmail="john.smith@gmail.com"
                    userStreak="30"
                />
                <UserCard 
                    userName="Alice Johnson" 
                    userEmail="alice.johnson@gmail.com"
                    userStreak="15"
                />
                <UserCard 
                    userName="Bob Anderson" 
                    userEmail="bob.anderson@gmail.com"
                    userStreak="10"
                />
                <UserCard 
                    userName="Bob Anderson" 
                    userEmail="bob.anderson@gmail.com"
                    userStreak="10"
                />
                <UserCard 
                    userName="Bob Anderson" 
                    userEmail="bob.anderson@gmail.com"
                    userStreak="10"
                />
                
            </div>
            <footer className= {styles2.footerButtons}>
                <div className={styles2.buttons}>
                    <button className={styles.button01}>Change Password</button>
                    <button className={styles.button01}>Change Abbonnement</button>
                    <button className={styles.button01}>Delete Account</button>
                </div>
            </footer>
            
        </div>
        
        </>
        
    );
}
export default AccountSettingsPage;