import styles from '../General.module.css';
import styles2 from './CodeBattlePage.module.css';
import SelectCard from '../../components/selectCard/SelectCard.jsx';
import buzzerImg from '../../assets/buzzer.png';
import manipulationImg from '../../assets/manipulation.png';
import limitationImg from '../../assets/limitation.png';
import accountIcon from '../../assets/accountIcon.png';

import { useNavigate } from 'react-router-dom';

/*
This is the code battle page that holds an account button, amount of lives and three different
game modes to choose from. Each game mode has a modal with the basic explanation of the mode
*/
function codeBattlePage() {

    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/account');
    };

    return( 
        <div>
            <h1>
                Choose your battle
            </h1>
            <div className= {styles2.cardsGridContainer}>      
                <SelectCard buttonText= "Buzzer" imageUrl={buzzerImg} linkTo={"*"}
                    modalHeader= "Buzzer" 
                    modalText = "Compete against another player. Answer questions by pressing a buzzer in a limited time."
                    className= {styles2.selectCard}/>
                <SelectCard buttonText= "Manipulation" imageUrl={manipulationImg} linkTo={"*"}
                    modalHeader = "Manipulation" 
                    modalText = "Compete against another player. Manipulate given Code or fix manipulated Code in a limited time."
                    className= {styles2.selectCard}/>
                <SelectCard buttonText= "Limitation" imageUrl={limitationImg} linkTo={"*"}
                    modalHeader= "Limitation" 
                    modalText= "Compete with a partner against another team. Each one of you only has a restricted input for solving the problem in a limited time."
                    className= {styles2.selectCard}/>
            </div>
            <div className= {styles2.accountButtonContainer}>
                <button className= {styles.button01} onClick={handleClick}>
                    Account
                    <img className= {styles2.accountIcon} src= {accountIcon} alt= "0"></img>
                </button>
                
            </div>
            
        </div>
        
    );
}
export default codeBattlePage;