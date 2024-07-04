import React, {useContext} from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../animations/WinnerAnimation.json';
import styles from './PopUpGameWinner.module.css';
import ConfirmButton from '../../buttons/confirmButton/ConfirmButton.jsx';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket.js';
import ScoresFinal from '../../components/scoresFinal/ScoresFinal';
import {ScoreContext} from "../../context/scoreContext.jsx";

/**
 * PopUpGameWinner Component
 * 
 * This component renders a popup that displays a winning animation, final scores, and a message for the winner.
 * It also includes a button to confirm and reset the game state.
 * 
 * Props:
 * - `winner`: The name of the winning player.
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 * - `ownPoints`: The points scored by the winning player.
 * - `opponentPoints`: The points scored by the opponent.
 * - `resetRoundCounter`: Function to reset the round counter.
 */
const PopUpGameWinner = ({ winner, isVisible, ownPoints, opponentPoints, resetRoundCounter }) => {
  const navigate = useNavigate();
  const {setOwnPoints, setOpponentPoints} = useContext(ScoreContext);

  // Return null if the popup is not visible
  if (!isVisible) {
    return null;
  }

  // Handle confirmation of winning and reset the game state
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
