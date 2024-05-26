import React, { useState } from 'react';
import styles from './MultipleChoicePage.module.css';

const MultipleChoicePage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    alert(`You selected: ${selectedAnswer}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.questionBox}>
        <div className={styles.questionContent}>
          Hier steht die Fragestellung und ggfs. ein Bild mit Code zum Zeigen
        </div>
      </div>
      <form className={styles.form}>
        <label className={styles.answerOption}>
          <input 
            type="radio" 
            value="Antwort 1" 
            checked={selectedAnswer === 'Antwort 1'} 
            onChange={handleAnswerChange} 
          />
          Antwort 1
        </label>
        <label className={styles.answerOption}>
          <input 
            type="radio" 
            value="Antwort 2" 
            checked={selectedAnswer === 'Antwort 2'} 
            onChange={handleAnswerChange} 
          />
          Antwort 2
        </label>
        <label className={styles.answerOption}>
          <input 
            type="radio" 
            value="Antwort 3" 
            checked={selectedAnswer === 'Antwort 3'} 
            onChange={handleAnswerChange} 
          />
          Antwort 3
        </label>
        <label className={styles.answerOption}>
          <input 
            type="radio" 
            value="Antwort 4" 
            checked={selectedAnswer === 'Antwort 4'} 
            onChange={handleAnswerChange} 
          />
          Antwort 4
        </label>
        <button type="button" onClick={handleSubmit} className={styles.submitButton}>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default MultipleChoicePage;
