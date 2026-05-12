function ExpenseList({ expenses, onDeleteExpense }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Food': return '🍔';
      case 'Travel': return '✈️';
      case 'Marketing': return '📈';
      case 'Utilities': return '💡';
      default: return '📦';
    }
  }

  return (
    <section className="glass-card" style={{ flex: 1 }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Recent Expenses</h2>
      
      {expenses.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
          No expenses yet. Start by adding one!
        </p>
      ) : (
        <div className="expense-list">
          {expenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <div className="expense-info">
                <span className="category-icon">{getCategoryIcon(expense.category)}</span>
                <div>
                  <h3>{expense.name}</h3>
                  <p>{expense.category}</p>
                </div>
              </div>
              <div className="expense-actions">
                <span className="amount">${expense.amount.toFixed(2)}</span>
                <button 
                  className="delete-btn" 
                  onClick={() => onDeleteExpense(expense.id)}
                  title="Delete expense"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ExpenseList
