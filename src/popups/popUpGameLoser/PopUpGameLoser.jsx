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
      <div className={styles.popup}>
        <Player
          autoplay
          loop
          src={animationData}
          style={{ height: '450px', width: '450px' }}
          className={styles.playerWithBorder}
        />
        <ScoresFinal ownPoints={ownPoints} opponentPoints={opponentPoints} />
        <div className={styles.message}>
          Schade <span className={styles.name}>{loser}</span>, viel Erfolg nächstes Mal!
        </div>
        <ConfirmButton buttonText="OK" handleSubmit={handleLoserConfirm} />
      </div>
    </>
  );
};

export default PopUpGameLoser;