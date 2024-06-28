import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../animations/LoserAnimation.json';
import styles from './PopUpGameLoser.module.css';
import ConfirmButton from '../../buttons/confirmButton/ConfirmButton';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket.js';
import ScoresFinal from '../../components/scoresFinal/ScoresFinal';

const PopUpGameLoser = ({ loser, isVisible, ownPoints, opponentPoints }) => {
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
          style={{ height: '350px', width: '350px' }}
          className={styles.playerWithBorder}
        />
        <ScoresFinal ownPoints={ownPoints} opponentPoints={opponentPoints} />
        <div className={styles.message}>
          Sorry <span className={styles.name}>{loser}</span>, better luck next time!
        </div>
        <ConfirmButton buttonText="OK" handleSubmit={handleLoserConfirm} />
      </div>
    </>
  );
};

export default PopUpGameLoser;
