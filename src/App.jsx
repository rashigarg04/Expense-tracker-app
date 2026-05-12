import { useState, useEffect } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SummaryPanel from './components/SummaryPanel'
import CurrencyConverter from './components/CurrencyConverter'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState(() => {
    // Check local storage on load so we don't lose data when the page refreshes
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  // Keep local storage in sync whenever the expenses list changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    // Using Date.now() for a simple unique ID instead of pulling in a heavy library like uuid
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const totalAmount = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);

  return (
    <div className="container animate-fade-in">
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <img
          src="/marketing_mojito_logo.png"
          alt="Marketing Mojito Logo"
          style={{ width: '120px', marginBottom: '1rem' }}
        />
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>Expense Tracker</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Marketing Mojito Technical Assignment</p>
      </header>

      <main className="dashboard-grid">
        <div className="left-column">
          <ExpenseForm onAddExpense={addExpense} />
          <SummaryPanel expenses={expenses} totalAmount={totalAmount} />
        </div>

        <div className="right-column">
          <CurrencyConverter totalAmount={totalAmount} />
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
        </div>
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
        <p>&copy; {new Date().getFullYear()} Expense Tracker</p>
        <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>
          Developed with ❤️ by <span style={{ color: 'var(--primary)', fontWeight: '600' }}>RASHI</span>
        </p>
      </footer>
    </div>
  )
}

export default App
