import React, { useState, useContext } from 'react';
import styles from './PopUpPremium.module.css';
import { PlayerContext } from "../../context/playerContext.jsx";
import PopUpPurchaseSuccess from '../popUpPurchaseSuccess/PopUpPurchaseSuccess.jsx';
import PopUpPurchaseFailure from '../popUpPurchaseFailure/PopUpPurchaseFailure.jsx';
import {URL} from "../../../url.js";

const PopUpPremium = ({ closePopUp, isVisible }) => {
    const { playerData, setPlayerData } = useContext(PlayerContext);
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const [isFailureVisible, setIsFailureVisible] = useState(false);
    const url = URL + '/startSubscription'
    const urlCurrency = URL + '/buyCurrency'

    if (!isVisible) return null;

    const handleConfirmPurchase = () => {
        if (playerData.credit >= 5) {
            const today = new Date();
            const subEndDate = new Date(today);
            subEndDate.setDate(today.getDate() + 30);

            let playerName = playerData.playername;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({playerName, subEndDate})
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data.message);
                    if(data.success === true) {
                        setPlayerData({
                            ...playerData,
                            credit: playerData.credit - 5,
                            subscribed: true,
                            lives: 3,
                            subenddate: subEndDate,
                        });
                        setIsSuccessVisible(true);
                        setTimeout(() => {
                            setIsSuccessVisible(false);
                            closePopUp();
                        }, 5000);
                    }

                    //data.message kann als erfolgs meldung im popup verwendet werden 'email updated successfully'
                });



        } else {
            setIsFailureVisible(true);
        }
    };

    const handleAddCredit = (amount) => {

        let playerName = playerData.playername;

        fetch(urlCurrency, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({playerName, amount})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {

                if(data.success === true) {
                    // Update playerData email
                    setPlayerData({
                        ...playerData,
                        credit: playerData.credit + amount,
                    });
                }
                console.log(data.message);
                //data.message kann als erfolgs meldung im popup verwendet werden 'email updated successfully'
            });

        setIsFailureVisible(false);
    };

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.popupContainer}>
                <div className={styles.popupContent}>
                    <h2 className={styles.popupHeader}>Werde Premium-Mitglied!</h2>
                    <div className={styles.popupBody}>
                        <ul className={styles.benefitsList}>
                            <li><strong>Unbegrenzte Herzen:</strong> Nie wieder warten! Erhalte für einen Monat unbeschränkten Zugang zu den Code Battles.</li>
                            <li className={styles.benefitItem}><strong>Kostenloser Testzugang:</strong> Teste unser zukünftiges Feature 'Exercise' drei Monate lang kostenlos!</li>
                        </ul>
                        <div className={styles.costBox}>
                            <div className={styles.costInfo}>
                                <div className={styles.costLabel}>Kosten:</div>
                                <div className={styles.costValue}>5 Euro</div>
                            </div>
                            <div className={styles.costInfo}>
                                <div className={styles.costLabel}>Dein Guthaben:</div>
                                <div className={styles.costValue}>{playerData.credit} Euro</div>
                            </div>
                            <hr className={styles.costDivider} />
                            <div className={styles.costInfo}>
                                <div className={styles.costLabel}>Verbleibendes Guthaben:</div>
                                <div className={styles.costValue}>{playerData.credit - 5} Euro</div>
                            </div>
                            <button className={styles.confirmButton} onClick={handleConfirmPurchase}>Kauf bestätigen</button>
                        </div>
                    </div>
                    <button className={styles.closeButton} onClick={closePopUp}>Schließen</button>
                </div>
            </div>
            <PopUpPurchaseSuccess
                isVisible={isSuccessVisible}
                closePopUp={() => {
                    setIsSuccessVisible(false);
                    closePopUp();
                }}
            />
            <PopUpPurchaseFailure
                isVisible={isFailureVisible}
                closePopUp={() => setIsFailureVisible(false)}
                addCredit={handleAddCredit}
            />
        </>
    );
};

export default PopUpPremium;
