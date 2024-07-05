import React, {useContext, useState} from 'react';
import styles from './FillInTheBlankText.module.css';
import {PlayerContext} from '../../context/playerContext';
import {URL} from "../../../url.js";
import { useNavigate } from 'react-router-dom';

/**
 * FillInTheBlankText Component
 * 
 * This component renders a text with fill-in-the-blank inputs for the user to complete.
 * It provides functionalities to check the answers and request help. 
 * 
 * Props:
 * - `text`: The text containing the blanks.
 * - `blankIndices`: An array of indices indicating the positions of the blanks.
 * - `allowHelp`: Boolean to indicate if the help button should be displayed.
 */
function FillInTheBlankText({ text, blankIndices, allowHelp }) {
  const navigate = useNavigate();
  const [actionText, setActionText] = useState('');
  const [inputs, setInputs] = useState(Array(blankIndices.length).fill(''));
  const [words, setWords] = useState(text.split(' '));
  const [show, setShow] = useState(false);
  const [results, setResults] = useState(Array(blankIndices.length).fill(false));
  const [firstAttempt, setFirstAttempt] = useState(true);
  const [isWinner, setIsWinner] = useState(false);
  const [helpUsed, setHelpUsed] = useState(false);
  const {playerName} = useContext(PlayerContext);
  const {playerData, setPlayerData} = useContext(PlayerContext);

  const url = URL + '/streakForToday';
  const url2 = URL + '/setMissedStreak';

  // Function to handle changes in the input fields
  const handleChange = (e, idx) => {
    const newInputs = [...inputs];
    newInputs[idx] = e.target.value;
    setInputs(newInputs);
  };

  // Function to handle checking the answers
  const handleCheck = () => {
    const newResults = blankIndices.map((index, idx) => inputs[idx] === words[index]);
    setResults(newResults);
    setShow(true);

    if (firstAttempt) {
      const allCorrect = newResults.every(result => result);
      if (allCorrect) {
        setIsWinner(true);
        setActionText('Glückwunsch! Du hast alle Wörter im ersten Versuch gefunden!');

        // Notify server of streak success
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ playerName })
        })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              console.log('Response from server:', data.message);
              if (data.success === true) {
                setTimeout(() => {
                  navigate("/select/code");
                  setPlayerData({...playerData, streaktoday: true});
                }, 3000);
              }
            })

      } else {
        // Display a message if not all words are correct
        setActionText('Nicht alle eingegebenen Wörter sind korrekt');
        // Set streaktoday to false and navigate back
        setTimeout(() => {
          navigate("/select/code");
          setPlayerData({...playerData, streaktoday: false});
        }, 3000);
      }
      // Set firstAttempt to false after the first attempt
      setFirstAttempt(false);
    } else {
      // Display a message if the user has already attempted the challenge
      setActionText('Überprüfe deine Antworten und versuche es noch einmal.');
    }
  };

  // Function to handle help button click
  const handleHelp = () => {
    setHelpUsed(!helpUsed);

    const today = new Date();
    const missedStreak = new Date(playerData.missedstreak);
    // Check if the player has already missed a streak today
    if(missedStreak !== today){
      // Notify the server that the player has missed a streak
      fetch(url2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playerName })
      })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Response from server:', data);
            setPlayerData({...playerData, missedstreak: today});
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
    }
  };

  return (
    <div>
      <div className={styles.FillInTheBlankTextDiv}>
        {words.map((word, index) => {
          if (blankIndices.includes(index)) {
            const blankIdx = blankIndices.indexOf(index);
            // Display the input field if the word is a blank
            return (
              <span key={index}>
                <input
                  type="text"
                  value={inputs[blankIdx]}
                  onChange={(e) => handleChange(e, blankIdx)}
                  placeholder={helpUsed ? words[index] : ''}
                  style={{
                    // Adjust border color and increase font size
                    backgroundColor: show
                      ? results[blankIdx]
                        ? 'lightgreen'
                        : 'lightcoral'
                        : 'lightgray',  
                    fontSize: '18px',
                    color: 'black',
                  }}
                />{' '}
              </span>
            );
          } else {
            // Display the word as is if it is not a blank
            return <span key={index}>{word} </span>;
          }
        })}
      </div>
      <hr className={styles.line}/>
      <h3 className={styles.actiontext}>
        {actionText}
      </h3>
      <div className={styles.buttonDiv}>
        <button onClick={handleCheck} className={styles.buttonCheck}>
          Überprüfen
        </button>
        {allowHelp && (
          <button onClick={handleHelp} className={styles.buttonHelp}>
            Hilfe
          </button>
        )}
      </div>
    </div>
  );
}

export default FillInTheBlankText;
