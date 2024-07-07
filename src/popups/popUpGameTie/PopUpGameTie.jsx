import React, {useContext} from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../animations/TieAnimation.json';
import styles from './PopUpGameTie.module.css';
import ConfirmButton from '../../buttons/confirmButton/ConfirmButton.jsx';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket.js';
import ScoresFinal from '../../components/scoresFinal/ScoresFinal.jsx';
import {ScoreContext} from "../../context/scoreContext.jsx";

/**
 * PopUpTie Component
 * 
 * This component renders a popup that displays a tie animation, final scores, and a message for the tie result.
 * It also includes a button to confirm and reset the game state.
 * 
 * Props:
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 * - `ownPoints`: The points scored by the player.
 * - `opponentPoints`: The points scored by the opponent.
 * - `resetRoundCounter`: Function to reset the round counter.
 */
const PopUpTie = ({ winner, isVisible, ownPoints, opponentPoints, resetRoundCounter }) => {
  const navigate = useNavigate();
  const {setOwnPoints, setOpponentPoints} = useContext(ScoreContext);

  // Return null if the popup is not visible
  if (!isVisible) {
    return null;
  }

  // Handle confirmation of the tie and reset the game state
  const handleTieConfirm = () => {
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
          Dieses Spiel endet in einem Unentschieden!
        </div>
        <ConfirmButton buttonText="OK" handleSubmit={handleTieConfirm} />
      </div>
    </>
  );
};

export default PopUpTie;