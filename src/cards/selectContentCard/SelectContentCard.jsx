import React from 'react';
import Modal from '../../components/modal/Modal';
import styles from './SelectContentCard.module.css';
import { Link } from 'react-router-dom';

/**
 * SelectContentCard Component
 * 
 * This component is responsible for displaying a selectable content card with a button, image, and a modal for additional information.
 * It takes several props to configure its behavior and content:
 * - `buttonText`: The text to display on the button.
 * - `imageUrl`: The URL of the image to display on the card.
 * - `linkTo`: The URL to navigate to when the button is clicked.
 * - `modalHeader`: The header text for the modal.
 * - `modalText`: The content text for the modal.
 * - `slides`: The slides to display in the modal (if any).
 * - `handleClick`: The function to call when the button is clicked.
 */
function SelectContentCard({ buttonText, imageUrl, linkTo, modalHeader, modalText, slides, handleClick}){
    return(
        <div className={styles.selectCardContainer}>
            <h1 className={styles.buttonText}>{buttonText}</h1>
            <Link to={linkTo}>
                <button className={styles.selectButton} onClick={handleClick}>
                    <img className={styles.selectCardImg} src={imageUrl} alt="Image Description" />
                </button>
            </Link>
            <div className={styles.questionMarkContainer}>
                <Modal header={modalHeader} text={modalText} slides={slides}>
                    <button className={styles.questionMarkButton}>?</button>
                </Modal>
            </div>
        </div>
    );
}

export default SelectContentCard;