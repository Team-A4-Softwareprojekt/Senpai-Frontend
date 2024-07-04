import styles from './UserCard.module.css';

/**
 * UserCard Component
 * 
 * This component is responsible for displaying a user's name and streak.
 * It takes in two props, `userName` and `userStreak`, which represent the user's name and current streak respectively.
 */
function UserCard({ userName, userStreak }) {
  return (
    <div className= {styles.userCardDiv}>
      <h1 className = {styles.userName}>{userName}</h1>
      <p className= {styles.streak}>Streak: {userStreak}</p>
    </div>
  );
}  
export default UserCard;