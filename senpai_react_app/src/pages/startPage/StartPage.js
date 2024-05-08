import styles from '../General.module.css';
import { useNavigate } from "react-router-dom";

function StartPage(){
    // useNavigate is used to switch between pages
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("./login");
    };

    return(
        <>
        <h1>
           Senpai 
        </h1>
        <div>
            <button className = {styles.button01} 
                    onClick={handleClick}>
                Start Your Journey</button>
        </div>
        </>
        
    );
}
export default StartPage;