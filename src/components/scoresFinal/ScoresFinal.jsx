import React from 'react';
import styles from './ScoresFinal.module.css';

const ScoresFinal = ({ ownPoints, opponentPoints }) => {
  return (
    <div className={styles.scores}>
      <div className={styles.finalScore}>Final Score</div>
      <div className={styles.points}>
        <span className={styles.ownPointsValue}>{ownPoints}</span>
        <div className={styles.colon}>&nbsp;:&nbsp;</div>
        <span className={styles.opponentPointsValue}>{opponentPoints}</span>
      </div>
    </div>
  );
};

export default ScoresFinal;
