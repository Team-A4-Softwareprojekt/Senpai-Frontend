import React, { useEffect, useState } from 'react';
import styles from './MultipleChoicePage.module.css';
import {socket, startBuzzerQueue, leaveBuzzerQueue, disconnectSocket, requestQuestion} from '../../socket.js';
import BuzzerButton from '../../components/buzzerButton/BuzzerButton.jsx';


const MultipleChoicePage = () => {
  const [question, setQuestion] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isBuzzerDisabled, setIsBuzzerDisabled] = useState(false);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };
  const handleSubmit = () => {
    alert(`You selected: ${selectedAnswer}`);
    socket.emit('COMPARE_ANSWER', selectedAnswer);

  };

  const toggleButton = () => {
    setIsButtonDisabled(!isButtonDisabled);	
    socket.emit('PLAYER_BUZZERED');
    console.log('Button enabled');
  }

  

  useEffect(() => { 
  
    const handleQuestion = (task) => {
      setQuestion(task);
      console.log('Received question:', task);

    };

    const handleBuzzer = () => {
      console.log('Buzzer disabled for me');
      setIsBuzzerDisabled(true);
      // Implement logic to disable the buzzer button on the UI

    };
    // Handle disabling the buzzer for the other player
    socket.on('DISABLE_BUZZER', handleBuzzer);


    socket.on('SHOW_QUESTION_MULTIPLE_CHOICE', handleQuestion);

    return () => {
      socket.off('SHOW_QUESTION_MULTIPLE_CHOICE', handleQuestion);
      socket.off('DISABLE_BUZZER', handleBuzzer);
    };

  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.questionBox}>
        <div className={styles.questionContent}>
          <p> {question.question} </p>
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
         {question.aanswer}
        </label>
        <label className={styles.answerOption}>
          <input 
            type="radio" 
            value="Antwort 2" 
            checked={selectedAnswer === 'Antwort 2'} 
            onChange={handleAnswerChange} 
          />
          {question.banswer}
        </label>
        <label className={styles.answerOption}>
          <input 
            type="radio" 
            value="Antwort 3" 
            checked={selectedAnswer === 'Antwort 3'} 
            onChange={handleAnswerChange} 
          />
          {question.canswer}
        </label>
        <label className={styles.answerOption}>
          <input 
            type="radio" 
            value="Antwort 4" 
            checked={selectedAnswer === 'Antwort 4'} 
            onChange={handleAnswerChange} 
          />
          {question.danswer}
        </label>
        <button type="button" disabled={isButtonDisabled} onClick={handleSubmit} className={styles.submitButton}>
          Confirm
        </button>
      </form>

      <BuzzerButton toggle = {toggleButton} disabled={isBuzzerDisabled}/>
    </div>
  );
};

export default MultipleChoicePage;
