import styles from '../../pages/General.module.css';
import styles2 from './ExerciseCard.module.css';

function ExerciseCard({ exerciseName, exerciseStatus }) {

  const statusClass = exerciseStatus === 'Finished' ? styles2.finished : styles2.unfinished;

  return (
    <div className= {styles2.userCardDiv}>
      <h1 className = {styles2.userName}>{exerciseName}</h1>
      <p className={styles2.streak}>
                Status: <span className={statusClass}>{exerciseStatus}</span>
            </p>
    </div>
  );
}  
export default ExerciseCard;