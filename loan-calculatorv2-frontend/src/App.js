import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [loans, setLoans] = useState([
    { owner: '', amount: '', interest: '', minimum_payment: '', cost: '0', fine: '' }
  ]);

  const [monthlyPayment, setMonthlyPayment] = useState('');

  const addLoan = () => {
    const newLoan = { owner: '', amount: '', interest: '', minimum_payment: '',cost: '0', fine: '' };
    setLoans([...loans, newLoan]);
  };

  const removeLoan = (indexToRemove) => {
    const filteredLoans = loans.filter((_, idx) => idx !== indexToRemove);
    setLoans(filteredLoans);
  };

  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = () => {
    for (let loan of loans) {
      if (!loan.owner || !loan.amount || !loan.interest || !loan.minimum_payment || !loan.fine) {
          alert("Please fill in all the fields before submitting.");
          return;
      }
  }

  // Check if the monthlyPayment field is empty
  if (!monthlyPayment) {
      alert("Please fill in the monthly payment before submitting.");
      return;
  }
    axios.post('http://127.0.0.1:5000/api/calculate', { loans, monthlyPayment })
      .then(response => {
        const imageUrlWithTimestamp = `${response.data.imageUrl}?timestamp=${new Date().getTime()}`;
        setImageUrl(imageUrlWithTimestamp);
        //window.open(response.data.imageUrl, "_blank");
      });
  };

  return (
    <div className="container">
    <h2 className="center-text">Loan_Calculator</h2>
      {loans.map((_, idx) => (
        <div key={idx} className="loan-entry">
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
                  newList[idx].amount = e.target.value;
                  setLoans(newList);
              }}
              required
              />}
              {<input
              type="text"
              placeholder="Interest"
              onChange={e => {
                  const newList = [...loans];
                  newList[idx].interest = e.target.value;
                  setLoans(newList);
              }}
              required
              />}
              {<input
              type="text"
              placeholder="Minimum payment"
              onChange={e => {
                  const newList = [...loans];
                  newList[idx].minimum_payment = e.target.value;
                  setLoans(newList);
              }}
              required
              />}
              {<input
              type="text"
              placeholder="Fine"
              onChange={e => {
                const newList = [...loans];
                newList[idx].fine = e.target.value;
                setLoans(newList);
              }}
              required
              />}
          <button onClick={() => removeLoan(idx)}>Remove</button>
        </div>
      ))}
      <button onClick={addLoan}>Add Loan</button>
      <div className="center-container">
        <label className="Payment-Text">Monthly payment sum: </label>
        <input
          type="number"
          className="budget-input"
          placeholder=""
          value={monthlyPayment}
          onChange={e => setMonthlyPayment(e.target.value)}
          />
      <button onClick={handleSubmit}>Submit</button>
</div>
<div className='frame'>
{imageUrl ? <img src={imageUrl} alt="Calculated graph" /> : ""}
</div>
    </div>
  );
}

export default App;
