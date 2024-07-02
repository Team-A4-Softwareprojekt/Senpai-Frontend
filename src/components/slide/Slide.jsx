import React, { useState } from 'react';
import styles from './Slide.module.css';

function Slide({ slides }) {
    const [currentSlide, setCurrentSlide] = useState(0);

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
