import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StartPage.module.css";

function StartPage() {
    const navigate = useNavigate();
    const [startAnimation, setStartAnimation] = useState(false);

    const handleClick = () => {
        setStartAnimation(true);
        setTimeout(() => {
            navigate("./login");
        }, 3000); // 3 seconds delay
    };

    return (
        <div className={styles.backgroundContainer}>
            <div className={`${styles.contentContainer} ${startAnimation ? styles.fadeOut : ""}`}>
                <div className={styles.senpaiText}>Senpai</div>
                <div className={styles.startDiv}>
                    <button className={styles.button74} onClick={handleClick}>
                        Start your journey
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
