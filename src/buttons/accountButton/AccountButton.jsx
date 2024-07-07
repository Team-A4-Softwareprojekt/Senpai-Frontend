import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles2 from './AccountButton.module.css';
import accountIcon from '../../assets/accountIcon.png';
import { PlayerContext } from '../../context/playerContext';
import {URL} from '../../../url.js';

/**
 * AccountButton Component
 * 
 * This component renders a button that navigates to the account page.
 * It fetches the player's account data from the server before navigating.
 */
const AccountButton = () => {
    const url = URL + "/loadAccountData";
    const navigate = useNavigate();
    const { playerName, setPlayerData } = useContext(PlayerContext);

    // Handle button click to load player data and navigate to the account page
    const handleClick = () => {
        loadPlayerData().then(() => {
            navigate('/account');
        });
    };

    // Function to fetch player data from the server
    const loadPlayerData = () => {

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ playerName })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response from server:', data);
                setPlayerData(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <div className={styles2.accountButtonContainer}>
            <button className={styles2.accountButton} onClick={handleClick}>
                Account
                <img className={styles2.accountIcon} src={accountIcon} alt="Account Icon" />
            </button>
        </div>
    );
};

export default AccountButton;
