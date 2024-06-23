import React from 'react';
import styles from './PopUpExercise.module.css';
import ExerciseCard from '../../components/exerciseCard/ExerciseCard.jsx';

const PopUpExercise = ({ closePopUp, isVisible }) => {
    return (
        isVisible && (
            <>
            <div className={styles.overlay}></div>
            <div className={styles.popupContainer}>
                <p className={styles.descriptionText}>Dies ist eine Vorschau:</p>
                <div className={styles.exercisesDiv}>
                    <p className={styles.exercisesHeader}>Exercises</p>
                    <input className={styles.searchInput} type="text" placeholder="Search exercise"/>
                    <div className={styles.exerciseList}>
                        <ExerciseCard 
                            exerciseName="Java: Classes 1"
                            exerciseStatus="Finished"
                        />
                        <ExerciseCard 
                            exerciseName="Java: Inheritance 1"
                            exerciseStatus="Pending" 
                        />
                        <ExerciseCard 
                            exerciseName="Java: Polymorphism 2"
                            exerciseStatus="Unfinished"
                        />
                        <ExerciseCard
                            exerciseName="Java: Arrays 3"
                            exerciseStatus="Finished"
                        />
                        <ExerciseCard 
                            exerciseName="Java: Generics 1"
                            exerciseStatus="Unfinished"
                        />
                        <ExerciseCard 
                            exerciseName="Java: Singleton Pattern 1"
                            exerciseStatus="Pending"
                        />   
                    </div>
                </div>
                <button className={styles.closeButton} onClick={closePopUp}>Close</button>
            </div>
            </>
        )
    );
};

export default PopUpExercise;
