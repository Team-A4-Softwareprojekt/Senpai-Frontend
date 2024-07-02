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
                    Welcome to Senpai. Begin your journey by clicking the button on the right.
                    Welcome to Senpai. Begin your journey by clicking the button on the right.
                    Welcome to Senpai. Begin your journey by clicking the button on the right.
                    Welcome to Senpai. Begin your journey by clicking the button on the right.
                </div>
            </div>
        </div>
    );
}

export default StartPage;
