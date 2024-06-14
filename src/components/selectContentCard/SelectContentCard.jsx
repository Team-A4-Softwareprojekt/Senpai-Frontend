import React from 'react';
import Modal from '../modal/Modal';
import styles from './SelectContentCard.module.css';
import { Link } from 'react-router-dom';

/*
 This is the selectcard component. The whole component is a link to another page
 The parameters are set when the component is initialized
*/
function SelectCard({ buttonText, imageUrl, linkTo, modalHeader, modalText, slides, handleClick}){
    return(
        <div className={styles.selectCardContainer}>
            <Link to={linkTo}>
                <button className={styles.selectButton} onClick={handleClick}>
                    <img className={styles.selectCardImg} src={imageUrl} alt="Image Description" />
                    <h1> {buttonText} </h1>
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

export default SelectCard;