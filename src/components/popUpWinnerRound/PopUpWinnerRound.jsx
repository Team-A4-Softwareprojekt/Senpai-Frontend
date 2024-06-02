import React from 'react';
import styles from './PopUpWinnerRound.module.css';

const PopUpWinnerRound = ({ winner, isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <>
    <div className={styles.overlay} />
    <div className={styles.popup}>
      <p>{winner} has won this round!</p>
      <p>The correct answer was: </p>
    </div>
    </>
  );
};

export default PopUpWinnerRound;
