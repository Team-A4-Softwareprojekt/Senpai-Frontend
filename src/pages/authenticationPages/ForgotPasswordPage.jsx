import styles from './Authentication.module.css';
import {useNavigate} from 'react-router-dom';
import React, {useContext, useEffect, useState} from "react";
import {PlayerContext} from '../../context/playerContext.jsx';
import {URL} from '../../../url.js';


function ForgotPasswordPage() {

    // Navigate function
    const navigate = useNavigate();

    const url = URL + '/forgotPassword';
    const urlQuestion = URL + '/security-questions';


    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [securityQuestions, setSecurityQuestions] = useState([]);
    const [errors, setErrors] = useState({});


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


    // Validate form inputs
    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (!securityQuestion) newErrors.securityQuestion = 'Security question is required';
        if (!securityAnswer) newErrors.securityAnswer = 'Security answer is required';
        return newErrors;
    };

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
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success === true) {
                    //TODO: data.message kann als erfolgs meldung im popup verwendet werden 'email updated successfully'
                    console.log(data.message);
                    navigate('/login');
                }

            });
    }

    return (
        <div className={styles.backgroundContainer}> 
            <div className={styles.authenticationContainer}>
                <div className={styles.h1}>Reset password</div>
                <form onSubmit={handleReset}>
                    <div className={styles.authenticationFormDiv}>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter Email" value={email} onChange={handleEmailChange}/>
                        {errors.email && <div className={styles.error}>{errors.email}</div>}
                    </div>
                    <div className={styles.authenticationFormDiv}>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter new password" value={password}
                               onChange={handlePasswordChange}/>
                        {errors.password && <div className={styles.error}>{errors.password}</div>}
                    </div>
                    <div className={styles.authenticationFormDiv}>
                        <label htmlFor="securityQuestion">Security Question</label>
                        <select value={securityQuestion} onChange={handleSecurityQuestionChange}>
                            <option value="">Select a security question</option>
                            {securityQuestions.map((question, index) => (
                                <option key={index} value={question}>{question}</option>
                            ))}
                        </select>
                        {errors.securityQuestion &&
                            <div className={styles.error}>{errors.securityQuestion}</div>}
                    </div>
                    <div className={styles.authenticationFormDiv}>
                        <label htmlFor="securityAnswer">Security Answer</label>
                        <input type="text" placeholder="Enter Security Answer" value={securityAnswer}
                               onChange={handleSecurityAnswerChange}/>
                        {errors.securityAnswer && <div className={styles.error}>{errors.securityAnswer}</div>}
                    </div>
                    <div className={styles.buttonDiv}>
                        <button type="submit" className={styles.button}>Reset password</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;