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
  const { manipulationQuestion } = useContext(ManipulationPlayerContext);

  const [code, setCode] = useState('');
  const [initialCode, setInitialCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [charactersLeft, setCharactersLeft] = useState(0);
  const [expectedOutput, setExpectedOutput] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showEditor, setShowEditor] = useState(true); // State to toggle editor visibility
  const [actionText, setActionText] = useState('');

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python', disabled: true },
    { value: 'java', label: 'Java', disabled: true },
    { value: 'ruby', label: 'Ruby', disabled: true },
    // Add more languages as needed
  ];

  const handleHomeClick = () => {
    navigate('/select/code');
  };

  const submitCode = () => {
    socket.emit('SUBMIT_CHANGES_MANIPULATION', {code} );
    setShowEditor(false); // Hide editor after submission
    setActionText('Wait for the other player to submit their changes.');
  };

  const onChange = (newCode) => {
    const initialLength = initialCode.length;
    const currentLength = newCode.length;
    const changeCount = Math.abs(currentLength - initialLength);

    if (changeCount <= manipulationQuestion.permittedsymbols) {
      setCode(newCode);
      setCharactersLeft(manipulationQuestion.permittedsymbols - changeCount);
      setActionText(`Change the code below. You have ${manipulationQuestion.permittedsymbols - changeCount} characters left. Change the code so the output is not: ${expectedOutput}`);
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
      setExpectedOutput(manipulationQuestion.outputtext);
      setCharactersLeft(manipulationQuestion.permittedsymbols);
      setActionText(`Change the code below. You have ${manipulationQuestion.permittedsymbols} characters left. Change the code so the output is not: ${manipulationQuestion.outputtext}`);
    }
  }, [manipulationQuestion]);

  useEffect(() => {
    if (alertMessage) {
      alert(alertMessage);
      setAlertMessage('');
    }
  }, [alertMessage]);

  return (
    <>
      <header className={styles2.header}>
        <HomeButton handleClick={handleHomeClick} />
        <h1>Manipulation</h1>
      </header>
      <div>
        <h2 className={styles2.infoText}>
          {actionText}
        </h2>
      </div>
      
      {showEditor && (
        <div className={styles2.editor}>
          <AceEditor
            mode={selectedLanguage}
            theme="monokai"
            onChange={onChange}
            name="UNIQUE_ID_OF_EDITOR"
            editorProps={{ $blockScrolling: true }}
            value={code}
            style={{ width: '50vw', height: '300px' }}
            readOnly={languages.find((lang) => lang.value === selectedLanguage).disabled}
          />
          <div className={styles2.footer}>
            <button onClick={submitCode} className={styles2.runButton}>
              Submit
            </button>
            <Modal
              header="This is the manipulation game mode"
              text="In this game mode you have to manipulate the code so the output is not the same as the expected output. You have a limited number of characters you can change. If you have to wait, your next goal is to fix the mistakes to get to the expected output. Good luck!"
            />
          </div>
        </div>
      )}

      <HomeButton handleClick={handleHomeClick} />
    </>
  );
}

export default ManipulationPage;
