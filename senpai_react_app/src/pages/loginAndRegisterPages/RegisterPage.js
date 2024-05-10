import styles from '../General.module.css';
import styles2 from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/SelectLearningContent");
  }
  return (
    <div> 
        <h1>Register</h1>
      <div className={styles2.loginContainer}>
        <form action="">
          <div className={styles2.loginFormDiv}>
            <label htmlFor="username">Username</label>
            <input type="username" placeholder="Enter Username" />
          </div>
          <div className={styles2.loginFormDiv}>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter Email" />
          </div>
          <div className={styles2.loginFormDiv}>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Password" />
          </div>
          
        </form>
        <div className= {styles2.loginButtonDiv}>
            <button className={styles.button01} onClick={handleLogin}>Register</button>
        </div>
       
        
      </div>
    </div>
  );
}

export default RegisterPage;
