import { useNavigate } from "react-router-dom";
import styles from "./StartPage.module.css";

function StartPage() {
    const navigate = useNavigate();

    const handleClick = () => {
            navigate("./login");
    };

    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.contentContainer}>
                <div className={styles.senpaiText}>Senpai</div>
                <div className={styles.startDiv}>
                    <button className={styles.button74} onClick={handleClick}>
                        Starte dein Training
                    </button>
                </div>
                <div className={styles.infoBox}>
                    <li>Du interessierst dich für die Themenbereiche Programmieren, Mathematik, Medizin oder Fitness und möchtest mehr dazulernen?<br/></li>
                    <li>Du bist traditionelle Lernmethoden leid?<br/></li>
                    <li>Du brauchst mehr Action und willst dich mit anderen messen?<br/><br/></li>
                    <strong>Dann bist du hier genau richtig!<br/><br/></strong>
                    Senpai hilft dir, deine Lernziele auf spielerische Weise zu erreichen.<br/>
                    Beginne dein Training indem du auf den Button unten rechts klickst.
                </div>
            </div>
        </div>
    );
}

export default StartPage;
