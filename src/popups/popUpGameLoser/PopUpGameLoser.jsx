import React, {useContext} from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../animations/LoserAnimation.json';
import styles from './PopUpGameLoser.module.css';
import ConfirmButton from '../../buttons/confirmButton/ConfirmButton';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket.js';
import ScoresFinal from '../../components/scoresFinal/ScoresFinal';
import {ScoreContext} from "../../context/scoreContext.jsx";

/**
 * PopUpGameLoser Component
 * 
 * This component renders a popup that displays a losing animation, final scores, and a message to the loser.
 * It also includes a button to confirm and reset the game state.
 * 
 * Props:
 * - `loser`: The name of the losing player.
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 * - `ownPoints`: The points scored by the losing player.
 * - `opponentPoints`: The points scored by the opponent.
 * - `resetRoundCounter`: Function to reset the round counter.
 */
const PopUpGameLoser = ({ loser, isVisible, ownPoints, opponentPoints, resetRoundCounter }) => {
  const navigate = useNavigate();
  const {setOwnPoints, setOpponentPoints} = useContext(ScoreContext);

  // Return null if the popup is not visible
  if (!isVisible) {
    return null;
  }

  // Handle confirmation of losing and reset the game state
  const handleLoserConfirm = () => {
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
          Schade <span className={styles.name}>{loser}</span>, viel Erfolg nächstes Mal!
        </div>
        <ConfirmButton buttonText="OK" handleSubmit={handleLoserConfirm} />
      </div>
    </>
  );
};

export default PopUpGameLoser;
