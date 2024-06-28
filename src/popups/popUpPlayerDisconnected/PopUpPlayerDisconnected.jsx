// src/popups/popUpPlayerDisconnected/PopUpPlayerDisconnected.jsx

import React from 'react';
import styles from './PopUpPlayerDisconnected.module.css';

const PopUpPlayerDisconnected = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.popup}>
        <p className={styles.p}>Your opponent has disconnected!</p>
        <p className={styles.p}>You win the game by default.</p>
      </div>
    </>
  );
};

export default PopUpPlayerDisconnected;
