import styles from '../General.module.css';
import styles2 from './LoginPage.module.css';

function LoginPage() {
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
            <button className={styles.button01}>Login</button>
        </div>
       
        
      </div>
    </div>
  );
}

export default LoginPage;
