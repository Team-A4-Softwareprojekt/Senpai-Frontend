import Modal from '../modal/Modal';
import styles from './SelectCard.module.css';
import { Link } from 'react-router-dom';

/*
 This is the selectcard component. The whole component is a link to another page
 The parameters are set when the component is initialized
*/
function SelectCard({ buttonText, imageUrl, linkTo, modalHeader, modalText}){
    return(
        <div >
            <Link to={linkTo}>
            <button className= {styles.selectButton}>
            <img className= {styles.selectCardImg} src= {imageUrl} alt="Image Description" />
            <h1> {buttonText} </h1>
            </button>
            </Link>
            <Modal header = {modalHeader} text = {modalText}></Modal>
        </div>
    );
}

// Default text when the buttontext was not set
SelectCard.defaultProps = {
    buttonText: ' Not Found'
}
export default SelectCard;