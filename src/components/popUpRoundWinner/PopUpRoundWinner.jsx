import React from 'react';
import styles from './PopUpRoundWinner.module.css';

const PopUpRoundWinner = ({ winner, isVisible, solution }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <>
    <div className={styles.overlay} />
    <div className={styles.popup}>
      <p>{winner} has won this round!</p>
      <p>The correct answer was: {solution} </p>
    </div>
    </>
  );
};

export default PopUpRoundWinner;
