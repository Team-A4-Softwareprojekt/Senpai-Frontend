import styles from './ModalGameSelection.module.css';
import React, { useState } from "react";
import Slide from '../slide/Slide';

function ModalGameSelection({ header, text, slides }) {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <div>
            <button onClick={toggleModal} className={styles.button}>
                Spielregeln
            </button>
            {modal && (
                <div className={styles.modal}>
                    <div onClick={toggleModal} className={styles.overlay}></div>
                    <div className={styles.content}>
                        <Slide slides={slides} />
                        <div className={styles.buttonContainer}>
                            <button className={styles.button} onClick={toggleModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModalGameSelection;
