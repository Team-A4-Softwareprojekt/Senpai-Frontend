import React, { useState } from 'react';
import styles from './Slide.module.css';

/**
 * Slide Component
 * 
 * This component is responsible for displaying a series of slides.
 * Each slide contains a header, an optional image, and some text.
 * Users can navigate between slides using navigation dots.
 */
function Slide({ slides }) {

    // State to keep track of the current slide index
    const [currentSlide, setCurrentSlide] = useState(0);

    // Function to navigate to a specific slide by index
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className={styles.slideContainer}>
            <div className={styles.headerText}>{slides[currentSlide].header}</div>
            {slides[currentSlide].image && (
                <img src={slides[currentSlide].image} alt={slides[currentSlide].header} className={styles.image} />
            )}
            <div className={styles.textContainer}>
                {slides[currentSlide].text}
            </div>
            {slides.length > 1 && (
                <div className={styles.navigationDots}>
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.dot} ${currentSlide === index ? styles.active : ''}`}
                            onClick={() => goToSlide(index)}
                        ></span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Slide;
