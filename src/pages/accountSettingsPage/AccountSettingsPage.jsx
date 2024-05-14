import styles from '../General.module.css';
import styles2 from './AccountSettingsPage.module.css';

function AccountSettingsPage() {
    return (
        <>
        <div className={styles2.userInfo}>
            <p>Name: Max Mustermann</p>
            <p>Mail: max.mustermann@gmail.com</p>
            <p>Streak: 20 </p>
            <button className={styles.button01}>Courses</button>
            <button className={styles.button01}>Corrected Exercises</button>
        
            <div className={styles2.friendList}>
            <input type="text" placeholder="Search friends" />
                <div className={styles2.friend}>
                    <p>Username: John Doe</p>
                    <p>Streak: 10</p>
                </div>
                <div className={styles2.friend}>
                    <p>Username: Jane Smith</p>
                    <p>Streak: 5</p>
                </div>
                <div className={styles2.friend}>
                    <p>Username: Alex Johnson</p>
                    <p>Streak: 15</p>
                </div>
            </div>
            <footer>
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