import React from 'react';
import ModalGameSelection from '../modalGameSelection/ModalGameSelection';
import styles from './SelectGameCard.module.css';
import { Link } from 'react-router-dom';

function SelectGameCard({ buttonText, imageUrl, linkTo, header, text, slides, handleClick }) {
    return (
        <div className={styles.selectCardContainer}>
            <Link to={linkTo}>
                <button className={styles.selectButton} onClick={handleClick}>
                    <img className={styles.selectCardImg} src={imageUrl} alt="Image Description" />
                    <h1>{buttonText}</h1>
                </button>
            </Link>
            <div className={styles.questionMarkContainer}>
                <ModalGameSelection header={header} text={text} slides={slides}>
                    <button className={styles.questionMarkButton}>?</button>
                </ModalGameSelection>
            </div>
        </div>
    );
}

export default SelectGameCard;
