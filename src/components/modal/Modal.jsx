import styles from './Modal.module.css';
import React, { useState } from "react";

/*
This is a basic modal component that holds text and a close button
The header and text parameters are set when the component is initialized
*/
function Modal({header, text}){

    // Modal is a boolean and setModal is the setter function for the boolean
    const [modal, setModal] = useState(false);

    // Simple toggle function that sets the boolean to the opposite when called
    const toggleModal = () => {
        setModal(!modal)
    }

    return(
        <div>
            <button onClick={toggleModal} className= {styles.button}>
                ?
            </button>
            {modal && (
                <div className= {styles.modal} >
                
                    <div onClick= {toggleModal} className= {styles.overlay}></div>
                        <div className= {styles.content}>
                        <h2>{header}</h2>
                        <p>{text}</p>
                        <button className= {styles.button} onClick= {toggleModal} >Close</button>
                    </div>
                </div>   
            )}
            
        </div>
    );
}
export default Modal;