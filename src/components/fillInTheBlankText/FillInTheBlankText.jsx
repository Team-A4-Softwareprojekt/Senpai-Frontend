import React, { useState } from 'react';

// FillInTheBlankText component
function FillInTheBlankText({ text, blankIndices }) {
  const [inputs, setInputs] = useState(Array(blankIndices.length).fill(''));
  const [words, setWords] = useState(text.split(' '));
  const [show, setShow] = useState(Array(blankIndices.length).fill(false));
  const [correct, setCorrect] = useState(Array(blankIndices.length).fill(false));
  const [incorrect, setIncorrect] = useState(Array(blankIndices.length).fill(false));

  const handleChange = (e, idx) => {
    const newInputs = [...inputs];
    newInputs[idx] = e.target.value;
    setInputs(newInputs);
  };

  const handleCheck = (idx) => {
    const newShow = [...show];
    const newCorrect = [...correct];
    const newIncorrect = [...incorrect];

    if (inputs[idx] === words[blankIndices[idx]]) {
      newShow[idx] = true;
      newCorrect[idx] = true;
      newIncorrect[idx] = false;
    } else {
      newShow[idx] = true;
      newCorrect[idx] = false;
      newIncorrect[idx] = true;
    }

    setShow(newShow);
    setCorrect(newCorrect);
    setIncorrect(newIncorrect);
  };

  return (
    <div>
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
                    backgroundColor: show[blankIdx] && correct[blankIdx]
                      ? 'lightgreen'
                      : show[blankIdx] && incorrect[blankIdx]
                        ? 'lightcoral'
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
      {blankIndices.map((_, idx) => (
        <div key={idx}>
          <button onClick={() => handleCheck(idx)}>Check {idx + 1}</button>
        </div>
      ))}
    </div>
  );
}

export default FillInTheBlankText;
