import React from 'react';
import styles from './BuzzerButton.module.css';

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