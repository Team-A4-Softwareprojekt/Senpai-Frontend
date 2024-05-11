import styles from '../General.module.css';
import styles2 from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';

/*
This is the login page that takes two inputs (username, password) 
and has a button to confirm the login process. The page also has two hyperlinks that link to 
the register page and the forgot password page
*/
function LoginPage() {
  
  // Navigate function
  const navigate = useNavigate();

  // Navigates to the selectlearningcontent page
  const handleLogin = () => {
    navigate("/selectLearningContent");
  }
  return (
    <div> 
        <h1>Login</h1>
      <div className={styles2.loginContainer}>
        <form action="">
          <div className={styles2.loginFormDiv}>
            <label htmlFor="username">Username</label>
            <input type="username" placeholder="Enter Username" />
          </div>
          <div className={styles2.loginFormDiv}>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Password" />
          </div>
          
        </form>
        <div className={styles2.additionalLinks}>
          <a href="/register" className={styles2.link}>Register</a>
          <span className={styles2.separator}> | </span> {/* Separator between links */}
          <a href="/forgot-password" className={styles2.link}>Forgot Password</a>
          
        </div>
        <div className= {styles2.loginButtonDiv}>
            <button className={styles.button01} onClick={handleLogin}>Login</button>
        </div>
       
        
      </div>
    </div>
  );
}

export default LoginPage;
