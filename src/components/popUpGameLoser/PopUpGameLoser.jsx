import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../animations/LoserAnimation.json';
import styles from './PopUpGameLoser.module.css';
import ConfirmButton from '../confirmButton/ConfirmButton';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket.js';

const PopUpGameLoser = ({ loser, isVisible }) => {
  const navigate = useNavigate();

  if (!isVisible) {
    return null;
  }

  const handleLoserConfirm = () => {
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
        <p>Sorry {loser}, better luck next time!</p>
        <ConfirmButton buttonText="OK" handleSubmit={handleLoserConfirm} />
      </div>
    </>
  );
};

export default PopUpGameLoser;
