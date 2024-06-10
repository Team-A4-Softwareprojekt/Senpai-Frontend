import React, { useState } from 'react';
import styles from '../../pages/General.module.css';
import styles2 from './FillInTheBlankText.module.css';
import Modal from '../modal/Modal.jsx';

function FillInTheBlankText({ text, blankIndices }) {
  const [inputs, setInputs] = useState(Array(blankIndices.length).fill(''));
  const [words, setWords] = useState(text.split(' '));
  const [show, setShow] = useState(false);
  const [results, setResults] = useState(Array(blankIndices.length).fill(false));
  const [firstAttempt, setFirstAttempt] = useState(true);
  const [isWinner, setIsWinner] = useState(false);
  const [helpUsed, setHelpUsed] = useState(false);

  const handleChange = (e, idx) => {
    const newInputs = [...inputs];
    newInputs[idx] = e.target.value;
    setInputs(newInputs);
  };

  const handleCheck = () => {
    const newResults = blankIndices.map((index, idx) => inputs[idx] === words[index]);
    setResults(newResults);
    setShow(true);

    if (firstAttempt) {
      const allCorrect = newResults.every(result => result);
      if (allCorrect) {
        setIsWinner(true);
        window.alert('Congratulations! You have answered all correctly on your first attempt!');
        // Add any additional logic for winning, such as notifying the server or updating the UI
      } else {
        window.alert('Not all answers are correct. Please try again.');
      }
      setFirstAttempt(false);
    } else {
      window.alert('Check your answers and try again.');
    }
  };

  const handleHelp = () => {
    setHelpUsed(!helpUsed);
  };

  return (
    <div className={styles2.FillInTheBlankTextDiv}>
      <p>
        {words.map((word, index) => {
          if (blankIndices.includes(index)) {
            const blankIdx = blankIndices.indexOf(index);
            return (
              <span key={index}>
                <input
                  type="text"
                  value={inputs[blankIdx]}
                  onChange={(e) => handleChange(e, blankIdx)}
                  placeholder={helpUsed ? words[index] : ''}
                  style={{
                    backgroundColor: show
                      ? results[blankIdx]
                        ? 'lightgreen'
                        : 'lightcoral'
                      : 'transparent',
                    color: 'white',
                  }}
                />{' '}
              </span>
            );
          } else {
            return <span key={index}>{word} </span>;
          }
        })}
      </p>
      <div className={styles2.buttonDiv}>
        <button onClick={handleCheck} className={styles.button01}>
          Check
        </button>
        <button onClick={handleHelp} className={styles.button01}>
          Help
        </button>
        <div className={styles2.modal}>
          <Modal
            header='Fill In The Blank Text'
            text='Please fill in the blanks with the correct words. 
            Once you have filled in all the blanks, click the Check button to see if your answers are correct. 
            Correct answers will be highlighted in green, while incorrect answers will be highlighted in red.
            If you need help, click the Help button to reveal the correct answers. Good luck!'
          />
        </div>
      </div>
    </div>
  );
}

export default FillInTheBlankText;
