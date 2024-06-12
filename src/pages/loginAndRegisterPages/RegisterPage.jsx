import React, { useState, useEffect } from 'react';
import styles from '../General.module.css';
import styles2 from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [securityQuestions, setSecurityQuestions] = useState([]);
    const [errors, setErrors] = useState({});

    // Fetch security questions from the server
    useEffect(() => {
        fetch('http://localhost:3000/security-questions')
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

    // Validate form inputs
    const validate = () => {
        const newErrors = {};
        if (!username) newErrors.username = 'Username is required';
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (!securityQuestion) newErrors.securityQuestion = 'Security question is required';
        if (!securityAnswer) newErrors.securityAnswer = 'Security answer is required';
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

        const url = 'http://localhost:3000/register';
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
                    //TODO: Hier ein Popup, um zu zeigen, dass die Registrierung erfolgreich war
                    navigate("/login");
                } else {
                    alert('Registration failed');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h1>Register</h1>
            <div className={styles2.loginContainer}>
                <form onSubmit={handleRegister}>
                    <div className={styles2.loginFormDiv}>
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder="Enter Username" value={username} onChange={handleUsernameChange} />
                        {errors.username && <div className={styles2.errorMessage}>{errors.username}</div>}
                    </div>
                    <div className={styles2.loginFormDiv}>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter Email" value={email} onChange={handleEmailChange} />
                        {errors.email && <div className={styles2.errorMessage}>{errors.email}</div>}
                    </div>
                    <div className={styles2.loginFormDiv}>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" value={password} onChange={handlePasswordChange} />
                        {errors.password && <div className={styles2.errorMessage}>{errors.password}</div>}
                    </div>
                    <div className={styles2.loginFormDiv}>
                        <label htmlFor="securityQuestion">Security Question</label>
                        <select value={securityQuestion} onChange={handleSecurityQuestionChange}>
                            <option value="">Select a security question</option>
                            {securityQuestions.map((question, index) => (
                                <option key={index} value={question}>{question}</option>
                            ))}
                        </select>
                        {errors.securityQuestion && <div className={styles2.errorMessage}>{errors.securityQuestion}</div>}
                    </div>
                    <div className={styles2.loginFormDiv}>
                        <label htmlFor="securityAnswer">Security Answer</label>
                        <input type="text" placeholder="Enter Security Answer" value={securityAnswer} onChange={handleSecurityAnswerChange} />
                        {errors.securityAnswer && <div className={styles2.errorMessage}>{errors.securityAnswer}</div>}
                    </div>
                    <div className={styles2.loginButtonDiv}>
                        <button type="submit" className={styles.button01}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
