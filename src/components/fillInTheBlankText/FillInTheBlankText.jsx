import React, {useContext, useState} from 'react';
import styles from './FillInTheBlankText.module.css';
import {PlayerContext} from '../../context/playerContext';
import {URL} from "../../../url.js";
import { useNavigate } from 'react-router-dom';

function FillInTheBlankText({ text, blankIndices, allowHelp }) {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState(Array(blankIndices.length).fill(''));
  const [words, setWords] = useState(text.split(' '));

  // Set initial state for modal
  const [show, setShow] = useState(false);
  // Set initial state for results
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
        window.alert('Glückwunsch! Du hast alle Wörter im ersten Versuch gefunden!');
        // Add any additional logic for winning, such as notifying the server or updating the UI

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
                navigate("/select/code");
                setPlayerData({...playerData, streaktoday: true});
              }
            })

      } else {
        window.alert('Nicht alle eingegebenen Wörter sind korrekt. Bitte versuche es noch einmal.');
      }
      setFirstAttempt(false);
    } else {
      window.alert('Überprüfe deine Antworten und versuche es noch einmal.');
    }
  };

  const handleHelp = () => {
    setHelpUsed(!helpUsed);

    const today = new Date();
    const missedStreak = new Date(playerData.missedstreak);

    if(missedStreak !== today){
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
