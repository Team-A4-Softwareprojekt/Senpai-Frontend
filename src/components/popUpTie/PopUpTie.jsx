import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../animations/TieAnimation.json';
import styles from './PopUpTie.module.css';
import ConfirmButton from '../confirmButton/ConfirmButton.jsx';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket.js';
import ScoresFinal from '../scoresFinal/ScoresFinal';

const PopUpTie = ({ winner, isVisible, ownPoints, opponentPoints }) => {
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
          style={{ height: '350px', width: '350px' }}
          className={styles.playerWithBorder}
        />
        <ScoresFinal ownPoints={ownPoints} opponentPoints={opponentPoints} />
        <div className={styles.message}>
          This match ended in a tie!
        </div>
        <ConfirmButton buttonText="OK" handleSubmit={handleTieConfirm} />
      </div>
    </>
  );
};

export default PopUpTie;