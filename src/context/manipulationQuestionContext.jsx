// context/manipulationQuestionContext.jsx
import React, { createContext, useState } from 'react';

export const ManipulationPlayerContext = createContext();

export const ManipulationPlayerProvider = ({ children }) => {
  const [manipulationQuestion, setManipulationQuestion] = useState(null);

  return (
    <ManipulationPlayerContext.Provider value={{ manipulationQuestion, setManipulationQuestion }}>
      {children}
    </ManipulationPlayerContext.Provider>
  );
};
