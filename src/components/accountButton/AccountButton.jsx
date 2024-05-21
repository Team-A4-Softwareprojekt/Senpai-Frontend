import React from 'react';
import styles2 from './AccountButton.module.css'; // Importiere die CSS-Datei
import accountIcon from '../../assets/accountIcon.png';

const AccountButton = ({ handleClick }) => {
  return (
    <div className={styles2.accountButtonContainer}>
      <button className={styles2.accountButton} onClick={handleClick}>
        Account
        <img className={styles2.accountIcon} src={accountIcon} alt="Account Icon" />
      </button>
    </div>
  );
};

export default AccountButton;