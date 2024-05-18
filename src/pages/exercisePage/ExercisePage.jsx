import styles from '../General.module.css';
import styles2 from './ExercisePage.module.css';
import ExerciseCard from '../../components/exerciseCard/ExerciseCard.jsx';
import accountIcon from '../../assets/accountIcon.png';

import { useNavigate } from 'react-router-dom';

function ExercisePage() {

    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/account');
    };

    return (
        <>
        <div className={styles2.accountButtonContainer}>
                <button className={styles2.accountButton} onClick={handleClick}>
                    Account
                    <img className={styles2.accountIcon} src={accountIcon} alt="Account Icon" />
                </button>
            </div>
            
        <div className={styles2.exercisesDiv}>
            <div className= {styles2.userDiv}>
                <p>Exercises</p>
                <input type="text" placeholder="Search exercise"/>  
                
            </div>
            
            <div className={styles2.exerciseList}>
                
                <ExerciseCard 
                    exerciseName = "Java: Classes 1"
                    exerciseStatus = "Finished"
                />
                <ExerciseCard 
                    exerciseName = "Java: Inheritance 1"
                    exerciseStatus = "Finished" 
                />
                <ExerciseCard 
                    exerciseName = "Java: Polymorphism 2"
                    exerciseStatus = "Unfinished"  
                />
                <ExerciseCard
                    exerciseName = "Java: Arrays 3"
                    exerciseStatus = "Finished" 
                />
                <ExerciseCard 
                    exerciseName = "Java: Generics 1"
                    exerciseStatus = "Unfinished" 
                />
                <ExerciseCard 
                    exerciseName = "Java: Singleton Pattern 1"
                    exerciseStatus = "Unfinished"
                />   
            </div>
        </div>
        </>
    );
}
export default ExercisePage;