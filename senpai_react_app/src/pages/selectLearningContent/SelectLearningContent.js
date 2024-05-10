import styles from '../General.module.css';
import styles2 from './SelectLearningContent.module.css';
import SelectCard from '../../components/selectCard/SelectCard';
import codeSenpaiImage from '../../assets/codeSenpai.jpg';
import medSenpaiImage from '../../assets/medSenpai.jpg';
import mathSenpaiImage from '../../assets/mathSenpai.jpg';
import gymSenpaiImage from '../../assets/gymSenpai.jpg';

function SelectLearningContent(){
    return(
        <div className= {styles2.cardsGridContainer}> 
            <SelectCard buttonText= "Code Senpai" imageUrl= {codeSenpaiImage} linkTo= "/CodeSenpaiPage"/>
            <SelectCard buttonText= "Med Senpai" imageUrl= {medSenpaiImage} linkTo= "*"/>
            <SelectCard buttonText= "Math Senpai" imageUrl= {mathSenpaiImage} linkTo= "*"/>
            <SelectCard buttonText= "Gym Senpai" imageUrl= {gymSenpaiImage} linkTo= "*"/>
        </div>
    ); 
}
export default SelectLearningContent;