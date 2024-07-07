import styles from './ModalGameSelection.module.css';
import React, { useState } from "react";
import Slide from '../slide/Slide';

/**
 * ModalGameSelection Component
 * 
 * This component displays a button that, when clicked, opens a modal displaying game rules.
 * The modal includes a series of slides and a close button.
 */
function ModalGameSelection({ header, text, slides }) {

    // State to control the visibility of the modal
    const [modal, setModal] = useState(false);

    // Function to toggle the modal visibility
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
                            <button className={styles.button} onClick={toggleModal}>Schließen</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModalGameSelection;
