import styles from '../General.module.css';
import styles2 from "./StartPage.module.css";
import { useNavigate } from "react-router-dom";
import senpaiBackground from "../../assets/senpaiStartPage.jpg";

function StartPage(){
    // useNavigate is used to switch between pages
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("./login");
    };

    return(
        <div className={styles2.background} style={{backgroundImage: `url(${senpaiBackground})`}}>
            <div className= {styles2.startDiv}>
                <h1>Senpai</h1>
                <div>
                    <button className={styles.button01} onClick={handleClick}>
                        Start Your Journey
                    </button>
                </div>
            </div>
            
        </div>
    );
}

export default StartPage;
