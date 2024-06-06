import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../animations/TieAnimation.json';
import styles from './PopUpTie.module.css';
import ConfirmButton from '../confirmButton/ConfirmButton.jsx';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket.js';

const PopUpTie = ({ winner, isVisible }) => {
  const navigate = useNavigate();

  if (!isVisible) {
    return null;
  }

  const handleTieConfirm = () => {
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
        <p>This match ended in a tie!</p>
        <ConfirmButton buttonText="OK" handleSubmit={handleTieConfirm} />
      </div>
    </>
  );
};

export default PopUpTie;