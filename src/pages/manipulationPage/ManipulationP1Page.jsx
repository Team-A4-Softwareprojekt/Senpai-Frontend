import React, { useEffect, useState, useContext } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { useNavigate } from 'react-router-dom';
import { ManipulationPlayerContext } from '../../context/manipulationQuestionContext.jsx';
import { socket } from '../../socket.js';
import PopUpManipulationWordLimit from '../../popups/popUpManipulation/PopUpManipulationWordLimit.jsx';
import styles from './ManipulationPage.module.css';
import ScoresRound from "../../components/scoresRound/ScoresRound.jsx";
import {ScoreContext} from "../../context/scoreContext.jsx";
import PopUpPlayerManipulationDisconnect from "../../popups/popUpPlayerDisconnected/PopUpPlayerManipulationDisconnect.jsx";

/**
 * ManipulationPage Component
 * 
 * This component renders the manipulation game page where players can manipulate
 * a given piece of code. It provides functionalities to submit the code and check
 * the remaining characters allowed for manipulation.
 * 
 * Props:
 * - None
 * 
 * Context:
 * - ManipulationPlayerContext: Manages the state of the manipulation question.
 * - ScoreContext: Manages the state of the scores.
 * 
 * State:
 * - code: The current code being manipulated.
 * - initialCode: The initial code before any manipulation.
 * - selectedLanguage: The programming language selected for the editor.
 * - charactersLeft: The number of characters left for manipulation.
 * - expectedOutput: The expected output of the code after manipulation.
 * - inputParameterQuestion: The input parameter for the question.
 * - showEditor: Boolean to control the visibility of the code editor.
 * - showInfoContainer: Boolean to control the visibility of the information container.
 * - showManipulationContainer: Boolean to control the visibility of the manipulation container.
 * - actionText: Text to display actions or instructions to the user.
 * - codeTest: The test code to append to the main code.
 * - showWordLimitPopup: Boolean to control the visibility of the word limit popup.
 * - isPlayerDisconnected: Boolean to check if the opponent player is disconnected.
 * - isPopUpPlayerDisconnectedVisible: Boolean to control the visibility of the player disconnected popup.
 */
function ManipulationPage() {
  const navigate = useNavigate();
  const { manipulationQuestion } = useContext(ManipulationPlayerContext);
  const [code, setCode] = useState('');
  const [initialCode, setInitialCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [charactersLeft, setCharactersLeft] = useState(0);
  const [expectedOutput, setExpectedOutput] = useState('');
  const [inputParameterQuestion, setInputParameterQuestion] = useState('');
  const [showEditor, setShowEditor] = useState(true);
  const [showInfoContainer, setShowInfoContainer] = useState(true);
  const [showManipulationContainer, setShowManipulationContainer] = useState(true);
  const [actionText, setActionText] = useState('');
  const [codeTest, setCodeTest] = useState('');
  const { ownPoints, opponentPoints } = useContext(ScoreContext);
  const [showWordLimitPopup, setShowWordLimitPopup] = useState(false);
  const [isPlayerDisconnected, setIsPlayerDisconnected] = useState(false);
  const [isPopUpPlayerDisconnectedVisible, setIsPopUpPlayerDisconnectedVisible] = useState(false);

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python', disabled: true },
    { value: 'java', label: 'Java', disabled: true },
    { value: 'ruby', label: 'Ruby', disabled: true },
  ];

  // Function to submit the manipulated code
  const submitCode = () => {
    let codeWithTest = code + '\n' + codeTest;
    socket.emit('SUBMIT_CHANGES_MANIPULATION', { code: codeWithTest, expectedOutput, inputParameterQuestion });
    setShowEditor(false);
    setShowInfoContainer(false);
    setActionText('Warte bis dein Gegner fertig ist...');
  };

  // Function to handle changes in the editor
  const onChange = (newCode) => {
    let codeLines = manipulationQuestion.code.split('\n');
    // Get the last line
    let lastLine = codeLines[codeLines.length - 1];
    // Initial code length without spaces and without the last line
    const initialLength = initialCode.replace(/\s/g, '').length - lastLine.replace(/\s/g, '').length;
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

  useEffect(() => {
    // Check if manipulationQuestion is not null
    if (manipulationQuestion) {
      // Set initial code, expected output, input parameter, and characters left
      let codeLines = manipulationQuestion.code.split('\n');
      let codeExceptLastLine = codeLines.slice(0, -1).join('\n');
      let codeTest = codeLines[codeLines.length - 1];

      // Set the code and codeTest
      setCode(codeExceptLastLine);
      setCodeTest(codeTest);

      // Set the initial code, expected output, input parameter, and characters left
      setInitialCode(manipulationQuestion.code);
      setExpectedOutput(manipulationQuestion.outputtext);
      setInputParameterQuestion(manipulationQuestion.inputtext);
      setCharactersLeft(manipulationQuestion.permittedsymbols);
    }
  }, [manipulationQuestion]);

  // Socket event listeners
  const handleStartNewRound = () => {
    navigate('/codebattle/manipulation/player2');
  };

  const handleSwitchPageManipulation = () => {
    navigate('/codebattle/manipulation/player2');
  };

  useEffect(() => {
    const opponentDisconnected = () => {
      // Set player disconnected to true and show the player disconnected popup
      setIsPlayerDisconnected(true);
      setShowManipulationContainer(false);
      setIsPopUpPlayerDisconnectedVisible(true);
      // Navigate to the code battle page after 3 seconds
      setTimeout(() => {
        setIsPopUpPlayerDisconnectedVisible(false);
        navigate('/select/code/codeBattle');
      }, 3000);
    }

    // Set up socket event listeners
    socket.on('START_NEW_ROUND_MANIPULATION', handleStartNewRound);
    socket.on('SWITCH_PAGE_MANIPULATION', handleSwitchPageManipulation);
    socket.on('OPPONENT_DISCONNECTED', opponentDisconnected);

    return () => {
      // Clean up socket event listeners
      socket.off('START_NEW_ROUND_MANIPULATION', handleStartNewRound);
      socket.off('SWITCH_PAGE_MANIPULATION', handleSwitchPageManipulation);
      socket.off('OPPONENT_DISCONNECTED', opponentDisconnected);
    };
  }, []);

  // Function to handle closing the word limit popup
  const handleCloseWordLimitPopup = () => {
    setShowWordLimitPopup(false);
    setShowManipulationContainer(true);
  };

  return (
    <div className={styles.backgroundImage} >
      {showManipulationContainer && (
      <div className={styles.manipulationContainer}>
        <ScoresRound ownPoints={ownPoints} opponentPoints={opponentPoints} />
        {showInfoContainer && (
          <div className={styles.infoContainer}>
            <div className={styles.infoBox}>
                Verbleibende Zeichen:
              <div className={styles.dynamicContainer}>
                <span className={styles.dynamicData}>{charactersLeft}</span>
              </div>
            </div>
            <div className={styles.infoBox}>
                Parameterwert:
              <div className={styles.dynamicContainer}>
                <span className={styles.dynamicData}>{inputParameterQuestion}</span>
              </div>
            </div>
            <div className={styles.infoBox}>
                Konsolenausgabe:
              <div className={styles.dynamicContainer}>
                <span className={styles.dynamicData}>{expectedOutput}</span>
              </div>
            </div>
          </div>
        )}
        <div>
          <h2 className={styles.infoText}>
            {actionText}
          </h2>
        </div>
        {showEditor && (
          <>
            <div className={`${styles.editor}`}>
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
            <button onClick={submitCode} className={styles.runButton}>
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
