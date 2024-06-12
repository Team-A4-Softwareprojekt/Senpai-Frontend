import styles from './UserCard.module.css';

function UserCard({ userName, userStreak }) {
  return (
    <div className= {styles.userCardDiv}>
      <h1 className = {styles.userName}>{userName}</h1>
      <p className= {styles.streak}>Streak: {userStreak}</p>
    </div>
  );
}  
export default UserCard;