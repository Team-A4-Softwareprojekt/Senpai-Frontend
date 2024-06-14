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
  const [charactersChanged, setCharactersChanged] = useState(0);
  const [charactersLeft, setCharactersLeft] = useState(0);
  const [expectedOutput, setExpectedOutput] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(2);
  const [togglePlayer, setTogglePlayer] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

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
    if (submissionAttempted) {
      return; // Prevent multiple submissions
    }

    setSubmissionAttempted(true);

    try {
      const consoleOutput = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        consoleOutput.push(args.join(''));
        originalConsoleLog(...args);
      };

      const func = new Function(code);
      func();

      console.log = originalConsoleLog;

      const resultOutput = consoleOutput.join('\n');
      setOutput(resultOutput);

      if (manipulationQuestion && manipulationQuestion.outputtext.trim() === resultOutput.trim()) {
        setAlertMessage('Well done! Output matches expected result.');
      } else {
        setAlertMessage('Output does not match the expected result.');
      }
    } catch (error) {
      console.error('Error:', error);
      setOutput('Error occurred during code execution.');
    }
  };

  const onChange = (newCode) => {
    const initialLength = initialCode.length;
    const currentLength = newCode.length;
    const changeCount = Math.abs(currentLength - initialLength);

    if (changeCount <= manipulationQuestion.permittedsymbols) {
      setCode(newCode);
      setCharactersChanged(changeCount);
      setCharactersLeft(manipulationQuestion.permittedsymbols - changeCount);
    } else {
      setAlertMessage('You have exceeded the permitted number of character changes.');
    }
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  useEffect(() => {
    if (manipulationQuestion) {
      setCode(manipulationQuestion.code);
      setInitialCode(manipulationQuestion.code);
      setOutput('');
      setExpectedOutput(manipulationQuestion.outputtext);
      setCharactersLeft(manipulationQuestion.permittedsymbols);
    }
  }, [manipulationQuestion]);

  useEffect(() => {
    if (alertMessage) {
      alert(alertMessage);
      setAlertMessage('');
    }
  }, [alertMessage]);

  const handleInputManipulation = (data) => {
    const { code } = data;
    console.log('Received code:', code);
    setCode(code);
    setInitialCode(code);
    setOutput('');
    setCharactersChanged(0);
    setIsDisabled(false);
  };

  useEffect(() => {
    socket.on('ENABLE_INPUT_MANIPULATION', handleInputManipulation);

    return () => {
      socket.off('ENABLE_INPUT_MANIPULATION', handleInputManipulation);
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
              style={{ width: '50vw', height: '300px' }}
              readOnly={false}
              className={styles2.enabledEditor}
            />
            <div className={styles2.footer}>
              <button
                onClick={executeCode}
                className={styles2.runButton}
                disabled={isDisabled || submissionAttempted} // Disable after submission attempt
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
