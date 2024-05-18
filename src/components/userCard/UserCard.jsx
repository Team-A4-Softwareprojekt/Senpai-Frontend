import styles from '../../pages/General.module.css';
import styles2 from './UserCard.module.css';

function UserCard({ userName, userEmail, userStreak }) {
  return (
    <div className= {styles2.userCardDiv}>
      <h1 className = {styles2.userName}>{userName}</h1>
      <p className= {styles2.streak}>Streak: {userStreak}</p>
    </div>
  );
}  
export default UserCard;