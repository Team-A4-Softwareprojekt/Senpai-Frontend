import React from 'react';
import styles from './PremiumButton.module.css';

const PremiumButton = ({ handleClick }) => {
  return (
    <div className={styles.buyPremiumContainer}>
      <button className={styles.buyPremiumButton} onClick={handleClick}>
        Premium kaufen
      </button>
    </div>
  );
};

export default PremiumButton;