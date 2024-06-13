import React from 'react';
import Modal from '../modal/Modal';
import styles from './SelectGameCard.module.css';

function SelectGameCard({ buttonText, imageUrl, modalHeader, modalText, handleClick, handleNoHeartsClick, lives }) {
    const onButtonClick = () => {
        if (lives === 0) {
            handleNoHeartsClick();
        } else {
            handleClick();
        }
    };

    return (
        <div className={styles.selectCardContainer}>
                <button className={styles.selectButton} onClick={onButtonClick}>
                    <img className={styles.selectCardImg} src={imageUrl} alt="Image Description" />
                    <h1> {buttonText} </h1>
                </button>
            <div className={styles.questionMarkContainer}>
                <Modal header={modalHeader} text={modalText}>
                    <button className={styles.questionMarkButton}>?</button>
                </Modal>
            </div>
        </div>
    );
}

SelectGameCard.defaultProps = {
    buttonText: ' Not Found'
}

export default SelectGameCard;
