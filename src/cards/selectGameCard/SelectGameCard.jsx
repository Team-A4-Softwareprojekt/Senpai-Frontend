import React from 'react';
import ModalGameSelection from '../../components/modalGameSelection/ModalGameSelection';
import styles from './SelectGameCard.module.css';
import { Link } from 'react-router-dom';

function SelectGameCard({ buttonText, imageUrl, linkTo, header, text, slides, handleClick, handleNoHeartsClick, lives, selectedOption }) {
    const onButtonClick = () => {
        if (lives === 0) {
            handleNoHeartsClick();
        } else {
            handleClick();
        }
    };

    return (
        <div className={styles.selectCardContainer}>
            <h1 className={styles.buttonText}>{buttonText}</h1>
            <Link to={linkTo}>
                <button className={styles.selectButton} onClick={onButtonClick}>
                    <img className={styles.selectCardImg} src={imageUrl} alt="Image Description" />
                </button>
            </Link>
            <div className={styles.verticalContainer}>
                <div className={styles.dropdownContainer}>
                    <select defaultValue={selectedOption}>
                        <option value="Java" disabled={selectedOption !== 'Java'}>Java</option>
                        <option value="JavaScript" disabled={selectedOption !== 'JavaScript'}>JavaScript</option>
                        <option value="Python" disabled={selectedOption !== 'Python'}>Python</option>
                        <option value="C" disabled={selectedOption !== 'C'}>C</option>
                        <option value="C++" disabled={selectedOption !== 'C++'}>C++</option>
                    </select>
                </div>
                <div className={styles.questionMarkContainer}>
                    <ModalGameSelection header={header} text={text} slides={slides} />
                </div>
            </div>
        </div>
    );
}

export default SelectGameCard;
