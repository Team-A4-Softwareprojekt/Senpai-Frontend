import styles from '../../pages/General.module.css';
import styles2 from './ExerciseCard.module.css';

function ExerciseCard({ exerciseName, exerciseStatus, handleClick }) {

  const statusClass = exerciseStatus === 'Finished' ? styles2.finished : styles2.unfinished;

  return (
    <div className= {styles2.exerciseCardDiv} onClick={handleClick}>
      <h1 className = {styles2.exerciseName}>{exerciseName}</h1>
      <p className={styles2.status}>
          Status: <span className={statusClass}>{exerciseStatus}</span>
      </p>
    </div>
  );
}  
export default ExerciseCard;