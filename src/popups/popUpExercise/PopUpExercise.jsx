import React from 'react';
import styles from './PopUpExercise.module.css';
import ExerciseCard from '../../cards/exerciseCard/ExerciseCard.jsx';

/**
 * PopUpExercise Component
 * 
 * This component renders a popup that displays a list of exercise cards.
 * It includes a search input for filtering exercises and a close button.
 * 
 * Props:
 * - `closePopUp`: Function to close the popup.
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 */
const PopUpExercise = ({ closePopUp, isVisible }) => {
    return (
        isVisible && (
            <>
            <div className={styles.overlay}></div>
            <div className={styles.popupContainer}>
                <p className={styles.descriptionText}>Dies ist eine Vorschau:</p>
                <div className={styles.exercisesDiv}>
                    <p className={styles.exercisesHeader}>Exercises</p>
                    <input className={styles.searchInput} type="text" placeholder="Exercise suchen"/>
                    <div className={styles.exerciseList}>
                        <ExerciseCard 
                            exerciseName="Java: Klassen 1"
                            exerciseStatus="Abgeschlossen"
                        />
                        <ExerciseCard 
                            exerciseName="Java: Vererbung 1"
                            exerciseStatus="In Bearbeitung" 
                        />
                        <ExerciseCard 
                            exerciseName="Java: Polymorphie 2"
                            exerciseStatus="Nicht begonnen"
                        />
                        <ExerciseCard
                            exerciseName="Java: Arrays 3"
                            exerciseStatus="Abgeschlossen"
                        />
                        <ExerciseCard 
                            exerciseName="Java: Generics 1"
                            exerciseStatus="Nicht begonnen"
                        />
                        <ExerciseCard 
                            exerciseName="Java: Singleton Pattern 1"
                            exerciseStatus="In Bearbeitung"
                        />   
                    </div>
                </div>
                <button className={styles.closeButton} onClick={closePopUp}>Schließen</button>
            </div>
            </>
        )
    );
};

export default PopUpExercise;
