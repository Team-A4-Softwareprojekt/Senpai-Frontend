import React from 'react';
import styles from './ScoresFinal.module.css';

/**
 * ScoresFinal Component
 * 
 * This component is responsible for displaying the final scores of the player and the opponent.
 * It takes in two props, `ownPoints` and `opponentPoints`, which represent the player's points and the opponent's points respectively.
 */
const ScoresFinal = ({ ownPoints, opponentPoints }) => {
  return (
    <div className={styles.scores}>
      <div className={styles.finalScore}>Endergebnis</div>
      <div className={styles.points}>
        <span className={styles.ownPointsValue}>{ownPoints}</span>
        <div className={styles.colon}>&nbsp;<strong>:</strong>&nbsp;</div>
        <span className={styles.opponentPointsValue}>{opponentPoints}</span>
      </div>
    </div>
  );
};

export default ScoresFinal;
