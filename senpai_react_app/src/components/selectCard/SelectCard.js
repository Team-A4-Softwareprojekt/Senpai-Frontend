import styles from './SelectCard.module.css';
import { Link } from 'react-router-dom';

function SelectCard({ buttonText, imageUrl, linkTo}){
    return(
        <Link to={linkTo}>
            <button className= {styles.selectButton}>
            <img className= {styles.selectCardImg} src= {imageUrl} alt="Image Description" />
            <h1> {buttonText} </h1>
            </button>
        </Link>
        
    );
}

SelectCard.defaultProps = {
    buttonText: ' Not Found'
}
export default SelectCard;