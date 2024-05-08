import styles from './Button.module.css';
// import classNames from 'classnames/bind';

function Button({ text }){
    return(
        <button className = {styles.buttonStyle}>
            {text}
        </button>
    );
}
export default Button;