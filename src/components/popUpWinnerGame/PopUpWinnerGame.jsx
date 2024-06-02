import React from 'react';
import styles from './PopUpWinnerGame.module.css';

const PopUpWinnerGame = ({ winner, isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <>
    <div className={styles.overlay} />
    <div className={styles.popup}>
      <p>Congratulations {winner}, you won this match!</p>
    </div>
    </>
  );
};

export default PopUpWinnerGame;