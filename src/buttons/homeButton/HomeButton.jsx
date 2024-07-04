import React from 'react';
import styles from './HomeButton.module.css';
import homeIcon from '../../assets/homeIcon.png';

/**
 * HomeButton Component
 * 
 * This component renders a button with a home icon.
 * When the button is clicked, it triggers the `handleClick` function passed as a prop.
 * 
 * Props:
 * - `handleClick`: A function to call when the button is clicked.
 */
const HomeButton = ({ handleClick }) => {
  return (
    <div className={styles.homeButtonContainer}>
      <button className={styles.homeButton} onClick={handleClick}>
        <img className={styles.homeIcon} src={homeIcon} alt="Home Icon" />
      </button>
    </div>
  );
};

export default HomeButton;