import React from 'react';
import styles from './PopUpWinner.module.css';

const PopUpWinner = ({ winner, isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <>
    <div className={styles.overlay} />
    <div className={styles.popup}>
      <p>{winner} has won this round!</p>
    </div>
    </>
  );
};

export default PopUpWinner;
