import styles from './Authentication.module.css';
import {useNavigate} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import {URL} from '../../../url.js';
import PopUpRegistrationSuccess from '../../popups/popUpRegistrationSuccess/PopUpRegistrationSuccess.jsx';

// Main component function for the RegistrationPage
function RegisterPage() {
    const navigate = useNavigate();

    // State variables for form inputs and validation
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [securityQuestions, setSecurityQuestions] = useState([]);
    const [errors, setErrors] = useState({});
    const [actionText, setActionText] = useState('');
    const [isPopUpRegistrationSuccessVisible, setIsPopUpRegistrationSuccessVisible] = useState(false);
   
    const url = URL + '/security-questions';

    // Fetch security questions from the server
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setSecurityQuestions(data))
            .catch(error => console.error('Error:', error));
    }, []);

    // Handle input changes
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleSecurityQuestionChange = (e) => setSecurityQuestion(e.target.value);
    const handleSecurityAnswerChange = (e) => setSecurityAnswer(e.target.value);

    // Show success popup and redirect to login page
    const handleRegistrationSuccess = () => {  
        setIsPopUpRegistrationSuccessVisible(true);
        setTimeout(() => {
            setIsPopUpRegistrationSuccessVisible(false);
            navigate("/login");
        }, 3000);
    };

    // Validate form inputs
    const validate = () => {
        const newErrors = {};
        if (!username) newErrors.username = 'Benutzername ist erforderlich';
        if (!email) newErrors.email = 'E-Mail ist erforderlich';
        if (!password) newErrors.password = 'Passwort ist erforderlich';
        if (!securityQuestion) newErrors.securityQuestion = 'Sicherheitsfrage ist erforderlich';
        if (!securityAnswer) newErrors.securityAnswer = 'Sicherheitsantwort ist erforderlich';
        return newErrors;
    };

    // Handle form submission
    const handleRegister = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const url = URL + '/register';
        const data = { username, email, password, securityQuestion, securityAnswer };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    handleRegistrationSuccess();
                } else {
                    setActionText(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className={styles.backgroundContainer}>
            {!isPopUpRegistrationSuccessVisible && (
            <div className={styles.authenticationContainer}>
                <div className={styles.h1}>Registrieren</div>
                <form onSubmit={handleRegister}>
                    <div className={styles.authenticationFormDiv}>
                        <label htmlFor="username">Benutzername</label>
                        <input type="text" placeholder="Benutzername eingeben" value={username} onChange={handleUsernameChange} />
                        {errors.username && <div className={styles.error}>{errors.username}</div>}
                    </div>
                    <div className={styles.authenticationFormDiv}>
                        <label htmlFor="email">E-Mail</label>
                        <input type="email" placeholder="E-Mail eingeben" value={email} onChange={handleEmailChange} />
                        {errors.email && <div className={styles.error}>{errors.email}</div>}
                    </div>
                    <div className={styles.authenticationFormDiv}>
                        <label htmlFor="password">Passwort</label>
                        <input type="password" placeholder="Passwort eingeben" value={password} onChange={handlePasswordChange} />
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
                        {errors.securityQuestion && <div className={styles.error}>{errors.securityQuestion}</div>}
                    </div>
                    <div className={styles.authenticationFormDiv}>
                        <label htmlFor="securityAnswer">Sicherheitsantwort</label>
                        <input type="text" placeholder="Eine Sicherheitsantwort eingeben" value={securityAnswer} onChange={handleSecurityAnswerChange} />
                        {errors.securityAnswer && <div className={styles.error}>{errors.securityAnswer}</div>}
                    </div>
                    <div className={styles.registrationFail}>
                        {actionText}
                    </div>
                    <div className={styles.buttonDiv}>
                        <button type="submit" className={styles.button}>Registrieren</button>
                    </div>
                </form>
            </div>
            )}
            {isPopUpRegistrationSuccessVisible && (
                 <PopUpRegistrationSuccess isVisible={isPopUpRegistrationSuccessVisible}/>
            )}
        </div>
    );
}

export default RegisterPage;
