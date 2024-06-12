import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../animations/WinnerAnimation.json';
import styles from './PopUpGameWinner.module.css';
import ConfirmButton from '../confirmButton/ConfirmButton.jsx';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket.js';
import ScoresFinal from '../scoresFinal/ScoresFinal';

const PopUpGameWinner = ({ winner, isVisible, ownPoints, opponentPoints }) => {
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
          style={{ height: '350px', width: '350px' }}
          className={styles.playerWithBorder}
        />
        <ScoresFinal ownPoints={ownPoints} opponentPoints={opponentPoints} />
        <div className={styles.message}>
          Congratulations <span className={styles.name}>{winner}</span>, you won this match!
        </div>
        <ConfirmButton buttonText="Nice!" handleSubmit={handleWinnerConfirm} />
      </div>
    </>
  );
};

export default PopUpGameWinner;
