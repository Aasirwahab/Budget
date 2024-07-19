import React from 'react';
import AppNavigation from '../components/navigation/appNavigation';
import { ExpensesProvider } from '../components/ExpensesContext';

export default function App() {
  return (
    <ExpensesProvider>
      <AppNavigation />
    </ExpensesProvider>
  );
}