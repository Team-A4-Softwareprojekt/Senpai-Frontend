import styles from './ExerciseCard.module.css';

/**
 * ExerciseCard Component
 * 
 * This component is responsible for displaying the name and status of an exercise.
 * It takes two props:
 * - `exerciseName`: The name of the exercise.
 * - `exerciseStatus`: The current status of the exercise (e.g., "Abgeschlossen", "In Bearbeitung").
 */
function ExerciseCard({ exerciseName, exerciseStatus }) {
    let statusClass;

    // Determine the CSS class to apply based on the exercise status
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
