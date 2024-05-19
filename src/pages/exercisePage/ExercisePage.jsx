import styles from '../General.module.css';
import styles2 from './ExercisePage.module.css';
import ExerciseCard from '../../components/exerciseCard/ExerciseCard.jsx';
import React from 'react';
import HomeButton from '../../components/homeButton/HomeButton';
import AccountButton from '../../components/accountButton/AccountButton';

import { useNavigate } from 'react-router-dom';

function ExercisePage() {

    const navigate = useNavigate();
    
    const handleHomeClick = () => {
        navigate('/select');
    };

    const handleAccountClick = () => {
        navigate('/account');
    };

    return (
        <>
        <HomeButton handleClick={handleHomeClick} />
        <AccountButton handleClick={handleAccountClick} />

        <div className={styles2.exercisesDiv}>
                <p className={styles2.exercisesHeader}>Exercises</p>
                <input className={styles2.searchInput} type="text" placeholder="Search exercise"/>
             
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