import React, { useState, useEffect } from "react";
import styles from './PopUpNoHearts.module.css';

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
        "Du hast nicht mehr genug Herzen um weiterzuspielen. ",
        "Deine Herzen werden nach 24 Stunden wieder automatisch aufgefüllt. ",
        "Wenn du Premium kaufst, dann sind deine Herzen unbegrenzt und ",
        "du kannst so viel spielen wie du möchtest :-)"
    ].join("");

    return (
        <div>
            <div className={styles.modal}>
                <div onClick={toggleModal} className={styles.overlay}></div>
                    <div className={styles.content}>
                        <div className={styles.header}>{header || "Herzen aufgebraucht"}</div>
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
