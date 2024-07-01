import React, {useContext} from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../animations/WinnerAnimation.json';
import styles from './PopUpGameWinner.module.css';
import ConfirmButton from '../../buttons/confirmButton/ConfirmButton.jsx';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket.js';
import ScoresFinal from '../../components/scoresFinal/ScoresFinal';
import {ScoreContext} from "../../context/scoreContext.jsx";

const PopUpGameWinner = ({ winner, isVisible, ownPoints, opponentPoints, resetRoundCounter }) => {
  const navigate = useNavigate();
  const {setOwnPoints, setOpponentPoints} = useContext(ScoreContext);

  if (!isVisible) {
    return null;
  }

  const handleWinnerConfirm = () => {
    setOwnPoints(0);
    setOpponentPoints(0);
    socket.emit('CLOSE_LOBBY');
    navigate('/select/code/codeBattle');
    resetRoundCounter();

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
          Glückwunsch <span className={styles.name}>{winner}</span>, du hast das Spiel gewonnen!
        </div>
        <ConfirmButton buttonText="Cool" handleSubmit={handleWinnerConfirm} />
      </div>
     
    </>
  );
};

export default PopUpGameWinner;
