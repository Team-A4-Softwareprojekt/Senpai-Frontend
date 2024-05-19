import styles2 from './ExerciseTaskPage.module.css';
import React, { useState } from 'react';
import HomeButton from '../../components/homeButton/HomeButton';
import AccountButton from '../../components/accountButton/AccountButton';
import { useNavigate, useParams } from 'react-router-dom';


function ExerciseTaskPage() {
    
        const navigate = useNavigate();
        const { exerciseName } = useParams();
        const [solution, setSolution] = useState('');
        
        const handleHomeClick = () => {
            navigate('/select');
        };
    
        const handleAccountClick = () => {
            navigate('/account');
        };

        const handleSolutionChange = (event) => {
            setSolution(event.target.value);
        };

        const handleSubmit = () => {
            // Handle the solution submission logic here
            console.log('Submitted solution:', solution);
        };
    
        return (
            <>
            <HomeButton handleClick={handleHomeClick} />
            <AccountButton handleClick={handleAccountClick} />

            <div>
                <h1>{exerciseName}</h1>
            </div>
            <div className={styles2.taskSection}>
                <h2>Task</h2>
                <div className={styles2.taskContent}>
                    {/* Content for the task goes here */}
                </div>
            </div>
            <div className={styles2.solutionSection}>
                    <h2>Solution</h2>
                    <textarea 
                        className={styles2.solutionInput} 
                        value={solution} 
                        onChange={handleSolutionChange}
                    />
                    <button 
                        className={styles2.submitButton} 
                        onClick={handleSubmit}
                    >
                        Send
                    </button>
                </div>
           
            </>
        );
}
export default ExerciseTaskPage;