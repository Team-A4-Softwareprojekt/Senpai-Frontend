import React from 'react';
import styles from './ScoresRound.module.css';

/**
 * ScoresRound Component
 * 
 * This component is responsible for displaying the current scores of the player and the opponent.
 * It takes in two props, `ownPoints` and `opponentPoints`, which represent the player's points and the opponent's points respectively.
 */
const ScoresRound = ({ ownPoints, opponentPoints }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleAndScores}>
        <div className={styles.title}>Punktestand</div>
        <div className={styles.scores}>
          <span className={styles.ownPointsValue}>{ownPoints}</span>&nbsp;<strong>:</strong>&nbsp;<span className={styles.opponentPointsValue}>{opponentPoints}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoresRound;
