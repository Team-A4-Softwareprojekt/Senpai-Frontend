import styles from './Modal.module.css';
import React, { useState } from "react";

/**
 * Modal Component
 * 
 * This component displays a button that, when clicked, opens a modal displaying a header and text.
 * The modal includes an overlay to close it when clicked outside of the content and a close button inside the modal.
 */
function Modal({ header, text }) {

    // State to control the visibility of the modal
    const [modal, setModal] = useState(false);

    // Function to toggle the modal visibility
    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <div>
            <button onClick={toggleModal} className={styles.button}>
                Information
            </button>
            {modal && (
                <div className={styles.modal} >
                    <div onClick={toggleModal} className={styles.overlay}></div>
                    <div className={styles.content}>
                        <h2 className={styles.popupHeader}>{header}</h2>
                        <p className={styles.text}>{text}</p>
                        <div className={styles.buttonContainer}>
                            <button className={styles.closeButton} onClick={toggleModal}>Schließen</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Modal;
