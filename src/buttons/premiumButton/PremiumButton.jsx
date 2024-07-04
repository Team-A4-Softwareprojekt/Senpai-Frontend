import React from 'react';
import styles from './PremiumButton.module.css';

/**
 * PremiumButton Component
 * 
 * This component renders a button for purchasing a premium subscription.
 * It takes a single prop:
 * - `handleClick`: A function to call when the button is clicked.
 */
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