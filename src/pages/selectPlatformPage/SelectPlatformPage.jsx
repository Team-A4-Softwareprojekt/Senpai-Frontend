import React, { useState } from 'react';
import styles from './SelectPlatformPage.module.css';
import SelectContentCard from '../../cards/selectContentCard/SelectContentCard.jsx';
import codeSenpaiImage from '../../assets/codeSenpai.png';
import medSenpaiImage from '../../assets/medSenpai.png';
import mathSenpaiImage from '../../assets/mathSenpai.png';
import gymSenpaiImage from '../../assets/gymSenpai.png';
import PopUpMissingContent from '../../popups/popUpMissingContent/PopUpMissingContent.jsx';

/**
 * SelectLearningContent Component
 * 
 * This component displays a selection of learning platforms for users to choose from.
 * It includes cards for each platform and a popup for unavailable content.
 */
function SelectLearningContent() {
    const [isPopUpMissingContentVisible, setPopUpMissingContentVisible] = useState(false);

    // Function to show the missing content popup
    const showPopUpMissingContent = () => {
        setPopUpMissingContentVisible(true);
    };

    // Function to hide the missing content popup
    const hidePopUpMissingContent = () => {
        setPopUpMissingContentVisible(false);
    };

    return (
        <>
            <div className={styles.backgroundContainer}>
                <div className={styles.h1}>Wähle eine Lernplattform</div>
                <div className={styles.cardsGridContainer}>
                    <SelectContentCard buttonText="Code Senpai" imageUrl={codeSenpaiImage}
                        linkTo="/select/code" modalHeader="Code Senpai" modalText="Teste dein Wissen rund um das Thema Programmieren und trete in spannenden Wettkämpfen gegen andere Spieler an." />

                    <SelectContentCard buttonText="Med Senpai" imageUrl={medSenpaiImage} 
                        linkTo="#" handleClick={showPopUpMissingContent}
                        modalHeader="Med Senpai" modalText="Teste dein Wissen rund um das Thema Medizin und trete in spannenden Wettkämpfen gegen andere Spieler an." />

                    <SelectContentCard buttonText="Math Senpai" imageUrl={mathSenpaiImage} 
                        linkTo="#" handleClick={showPopUpMissingContent}
                        modalHeader="Math Senpai" modalText="Teste dein Wissen rund um das Thema Mathematik und trete in spannenden Wettkämpfen gegen andere Spieler an." />

                    <SelectContentCard buttonText="Gym Senpai" imageUrl={gymSenpaiImage} 
                        linkTo="#" handleClick={showPopUpMissingContent}
                        modalHeader="Gym Senpai" modalText="Teste dein Wissen rund um das Thema Fitness und trete in spannenden Wettkämpfen gegen andere Spieler an." />
                </div>
                <PopUpMissingContent isVisible={isPopUpMissingContentVisible} closePopUp={hidePopUpMissingContent}/>
            </div>
        </>
    );
}

export default SelectLearningContent;
