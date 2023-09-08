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
    // When form is submitted, make an API call (for example, using Axios)
    axios.post('http://127.0.0.1:5000/api/calculate', { loans, monthlyPayment })
      .then(response => {
        const imgUrl =response.data;
        window.open(imgUrl, "_blank");
      });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '50px auto', padding: '10px', background: '#fff', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
    <h2 style={{ textAlign: 'center' }}>Loan Calculator</h2>
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
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <label className="Payment-Text">Monthly budget: </label>
        <input
          type="number"
          placeholder=""
          value={monthlyPayment}
          onChange={e => setMonthlyPayment(e.target.value)}
        />
      <button onClick={handleSubmit}>Submit</button>
</div>
<div className='frame'>
<h2 style={{ textAlign: 'center' }}>Tässä pitäisi olla kuva</h2>
</div>
    </div>
  );
}

export default App;
