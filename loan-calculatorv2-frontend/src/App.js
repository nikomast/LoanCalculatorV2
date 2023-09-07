import React, { useState } from 'react';
import axios from 'axios';

function LoanCalculator() {
  const [loans, setLoans] = useState([
    { owner: '', amount: '', interest: '', minimum_payment: '', cost: '', fine: '' }
  ]);

  const [monthlyPayment, setMonthlyPayment] = useState('');

  const addLoan = () => {
    const newLoan = { owner: '', amount: '', interest: '', minimum_payment: '', cost: '', fine: '' };
    setLoans([...loans, newLoan]);
  };

  const removeLoan = (indexToRemove) => {
    const filteredLoans = loans.filter((_, idx) => idx !== indexToRemove);
    setLoans(filteredLoans);
  };

  const handleSubmit = () => {
    // When form is submitted, make an API call (for example, using Axios)
    axios.post('/api/calculate', { loans, monthlyPayment })
      .then(response => {
        // Handle the response here
      });
  };

  return (
    <div>
      {loans.map((_, idx) => (
        <div key={idx} className="loan-entry">
          {/* Your input fields here */}
          <input
            type="text"
            placeholder="Owner"
            onChange={e => {
              const newList = [...loans];
              newList[idx].owner = e.target.value;
              setLoans(newList);
            }}
            required
          />
              {<input
              type="text"
              placeholder="Amount"
              onChange={e => {
                  const newList = [...loans];
                  newList[idx].owner = e.target.value;
                  setLoans(newList);
              }}
              required
              />}
              {<input
              type="text"
              placeholder="Interest"
              onChange={e => {
                  const newList = [...loans];
                  newList[idx].owner = e.target.value;
                  setLoans(newList);
              }}
              required
              />}
              {<input
              type="text"
              placeholder="Minimum payment"
              onChange={e => {
                  const newList = [...loans];
                  newList[idx].owner = e.target.value;
                  setLoans(newList);
              }}
              required
              />}
              {<input
              type="text"
              placeholder="Cost"
              onChange={e => {
                const newList = [...loans];
                newList[idx].owner = e.target.value;
                setLoans(newList);
              }}
              required
              />}
              {<input
              type="text"
              placeholder="Fine"
              onChange={e => {
                const newList = [...loans];
                newList[idx].owner = e.target.value;
                setLoans(newList);
              }}
              required
              />}
          <button onClick={addLoan}>Add Loan</button>
          <button onClick={() => removeLoan(idx)}>Remove</button>
        </div>
      ))}
        <div>
        <label>Monthly loan amortization budget: </label>
        <input
          type="number"
          placeholder=""
          value={monthlyPayment}
          onChange={e => setMonthlyPayment(e.target.value)}
        />
      <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default LoanCalculator;