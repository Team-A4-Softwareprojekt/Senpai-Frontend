import React, { useState, useEffect } from "react";
import styles from './PopUpDailyChallengeCompleted.module.css';

const PopUpNoHearts = ({ isVisible, header, text, closePopup }) => {
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setModal(true);
        }
    }, [isVisible]);

    if (!modal) return null;

    const toggleModal = () => {
        setModal(false);
        closePopup();
    }

    const defaultText = [
        "Du hast heute bereits die Daily Challenge abgeschlossen! ",
        "Komme morgen wieder um dein Wissen erneut zu testen :-)",
    ].join("");

    return (
        <div>
            <div className={styles.modal}>
                <div onClick={toggleModal} className={styles.overlay}></div>
                    <div className={styles.content}>
                        <div className={styles.header}>{header || "Daily Challenge abgeschlossen"}</div>
                        <div className={styles.text}>{text || defaultText}</div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={toggleModal}>Schließen</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopUpNoHearts;
