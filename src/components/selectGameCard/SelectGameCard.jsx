import React from 'react';
import ModalGameSelection from '../modalGameSelection/ModalGameSelection';
import styles from './SelectGameCard.module.css';
import { Link } from 'react-router-dom';

function SelectGameCard({ buttonText, imageUrl, linkTo, header, text, slides, handleClick }) {
    return (
        <div className={styles.selectCardContainer}>
            <h1 className={styles.buttonText}>{buttonText}</h1>
            <Link to={linkTo}>
                <button className={styles.selectButton} onClick={handleClick}>
                    <div className={styles.imageContainer}>
                        <img className={styles.selectCardImg} src={imageUrl} alt="Image Description" />
                    </div>
                </button>
            </Link>
            <div className={styles.questionMarkContainer}>
                <ModalGameSelection header={header} text={text} slides={slides}/>
            </div>
        </div>
    );
}

export default SelectGameCard;
