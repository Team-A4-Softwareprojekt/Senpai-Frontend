import React, { useEffect, useState, useContext } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import HomeButton from '../../components/homeButton/HomeButton.jsx';
import { useNavigate } from 'react-router-dom';
import { ManipulationPlayerContext } from '../../context/manipulationQuestionContext.jsx';
import Modal from '../../components/modal/Modal';
import { socket } from '../../socket.js';

import styles from '../General.module.css';
import styles2 from './ManipulationPage.module.css';

function ManipulationPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [initialCode, setInitialCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const { manipulationQuestion } = useContext(ManipulationPlayerContext);
  const [output, setOutput] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [rightAnswer, setRightAnswer] = useState(false);
  const { setManipulationQuestion } = useContext(ManipulationPlayerContext);
  const [codeTest, setCodeTest] = useState('');

  const handleHomeClick = () => {
    navigate('/select/code');
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python', disabled: true },
    { value: 'java', label: 'Java', disabled: true },
    { value: 'ruby', label: 'Ruby', disabled: true },
  ];

  const executeCode = () => {
    try {
      const consoleOutput = [];
      const originalConsoleLog = console.log;
  
      // Temporarily override console.log to capture output
      console.log = (...args) => {
        consoleOutput.push(args.join(' '));
        originalConsoleLog(...args);
      };
  
      let modifiedCode = code;
  
      // Remove unnecessary console.log statements
      if (modifiedCode.includes('console.log')) {
        modifiedCode = modifiedCode.replace(/console\.log\([^)]*\);?/g, '');
      }
  
      // Ensure codeTest (last line) is added back
      modifiedCode += '\n' + codeTest;

      // Create and execute the new function
      const func = new Function(modifiedCode);
      func();
  
      // Restore the original console.log
      console.log = originalConsoleLog;
  
      const resultOutput = consoleOutput.join('\n').trim();
      const expected = expectedOutput.trim();
  
      if (resultOutput === expected) {
        setAlertMessage('Well done! Output matches expected result.');
        setRightAnswer(true);
        socket.emit('ROUND_END_MANIPULATION', true);
      } else {
        setAlertMessage('Output does not match the expected result.');
        setRightAnswer(false);
        socket.emit('ROUND_END_MANIPULATION', false);
      }
    } catch (error) {
      console.log(error);
      setAlertMessage('An error occurred while executing the code.');
      setRightAnswer(false);
      socket.emit('ROUND_END_MANIPULATION', false);
    }
  };
  
  

  const onChange = (newCode) => {
    setCode(newCode);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  useEffect(() => {
    if (manipulationQuestion) {
      let codeLines = manipulationQuestion.code.split('\n');
      let codeExceptLastLine = codeLines.slice(0, -1).join('\n');
      let codeTest = codeLines[codeLines.length - 1]; // Get the last line
      
      setCode(codeExceptLastLine);
      setCodeTest(codeTest);
      console.log('Code test:', codeTest);
      setInitialCode(manipulationQuestion.code);
      setOutput('');
      setExpectedOutput(manipulationQuestion.outputtext);
    }
  }, [manipulationQuestion]);

  useEffect(() => {
    if (alertMessage) {
      alert(alertMessage);
      setAlertMessage('');
    }
  }, [alertMessage]);

  const handleInputManipulation = (data) => {
    console.log("handle Input manipulation");
    const { code , answer } = data;
    console.log('Received code:', code);
    let codeLines = code.split('\n');
    let codeExceptLastLine = codeLines.slice(0, -1).join('\n');
    let codeTest = codeLines[codeLines.length - 1]; // Get the last line
    console.log('Code test:', codeTest);
    setCode(codeExceptLastLine);
    setCodeTest(codeTest);
    setExpectedOutput(answer);
    setInitialCode(code);
    setOutput('');
    setIsDisabled(false);
  };

  const handleStartNewRound = () => {
    console.log('Starting new round');
    navigate('/codebattle/manipulation/player1');
  };

  const handleSetQuestionManipulation = (question) => {   
    console.log(question);
    setManipulationQuestion(question);
  };

  useEffect(() => {
    socket.on('SET_MANIPULATION_QUESTION', handleSetQuestionManipulation);
    socket.on('ENABLE_INPUT_MANIPULATION', handleInputManipulation);
    socket.on('START_NEW_ROUND_MANIPULATION', handleStartNewRound);

    return () => {
      socket.off('SET_MANIPULATION_QUESTION', handleSetQuestionManipulation);
      socket.off('ENABLE_INPUT_MANIPULATION', handleInputManipulation);
      socket.off('START_NEW_ROUND_MANIPULATION', handleStartNewRound);
    };
  }, []);

  return (
    <>
      <header className={styles2.header}>
        <HomeButton handleClick={handleHomeClick} />
        <h1>Manipulation</h1>
      </header>
      {!isDisabled && (
        <>
          <div className={styles2.languageDropdownContainer}>
            <label htmlFor="language">Select a programming language:</label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className={styles2.languageDropdown}
              disabled={isDisabled}
            >
              {languages.map((lang) => (
                <option
                  key={lang.value}
                  value={lang.value}
                  disabled={lang.disabled}
                >
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles2.editor}>
            <AceEditor
              mode={selectedLanguage}
              theme="monokai"
              onChange={onChange}
              name="UNIQUE_ID_OF_EDITOR"
              editorProps={{ $blockScrolling: true }}
              value={code}
              style={{ width: '50vw', height: '300px'}}
              className={styles2.enabledEditor}
            />
            <div className={styles2.footer}>
              <button
                onClick={executeCode}
                className={styles2.runButton}
              >
                Submit
              </button>
              <Modal
                header="This is the manipulation game mode"
                text="In this game mode you have to manipulate the code so the output is not the same as the expected output. You have a limited number of characters you can change. If you have to wait, your next goal is to fix the mistakes to get to the expected output. Good luck!"
              />
            </div>
          </div>
        </>
      )}
      <div>
        <h2 className={styles2.infoText}>
          {isDisabled
            ? 'Wait for the other player to finish...'
            : `It's your turn. Change the code to achieve the desired output: ${expectedOutput}`
          }
        </h2>
      </div>
      {!isDisabled && (
        <div>
          <h2>Output:</h2>
          <pre>{output}</pre>
        </div>
      )}
    </>
  );
}

export default ManipulationPage;
