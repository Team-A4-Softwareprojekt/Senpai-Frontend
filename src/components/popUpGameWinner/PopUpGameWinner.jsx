import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../animations/WinnerAnimation.json';
import styles from './PopUpGameWinner.module.css';
import ConfirmButton from '../confirmButton/ConfirmButton.jsx';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket.js';

const PopUpGameWinner = ({ winner, isVisible }) => {
  const navigate = useNavigate();

  if (!isVisible) {
    return null;
  }

  const handleWinnerConfirm = () => {
    socket.emit('CLOSE_LOBBY');
    navigate('/select/code/codeBattle');
  };

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.popup}>
        <Player
          autoplay
          loop
          src={animationData}
          style={{ height: '300px', width: '300px' }}
        />
        <p>Congratulations {winner}, you won this match!</p>
        <ConfirmButton buttonText="Nice!" handleSubmit={handleWinnerConfirm} />
      </div>
    </>
  );
};

export default PopUpGameWinner;
