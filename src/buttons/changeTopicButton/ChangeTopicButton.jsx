import React from 'react';
import styles from './ChangeTopicButton.module.css';

/**
 * ChangeTopicButton Component
 * 
 * This component renders a button that allows the user to change the topic.
 * When the button is clicked, it triggers the `handleClick` function passed as a prop.
 * 
 * Props:
 * - `handleClick`: A function to call when the button is clicked.
 */
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