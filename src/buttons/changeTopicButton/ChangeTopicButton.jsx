import React from 'react';
import styles from './ChangeTopicButton.module.css';

const ChangeTopicButton = ({ handleClick }) => {
  return (
    <div className={styles.changeTopicContainer}>
      <button className={styles.changeTopicButton} onClick={handleClick}>
        Thema wechseln
      </button>
    </div>
  );
};

export default ChangeTopicButton;