import React from 'react';
import styles from './HomeButton.module.css';
import homeIcon from '../../assets/homeIcon.png';

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