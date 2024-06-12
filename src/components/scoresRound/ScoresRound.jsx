import React from 'react';
import styles from './ScoresRound.module.css';

const ScoresRound = ({ ownPoints, opponentPoints }) => {
  return (
    <div className={styles.scores}>
      <div>Your Points: <span className={styles.ownPointsValue}>{ownPoints}</span></div>
      <div>Opponent's Points: <span className={styles.opponentPointsValue}>{opponentPoints}</span></div>
    </div>
  );
};

export default ScoresRound;
