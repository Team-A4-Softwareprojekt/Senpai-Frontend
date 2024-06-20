import React, { useState } from 'react';
import styles from './SelectLearningContent.module.css';
import SelectContentCard from '../../components/selectContentCard/SelectContentCard';
import codeSenpaiImage from '../../assets/codeSenpai.jpg';
import medSenpaiImage from '../../assets/medSenpai.png';
import mathSenpaiImage from '../../assets/mathSenpai.png';
import gymSenpaiImage from '../../assets/gymSenpai.png';
import PopUpMissingContent from '../../components/popUpMissingContent/PopUpMissingContent.jsx';

function SelectLearningContent() {
    const [isPopUpMissingContentVisible, setPopUpMissingContentVisible] = useState(false);

    const showPopUpMissingContent = () => {
        setPopUpMissingContentVisible(true);
    };

    const hidePopUpMissingContent = () => {
        setPopUpMissingContentVisible(false);
    };

    return (
        <>
            <div>
                <h1 className={styles.h1}>Choose your learning content</h1>
            </div>
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
        </>
    );
}

export default SelectLearningContent;
