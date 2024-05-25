import React, { useState } from 'react';
import styles from '../../pages/General.module.css';
import styles2 from './FillInTheBlankText.module.css';
import Modal from '../modal/Modal.jsx';

// FillInTheBlankText component
function FillInTheBlankText({ text, blankIndices }) {
  const [inputs, setInputs] = useState(Array(blankIndices.length).fill(''));
  const [words, setWords] = useState(text.split(' '));
  const [show, setShow] = useState(false);
  const [results, setResults] = useState(Array(blankIndices.length).fill(false));

  // Handle input change
  const handleChange = (e, idx) => {
    const newInputs = [...inputs];
    newInputs[idx] = e.target.value;
    setInputs(newInputs);
  };

  // Handle check button click
  const handleCheck = () => {
    const newResults = blankIndices.map((index, idx) => inputs[idx] === words[index]);
    setShow(true);
    setResults(newResults);
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
                  style={{
                    backgroundColor: show
                      ? results[blankIdx]
                        ? 'lightgreen'
                        : 'lightcoral'
                      : 'transparent',
                    color: 'white',  // Set the text color to white
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
        <div className = {styles2.modal}>
          <Modal header = 'Fill In The Blank Text' 
            text = 'Please fill in the blanks with the correct words. Once you have filled in all the blanks, click the Check button to see if your answers are correct. Correct answers will be highlighted in green, while incorrect answers will be highlighted in red.' > </Modal>
        </div>
        
      </div>
    </div>
  );
}

export default FillInTheBlankText;
