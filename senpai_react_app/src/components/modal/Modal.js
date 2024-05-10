import styles from './Modal.module.css';
import React, { useState } from "react";

function Modal({header, text}){

    const [modal, setModal] = useState(false);

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