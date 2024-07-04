import React, { createContext, useState } from 'react';

// Create a context for manipulation questions
export const ManipulationPlayerContext = createContext();

/**
 * ManipulationPlayerProvider Component
 * 
 * This component provides the ManipulationPlayerContext to its child components.
 * It manages the state for the manipulation question and provides a way to update it.
 */
export const ManipulationPlayerProvider = ({ children }) => {
  
  // State to hold the current manipulation question
  const [manipulationQuestion, setManipulationQuestion] = useState(null);

  return (
      // Provide the manipulationQuestion state and setManipulationQuestion function to children
      <ManipulationPlayerContext.Provider value={{ manipulationQuestion, setManipulationQuestion }}>
        {children}
      </ManipulationPlayerContext.Provider>
  );
};
