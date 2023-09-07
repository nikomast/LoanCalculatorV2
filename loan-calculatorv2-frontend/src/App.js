import React, { useState } from 'react';
import './App.css';

function App() {
    const [loans, setLoans] = useState([{}]);
    const [payment, setPayment] = useState("");

    const addLoan = () => {
        setLoans([...loans, {}]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loans, payment);

        // You can send the loans and payment data to your backend API here...
    };

    return (
        <div className="App">
            <h2>Loan Calculator</h2>
            <form onSubmit={handleSubmit}>
                {loans.map((_, idx) => (
                    <div key={idx} className="loan-entry">
                        <input
                            type="text"
                            placeholder="Owner e.g., Bank A"
                            onChange={e => {
                                const newList = [...loans];
                                newList[idx].owner = e.target.value;
                                setLoans(newList);
                            }}
                            required
                        />
                        {/* Similarly, add other input fields here... */}
                    </div>
                ))}
                <button type="button" onClick={addLoan}>Add Loan</button>
                <input
                    type="text"
                    placeholder="Enter monthly payment"
                    value={payment}
                    onChange={e => setPayment(e.target.value)}
                    required
                />
                <button type="submit">Calculate</button>
            </form>
        </div>
    );
}

export default App;

