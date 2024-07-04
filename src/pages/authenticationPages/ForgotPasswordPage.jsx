import styles from './Authentication.module.css';
import {useNavigate} from 'react-router-dom';
import React, {useState, useEffect} from "react";
import {URL} from '../../../url.js';
import PopUpPasswordChangeSuccess from '../../popups/popUpPasswordChangeSuccess/PopUpPasswordChangeSuccess.jsx';

// Main component function for the ForgotPasswordPage
function ForgotPasswordPage() {
    const navigate = useNavigate();

    const url = URL + '/forgotPassword';
    const urlQuestion = URL + '/security-questions';

    // State variables for form inputs and validation
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [securityQuestions, setSecurityQuestions] = useState([]);
    const [errors, setErrors] = useState({});
    const [actionText, setActionText] = useState('');
    const [isPopUpPasswordChangeSuccessVisible, setIsPopUpPasswordChangeSuccessVisible] = useState(false);

    // Fetch security questions from the server
    useEffect(() => {
        fetch(urlQuestion)
            .then(response => response.json())
            .then(data => setSecurityQuestions(data))
            .catch(error => console.error('Error:', error));
    }, []);


    // Handle input changes
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleSecurityQuestionChange = (e) => setSecurityQuestion(e.target.value);
    const handleSecurityAnswerChange = (e) => setSecurityAnswer(e.target.value);

    // Show success popup and redirect to login page
    const handlePasswordChangeSuccess = () => {
        setIsPopUpPasswordChangeSuccessVisible(true);
        setTimeout(() => {
            setIsPopUpPasswordChangeSuccessVisible(false);
            navigate('/login');
        }, 3000);
    };

    // Validate form inputs
    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'E-Mail ist erforderlich';
        if (!password) newErrors.password = 'Passwort ist erforderlich';
        if (!securityQuestion) newErrors.securityQuestion = 'Sicherheitsfrage ist erforderlich';
        if (!securityAnswer) newErrors.securityAnswer = 'Sicherheitsantwort ist erforderlich';
        return newErrors;
    };

    // Handle password reset
    const handleReset = (event) => {

        event.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, securityQuestion, securityAnswer})
        })
            .then(response => {

                if (!response.ok) {
                    throw new Error('Netzwerk Antwort war nicht in Ordnung.');
                }
                return response.json();
            })
            .then(data => {
                if (data.success === true) {
                    handlePasswordChangeSuccess();
                } else {
                    setActionText(data.message);
                }
            });
    }

    return (
        <div className={styles.backgroundContainer}>
            {!isPopUpPasswordChangeSuccessVisible && (
            <div className={styles.authenticationContainer}>
                <div className={styles.h1}>Passwort zurücksetzen</div>
                <form onSubmit={handleReset}>
                    <div className={styles.authenticationFormDiv}>
                        <label htmlFor="email">E-Mail</label>
                        <input type="email" placeholder="E-Mail eingeben" value={email} onChange={handleEmailChange}/>
                        {errors.email && <div className={styles.error}>{errors.email}</div>}
                    </div>
                    <div className={styles.authenticationFormDiv}>
                        <label htmlFor="password">Passwort</label>
                        <input type="password" placeholder="Neues Passwort eingeben" value={password}
                               onChange={handlePasswordChange}/>
                        {errors.password && <div className={styles.error}>{errors.password}</div>}
                    </div>
                    <div className={styles.authenticationFormDiv}>
                        <label htmlFor="securityQuestion">Sicherheitsfrage</label>
                        <select value={securityQuestion} onChange={handleSecurityQuestionChange}>
                            <option value="">Eine Sicherheitsfrage auswählen</option>
                            {securityQuestions.map((question, index) => (
                                <option key={index} value={question}>{question}</option>
                            ))}
                        </select>
                        {errors.securityQuestion &&
                            <div className={styles.error}>{errors.securityQuestion}</div>}
                    </div>
                    <div className={styles.authenticationFormDiv}>
                        <label htmlFor="securityAnswer">Sicherheitsantwort</label>
                        <input type="text" placeholder="Eine Sicherheitsantwort eingeben" value={securityAnswer}
                               onChange={handleSecurityAnswerChange}/>
                        {errors.securityAnswer && <div className={styles.error}>{errors.securityAnswer}</div>}
                    </div>
                    <div className={styles.passwordChangeFail}>
                        {actionText}
                    </div>
                    <div className={styles.buttonDiv}>
                        <button type="submit" className={styles.button}>Bestätigen</button>
                    </div>
                </form>
            </div>
            )}
            {isPopUpPasswordChangeSuccessVisible && (
                <PopUpPasswordChangeSuccess isVisible={isPopUpPasswordChangeSuccessVisible}/>
            )}
        </div>
    );
}

export default ForgotPasswordPage;