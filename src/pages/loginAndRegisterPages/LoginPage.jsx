import styles from '../General.module.css';
import styles2 from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from "react";
import { PlayerContext } from '../../context/playerContext';
import io from 'socket.io-client';

//const url = 'https://senpai-server.onrender.com/login?username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
const socket = io('http://localhost:3000');

function LoginPage() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loginError, setLoginError] = useState('');
    const { setPlayerName, setPlayerData } = useContext(PlayerContext);

    useEffect(() => {
        socket.on('login_success', (data) => {
            setPlayerName(data.playername);
            setPlayerData(data);
            navigate("/select");
        });

        socket.on('login_failure', (data) => {
            setLoginError(data.message);
        });

        return () => {
            socket.off('login_success');
            socket.off('login_failure');
        };
    }, [setPlayerName, setPlayerData, navigate]);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        setLoginError(''); // Clear previous errors
        socket.emit('login', { username, password });
    };

    return (
        <div>
            <h1>Login</h1>
            <div className={styles2.loginContainer}>
                <form>
                    <div className={styles2.loginFormDiv}>
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" placeholder="Enter Username" value={username}
                            onChange={handleUsernameChange} />
                    </div>
                    <div className={styles2.loginFormDiv}>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Enter Password" value={password}
                            onChange={handlePasswordChange} />
                    </div>
                </form>
                {loginError && <div className={styles2.error}>{loginError}</div>}
                <div className={styles2.additionalLinks}>
                    <a href="/register" className={styles2.link}>Register</a>
                    <span className={styles2.separator}> | </span>
                    <a href="/forgot-password" className={styles2.link}>Forgot Password</a>
                </div>
                <div className={styles2.loginButtonDiv}>
                    <button className={styles.button01} onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
