import React, { useState } from 'react';
import styles from './MultipleChoicePage.module.css';
import {socket, startBuzzerQueue, leaveBuzzerQueue, disconnectSocket, requestQuestion} from '../../socket.js';

var question_global;
var aanswer_global;
var banswer_global;
var canswer_global;
var danswer_global;

const MultipleChoicePage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    alert(`You selected: ${selectedAnswer}`);
  };

  socket.on('SHOW_QUESTION_MULTIPLE_CHOICE', (question) => {
    console.log('Received question:', question);
    const {questionLocal, aanswer, banswer, canswer, danswer} = question;
    question_global = questionLocal;
    aanswer_global = aanswer;
    banswer_global = banswer;
    canswer_global = canswer;
    danswer_global = danswer;
  }); 
  

  return (
    <div className={styles.container}>
      <div className={styles.questionBox}>
        <div className={styles.questionContent}>
          {question_global};
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
          {aanswer_global};
        </label>
        <label className={styles.answerOption}>
          <input 
            type="radio" 
            value="Antwort 2" 
            checked={selectedAnswer === 'Antwort 2'} 
            onChange={handleAnswerChange} 
          />
          {banswer_global};
        </label>
        <label className={styles.answerOption}>
          <input 
            type="radio" 
            value="Antwort 3" 
            checked={selectedAnswer === 'Antwort 3'} 
            onChange={handleAnswerChange} 
          />
          {canswer_global};
        </label>
        <label className={styles.answerOption}>
          <input 
            type="radio" 
            value="Antwort 4" 
            checked={selectedAnswer === 'Antwort 4'} 
            onChange={handleAnswerChange} 
          />
          {danswer_global};
        </label>
        <button type="button" onClick={handleSubmit} className={styles.submitButton}>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default MultipleChoicePage;
