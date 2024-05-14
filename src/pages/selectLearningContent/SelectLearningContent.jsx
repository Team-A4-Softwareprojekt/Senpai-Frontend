import styles from '../General.module.css';
import styles2 from './SelectLearningContent.module.css';
import SelectCard from '../../components/selectCard/SelectCard';
import codeSenpaiImage from '../../assets/codeSenpai.jpg';
import medSenpaiImage from '../../assets/medSenpai.jpg';
import mathSenpaiImage from '../../assets/mathSenpai.jpg';
import gymSenpaiImage from '../../assets/gymSenpai.jpg';

function SelectLearningContent(){
    return(
        <>
        <div>
            <h1>Choose your learning content</h1>
        </div>
        <div className={styles2.cardsGridContainer}>
                <SelectCard buttonText="Code Senpai" imageUrl={codeSenpaiImage}
                    linkTo="/select/code" modalHeader="Code Senpai" modalText="This is the place where u can learn to code" />

                <SelectCard buttonText="Med Senpai" imageUrl={medSenpaiImage} linkTo="*"
                    modalHeader="Med Senpai" modalText="This is the place where u can learn med related topics" />

                <SelectCard buttonText="Math Senpai" imageUrl={mathSenpaiImage} linkTo="*"
                    modalHeader="Math Senpai" modalText="This is the place where u can learn Math" />

                <SelectCard buttonText="Gym Senpai" imageUrl={gymSenpaiImage} linkTo="*"
                    modalHeader="Gym Senpai" modalText="This is the place where u can learn everything about keeping yourself in shape" />
            </div>
            </>
    ); 
}
export default SelectLearningContent;