import React from 'react';
import styles from './ConfirmButton.module.css';

/**
 * ConfirmButton Component
 * 
 * This component renders a button that can be used to submit a form or confirm an action.
 * The button can be disabled based on the `isButtonDisabled` prop.
 * 
 * Props:
 * - `isButtonDisabled`: A boolean that determines if the button should be disabled.
 * - `handleSubmit`: A function to call when the button is clicked.
 * - `buttonText`: The text to display on the button (defaults to 'Confirm' if not provided).
 */
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
