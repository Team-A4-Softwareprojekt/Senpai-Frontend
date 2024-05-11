import sadFaceImg from '../../assets/sadFace.png';
import styles from './NoPage.module.css';

/*
This is the no page which appears when a page is not found or not yet implemented
(Error 404)
*/
function NoPage(){
    return (
        <div>
            <div className= {styles.imageContainer}>
                <img className = {styles.image} src= {sadFaceImg} alt = "Ooops"></img>
            </div>
            
            <h1>404</h1>
            <h2>Page Not Found</h2>
        </div>
        
    );
}
export default NoPage;