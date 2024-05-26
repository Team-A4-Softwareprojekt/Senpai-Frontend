import styles from '../General.module.css';
import styles2 from "./StartPage.module.css";
import { useNavigate } from "react-router-dom";
import senpaiBackground from "../../assets/senpaiStartPage.jpg";

/*
This is the start page with the title and a button to move on
*/
function StartPage(){ //(props)
    // UseNavigate is used to switch between pages
    const navigate = useNavigate();

    // Navigates to the login page
    const handleClick = () => {
        //props.checkClick();
        navigate("./login");
    };

    return(
        // Background image 
        <div className={styles2.background} style={{backgroundImage: `url(${senpaiBackground})`}}>
            <div className= {styles2.startDiv}>
                <h1>Senpai</h1>
                <div>
                    <button data-testid="startButton" className={styles.button01} onClick={handleClick}>
                        Start Your Journey
                    </button> 
                </div>
            </div>
            
        </div>
    );
}

export default StartPage;
