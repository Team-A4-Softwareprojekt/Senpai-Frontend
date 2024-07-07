import React from 'react';
import ModalGameSelection from '../../components/modalGameSelection/ModalGameSelection';
import styles from './SelectGameCard.module.css';
import { Link } from 'react-router-dom';

/**
 * SelectGameCard Component
 * 
 * This component is responsible for displaying a selectable game card with a button, image, dropdown, and modal for game rules.
 * It takes several props to configure its behavior and content:
 * - `buttonText`: The text to display on the button.
 * - `imageUrl`: The URL of the image to display on the card.
 * - `linkTo`: The URL to navigate to when the button is clicked.
 * - `header`: The header text for the modal.
 * - `text`: The content text for the modal.
 * - `slides`: The slides to display in the modal.
 * - `handleClick`: The function to call when the button is clicked (if the user has lives or time remaining).
 * - `handleNoHeartsClick`: The function to call when the button is clicked (if the user has no lives and no time remaining).
 * - `lives`: The number of lives the user has.
 * - `time`: The remaining time for the user.
 * - `selectedOption`: The initially selected programming language option in the dropdown.
 */
function SelectGameCard({ buttonText, imageUrl, linkTo, header, text, slides, handleClick, handleNoHeartsClick, lives, time, selectedOption }) {

    // Handle button click, calling the appropriate function based on the user's lives and time
    const onButtonClick = () => {
        if (lives === 0 && time <= 0) {
            handleNoHeartsClick();
        } else {
            handleClick();
        }
    };

    return (
        <div className={styles.selectCardContainer}>
            <h1 className={styles.buttonText}>{buttonText}</h1>
            <Link to={linkTo}>
                <button className={styles.selectButton} onClick={onButtonClick}>
                    <img className={styles.selectCardImg} src={imageUrl} alt="Image Description" />
                </button>
            </Link>
            <div className={styles.verticalContainer}>
                <div className={styles.dropdownContainer}>
                    <select defaultValue={selectedOption}>
                        <option value="Java" disabled={selectedOption !== 'Java'}>Java</option>
                        <option value="JavaScript" disabled={selectedOption !== 'JavaScript'}>JavaScript</option>
                        <option value="Python" disabled={selectedOption !== 'Python'}>Python</option>
                        <option value="C" disabled={selectedOption !== 'C'}>C</option>
                        <option value="C++" disabled={selectedOption !== 'C++'}>C++</option>
                    </select>
                </div>
                <div className={styles.questionMarkContainer}>
                    <ModalGameSelection header={header} text={text} slides={slides} />
                </div>
            </div>
        </div>
    );
}

export default SelectGameCard;
