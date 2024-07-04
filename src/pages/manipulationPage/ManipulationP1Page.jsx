import React, { useEffect, useState, useContext } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { useNavigate } from 'react-router-dom';
import { ManipulationPlayerContext } from '../../context/manipulationQuestionContext.jsx';
import Modal from '../../components/modal/Modal';
import { socket } from '../../socket.js';
import ConfirmButton from '../../buttons/confirmButton/ConfirmButton.jsx';
import PopUpManipulationWordLimit from '../../popups/popUpManipulation/PopUpManipulationWordLimit.jsx';
import styles2 from './ManipulationPage.module.css';
import ScoresRound from "../../components/scoresRound/ScoresRound.jsx";
import {ScoreContext} from "../../context/scoreContext.jsx";
import PopUpPlayerManipulationDisconnect from "../../popups/popUpPlayerDisconnected/PopUpPlayerManipulationDisconnect.jsx";

function ManipulationPage() {
  const navigate = useNavigate();
  const { manipulationQuestion } = useContext(ManipulationPlayerContext);

  const [code, setCode] = useState('');
  const [initialCode, setInitialCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [charactersLeft, setCharactersLeft] = useState(0);
  const [expectedOutput, setExpectedOutput] = useState('');
  const [inputParameterQuestion, setInputParameterQuestion] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showEditor, setShowEditor] = useState(true); // State to toggle editor visibility
  const [showInfoContainer, setShowInfoContainer] = useState(true);
  const [showManipulationContainer, setShowManipulationContainer] = useState(true);
  const [actionText, setActionText] = useState('');
  const [codeTest, setCodeTest] = useState('');
  const { ownPoints, opponentPoints } = useContext(ScoreContext);
  const [showWordLimitPopup, setShowWordLimitPopup] = useState(false); // State to manage word limit popup visibility
  const [isPlayerDisconnected, setIsPlayerDisconnected] = useState(false);
  const [isPopUpPlayerDisconnectedVisible, setIsPopUpPlayerDisconnectedVisible] = useState(false);

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
    let codeWithTest = code + '\n' + codeTest; // Concatenate code and codeTest with a newline

    socket.emit('SUBMIT_CHANGES_MANIPULATION', { code: codeWithTest, expectedOutput, inputParameterQuestion });
    setShowEditor(false); // Hide editor after submission
    setShowInfoContainer(false);
    setActionText('Warte bis dein Gegner fertig ist...');
  };

  const onChange = (newCode) => {
    let codeLines = manipulationQuestion.code.split('\n');
    let lastLine = codeLines[codeLines.length - 1]; // Get the last line
    const initialLength = initialCode.replace(/\s/g, '').length - lastLine.replace(/\s/g, '').length; // Initial code length without spaces and without the last line
    const currentLength = newCode.replace(/\s/g, '').length;
    const changeCount = Math.abs(currentLength - initialLength);
  
    if (changeCount <= manipulationQuestion.permittedsymbols) {
      setCode(newCode);
      setCharactersLeft(manipulationQuestion.permittedsymbols - changeCount);
    } else {
      // Display word limit popup
      setShowWordLimitPopup(true);
      setShowManipulationContainer(false);
    }
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
      setExpectedOutput(manipulationQuestion.outputtext);
      setInputParameterQuestion(manipulationQuestion.inputtext);
      setCharactersLeft(manipulationQuestion.permittedsymbols);
      //setActionText(`Du hast ${manipulationQuestion.permittedsymbols} Zeichen übrig. Manipuliere den Code so, dass die Konsolenausgabe nicht ${manipulationQuestion.outputtext} ist. when the input is ${manipulationQuestion.inputtext}`);
    }
  }, [manipulationQuestion]);

  //useEffect(() => {
    //if (alertMessage) {
      // Replace alert with custom popup
      //setShowWordLimitPopup(true); // Show the word limit popup instead of alert
      //setAlertMessage('Du hast die zulässige Anzahl von Zeichenänderungen überschritten.');
    //}
  //}, [alertMessage]);

  const handleStartNewRound = () => {
    console.log('Starting new round');
    navigate('/codebattle/manipulation/player2');
  };

  const handleSwitchPageManipulation = () => {
    navigate('/codebattle/manipulation/player2');
  };

  useEffect(() => {

    const opponentDisconnected = () => {
      setIsPlayerDisconnected(true);
      setShowManipulationContainer(false);
      setIsPopUpPlayerDisconnectedVisible(true);
      setTimeout(() => {
        setIsPopUpPlayerDisconnectedVisible(false);
        navigate('/select/code/codeBattle');
      }, 3000);
    }


    socket.on('START_NEW_ROUND_MANIPULATION', handleStartNewRound);
    socket.on('SWITCH_PAGE_MANIPULATION', handleSwitchPageManipulation);
    socket.on('OPPONENT_DISCONNECTED', opponentDisconnected);

    return () => {
      socket.off('START_NEW_ROUND_MANIPULATION', handleStartNewRound);
      socket.off('SWITCH_PAGE_MANIPULATION', handleSwitchPageManipulation);
        socket.off('OPPONENT_DISCONNECTED', opponentDisconnected);
    };
  }, []);

  const handleCloseWordLimitPopup = () => {
    setShowWordLimitPopup(false);
    setShowManipulationContainer(true);
  };

  return (
    <div className={styles2.backgroundImage} >
      {showManipulationContainer && (
      <div className={styles2.manipulationContainer}>
        <ScoresRound ownPoints={ownPoints} opponentPoints={opponentPoints} />
        {showInfoContainer && (
          <div className={styles2.infoContainer}>
            <div className={styles2.infoBox}>
                Verbleibende Zeichen:
              <div className={styles2.dynamicContainer}>
                <span className={styles2.dynamicData}>{charactersLeft}</span>
              </div>
            </div>
            <div className={styles2.infoBox}>
                Parameterwert:
              <div className={styles2.dynamicContainer}>
                <span className={styles2.dynamicData}>{inputParameterQuestion}</span>
              </div>
            </div>
            <div className={styles2.infoBox}>
                Konsolenausgabe:
              <div className={styles2.dynamicContainer}>
                <span className={styles2.dynamicData}>{expectedOutput}</span>
              </div>
            </div>
          </div>
        )}
        <div>
          <h2 className={styles2.infoText}>
            {actionText}
          </h2>
        </div>
        {showEditor && (
          <>
            <div className={`${styles2.editor}`}>
              <AceEditor
                mode={selectedLanguage}
                theme="monokai"
                onChange={onChange}
                name="UNIQUE_ID_OF_EDITOR"
                editorProps={{ $blockScrolling: true }}
                value={code}
                style={{ width: '700px', height: '305px' }}
                fontSize={20}
                readOnly={languages.find((lang) => lang.value === selectedLanguage).disabled}
              />
            </div>
            <button onClick={submitCode} className={styles2.runButton}>
              Bestätigen
            </button>
          </>
        )}

      </div>
      )}
      <PopUpManipulationWordLimit
          isVisible={showWordLimitPopup}
          closePopUp={handleCloseWordLimitPopup}
      />
      {isPlayerDisconnected && (
          <PopUpPlayerManipulationDisconnect isVisible={isPopUpPlayerDisconnectedVisible}/>
      )}
    </div>
  );
}

export default ManipulationPage;
