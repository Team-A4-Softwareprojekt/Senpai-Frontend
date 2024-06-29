import React from 'react';
import styles from './ScoresRound.module.css';

const ScoresRound = ({ ownPoints, opponentPoints }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Punktestand</div>
      <div className={styles.scores}>
        <span className={styles.ownPointsValue}>{ownPoints}</span>&nbsp;:&nbsp;<span className={styles.opponentPointsValue}>{opponentPoints}</span>
      </div>
    </div>
  );
};

export default ScoresRound;
