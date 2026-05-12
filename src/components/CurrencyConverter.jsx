import { useState, useEffect } from 'react'

function CurrencyConverter({ totalAmount }) {
  const [targetCurrency, setTargetCurrency] = useState('EUR')
  const [convertedAmount, setConvertedAmount] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [rates, setRates] = useState({})

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD', 'JPY']

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true)
      setError(null)
      try {
        // I chose the Frankfurter API because it's open-source, fast, and 
        // doesn't require an API key—perfect for a project like this.
        const response = await fetch(`https://api.frankfurter.app/latest?from=USD`)
        if (!response.ok) throw new Error('Failed to fetch exchange rates')
        const data = await response.json()
        setRates(data.rates)
      } catch (err) {
        // Fallback logic: if the API is down, we use these hardcoded rates 
        // so the user experience doesn't break.
        setError('Currency API unavailable. Showing estimated rates.')
        setRates({
          EUR: 0.92,
          GBP: 0.79,
          INR: 83.0,
          CAD: 1.35,
          AUD: 1.52,
          JPY: 150.0
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [])

  useEffect(() => {
    if (targetCurrency === 'USD') {
      setConvertedAmount(totalAmount)
    } else if (rates[targetCurrency]) {
      setConvertedAmount(totalAmount * rates[targetCurrency])
    }
  }, [totalAmount, targetCurrency, rates])

  return (
    <section className="glass-card currency-card">
      <div className="currency-header">
        <h2 style={{ fontSize: '1.1rem' }}>Currency Preview</h2>
        <div className="status-indicator">
          {loading ? (
            <span className="loading-dots">Updating</span>
          ) : error ? (
            <span style={{ color: 'var(--danger)', fontSize: '0.7rem' }}>Offline Mode</span>
          ) : (
            <span style={{ color: 'var(--success)', fontSize: '0.7rem' }}>● Live Rates</span>
          )}
        </div>
      </div>

      <div className="converter-controls">
        <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
          <select 
            value={targetCurrency} 
            onChange={(e) => setTargetCurrency(e.target.value)}
            style={{ width: '100%' }}
          >
            {currencies.map(curr => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
        </div>

        <div className="conversion-result">
          {convertedAmount !== null ? (
            <div className="result-value">
              <span className="symbol">{targetCurrency}</span>
              <span className="value">{convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          ) : (
            <span className="placeholder">---</span>
          )}
        </div>
      </div>
    </section>
  )
}

export default CurrencyConverter
