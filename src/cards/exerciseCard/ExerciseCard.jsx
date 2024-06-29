import styles from './ExerciseCard.module.css';

function ExerciseCard({ exerciseName, exerciseStatus }) {
    let statusClass;

    if (exerciseStatus === 'Abgeschlossen') {
      statusClass = styles.finished;
    } else if (exerciseStatus === 'In Bearbeitung') {
      statusClass = styles.pending;
    } else {
      statusClass = styles.unfinished;
    }

    return (
      <div className={styles.exerciseCardDiv}>
        <h1 className={styles.exerciseName}>{exerciseName}</h1>
        <p className={styles.status}>
          Status: <span className={statusClass}><strong>{exerciseStatus}</strong></span>
        </p>
      </div>
    );
}

export default ExerciseCard;
