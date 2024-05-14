import styles from '../General.module.css';
import styles2 from "./StartPage.module.css";
import { useNavigate } from "react-router-dom";
import senpaiBackground from "../../assets/senpaiStartPage.jpg";


/*
This is the start page with the title and a button to move on
*/
function StartPage(){
    // UseNavigate is used to switch between pages
    const navigate = useNavigate();

    // Navigates to the login page
    const handleClick = () => {
        navigate("./login");

        fetch('https://senpai-server.onrender.com/registration')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Die Antwort als Text lesen
        })
        .then(data => {
            console.log('Response from server:', data); // Anzeige der Antwort in der Konsole
            // Hier kannst du die Antwort in deiner Anwendungslogik weiterverarbeiten oder anzeigen
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });


    };

    return(
        // Background image 
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
