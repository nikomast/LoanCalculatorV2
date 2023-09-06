import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
      const fetchMessage = async () => {
        try {
            const response = await axios.get('http://localhost:5000/hello');
            setMessage(response.data);
            console.log("Set message:", response.data);
        } catch (error) {
            console.error("Error fetching message:", error);
        }
    }; 
        fetchMessage();
    }, []);

    return (
      <div className="App" key={message}>
          <h1>{message}</h1>
      </div>
  );
  
}

export default App;

