import React, { useState } from 'react';
import styles from './Slide.module.css';

function Slide({ slides }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className={styles.slideContainer}>
            <h2>{slides[currentSlide].header}</h2>
            <img src={slides[currentSlide].image} alt={slides[currentSlide].header} className={styles.image} />
            <p>{slides[currentSlide].text}</p>
            <div className={styles.navigationDots}>
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.dot} ${currentSlide === index ? styles.active : ''}`}
                        onClick={() => goToSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default Slide;