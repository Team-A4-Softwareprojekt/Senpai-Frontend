import React, { useState } from 'react';

// FillInTheBlankText component
function FillInTheBlankText({ text }) {
  // State to store the input value and whether it is correct
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  // Update the input value and check if it is correct
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsCorrect(e.target.value === text);
  };
  
  // Replace all occurrences of '__' with '________'
  return (
    <div>
      <p>{text.replace(/__+/g, '________')}</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        style={{ border: isCorrect ? '1px solid green' : '1px solid red' }}
      />
    </div>
  );
}   
export default FillInTheBlankText;  