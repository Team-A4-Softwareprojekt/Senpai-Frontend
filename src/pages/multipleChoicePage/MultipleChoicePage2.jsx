import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { io } from 'socket.io-client';
import styles from './MultipleChoicePage.module.css';

const MultipleChoicePage = () => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000'); // replace with your server URL
    setSocket(newSocket);

    newSocket.on('question', (data) => {
      setQuestionData(data);
      setTimeLeft(15);
      setSelectedAnswer(null);
      setFeedback(null);
    });

    newSocket.on('result', (data) => {
      setFeedback(data.message);
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timerId);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      setFeedback('Time is up! No answer selected.');
      return;
    }
    socket.emit('submit-answer', { answer: selectedAnswer, timeTaken: 15 - timeLeft });
  };

  if (!questionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.questionBox}>
        <div className={styles.questionContent}>
          {questionData.question}
        </div>
      </div>
      <div className={styles.timer}>Time left: {timeLeft}s</div>
      <form className={styles.form}>
        {questionData.options.map((option, index) => (
          <label key={index} className={styles.answerOption}>
            <input 
              type="radio" 
              value={option} 
              checked={selectedAnswer === option} 
              onChange={handleAnswerChange} 
            />
            {option}
          </label>
        ))}
        <button type="button" onClick={handleSubmit} className={styles.submitButton}>
          Confirm
        </button>
      </form>
      {feedback && <div className={styles.feedback}>{feedback}</div>}
    </div>
  );
};

export default MultipleChoicePage;
