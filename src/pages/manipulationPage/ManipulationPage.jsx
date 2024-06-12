import styles from '../General.module.css';
import styles2 from './ManipulationPage.module.css';

import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

function ManipulationPage() {
  const [code, setCode] = useState('console.log("Hello, World!")');
  const [output, setOutput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python', disabled: true },
    { value: 'java', label: 'Java', disabled: true },
    { value: 'ruby', label: 'Ruby', disabled: true },
    // Add more languages as needed
  ];

  const executeCode = () => {
    try {
      // Capture console output
      const consoleOutput = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        consoleOutput.push(args.join(' '));
        originalConsoleLog(...args);
      };

      // Execute the JavaScript code
      const func = new Function(code);
      func();

      // Restore original console.log
      console.log = originalConsoleLog;

      // Set output state
      setOutput(consoleOutput.join('\n'));
    } catch (error) {
      console.error('Error:', error);
      setOutput('Error occurred during code execution.');
    }
  };

  const onChange = (newCode) => {
    setCode(newCode);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <>
      <h1 className={styles2.title}>This is the Manipulation Page</h1>
      <div className={styles2.languageDropdownContainer}>
        <label htmlFor="language">Select a programming language:</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className={styles2.languageDropdown}
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
          style={{ width: '50vw', height: '300px', fontSize: '21px' }}
          readOnly={languages.find((lang) => lang.value === selectedLanguage).disabled}
        />
        <button onClick={executeCode} className={styles2.runButton}>
          Run
        </button>
      </div>
      <div>
        <h2>Output:</h2>
        <pre>{output}</pre> {/* Display output here */}
      </div>
    </>
  );
}

export default ManipulationPage;
