import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = [];

// Create context
const ExpensesContext = createContext();

// Reducer function
const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.payload];
    default:
      return state;
  }
};

// Context provider component
export const ExpensesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expensesReducer, initialState);

  return (
    <ExpensesContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpensesContext.Provider>
  );
};

// Custom hook to use the ExpensesContext
export const useExpenses = () => {
  return useContext(ExpensesContext);
};
