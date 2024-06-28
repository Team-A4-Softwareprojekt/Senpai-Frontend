import styles from './Authentication.module.css';
import {useNavigate} from 'react-router-dom';
import {useContext, useState} from "react";
import {PlayerContext} from '../../context/playerContext.jsx';
import {URL} from '../../../url.js';

/*
This is the login page that takes two inputs (username, password)
and has a button to confirm the login process. The page also has two hyperlinks that link to
the register page and the forgot password page
*/
function LoginPage() {

    // Navigate function
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loginError, setLoginError] = useState('');
    const { playerName, setPlayerName } = useContext(PlayerContext);

    const url = URL + '/login';

    // functions for updating the input formula
    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
    };

    const handleUsernameChange = (event) => {
        const newUsername = event.target.value;
        setUsername(newUsername);
    };

    // Navigates to the selectlearningcontent page
    const handleLogin = (event) => {
        event.preventDefault();
        setLoginError(''); // Clear previous errors
        console.log('Eingegebener Username:', username);
        console.log('Eingegebenes Passwort:', password);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Die Antwort als JSON lesen
            })
            .then(data => {
                console.log('Response from server:', data);
                if (data.success == true) {
                    setPlayerName(data.username);
                    navigate("/select");
                } else {
                    setLoginError("Falscher Benutzername oder Passwort")
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.authenticationContainer}>
                <div className={styles.h1}>Login</div>
                <form action="">
                    <div className={styles.authenticationFormDiv}>
                        <label htmlFor="username">Benutzername</label>
                        <input id="username" type="text" placeholder="Benutzername eingeben" value={username}
                               onChange={handleUsernameChange}/>
                    </div>
                    <div className={styles.authenticationFormDiv}>
                        <label htmlFor="password">Passwort</label>
                        <input id="password" type="password" placeholder="Passwort eingeben" value={password}
                               onChange={handlePasswordChange}/>
                    </div>
                </form>
                {loginError && <div className={styles.error}>{loginError}</div>}
                <div className={styles.additionalLinks}>
                    <a href="/register" className={styles.link}>Registrieren</a>
                    <span className={styles.separator}> | </span> {/* Separator between links */}
                    <a href="/forgotPassword" className={styles.link}>Passwort vergessen</a>

                </div>
                <div className={styles.buttonDiv}>
                    <button className={styles.button} onClick={handleLogin}>Login</button>
                </div>


            </div>
        </div>
    );
}

export default LoginPage;