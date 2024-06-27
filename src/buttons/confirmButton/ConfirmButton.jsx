import React from 'react';
import styles from './ConfirmButton.module.css';

const ConfirmButton = ({ isButtonDisabled, handleSubmit, buttonText }) => {
    return (
        <button 
            type="button" 
            disabled={isButtonDisabled} 
            onClick={handleSubmit}
            className={styles.submitButton}
        >
            {buttonText || 'Confirm'}
        </button>
    );
};

export default ConfirmButton;
