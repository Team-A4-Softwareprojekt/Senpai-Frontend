import React from 'react';
import styles from './ConfirmButton.module.css';

const ConfirmButton = ({ isButtonDisabled, handleSubmit }) => {
    return (
        <button 
            type="button" 
            disabled={isButtonDisabled} 
            onClick={handleSubmit}
            className={styles.submitButton}
        >
            Confirm
        </button>
    );
};

export default ConfirmButton;
