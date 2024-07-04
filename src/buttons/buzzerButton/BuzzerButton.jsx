import React from 'react';
import styles from './BuzzerButton.module.css';

/**
 * BuzzerButton Component
 * 
 * This component renders a button that acts as a buzzer in a game.
 * When the button is clicked, it triggers the `toggle` function passed as a prop.
 * The button can also be disabled based on the `disabled` prop.
 * 
 * Props:
 * - `toggle`: A function to call when the button is clicked.
 * - `disabled`: A boolean that determines if the button should be disabled.
 */
const BuzzerButton = ({ toggle, disabled }) => {
  return (
    <button 
      onClick={toggle} 
      disabled={disabled} 
      className={styles.buzzerButton}>
    </button>
  );
};

export default BuzzerButton;