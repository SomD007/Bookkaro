import { useState } from 'react';
//import StudentDataDisplay from './LoginPage.jsx'
import Homepage from './pages/home.jsx'; //
import About from './pages/About.jsx'; //
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; //
import Layout from './pages/layout.jsx';
//import LoginSignup from './pages/LoginSignup.jsx';


function App(){
    const [name, setName] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/send-name', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        const data = await res.json();
        setResponse(data.message);
    };

    return(/*
        <div>
            <h1>React + Express</h1>

            <form onSubmit={handleSubmit}>

                
                <input type="text" value={name} placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
                <button type="submit">Send</button>

            </form>

            {response && <p>{response}</p>} 

            
            

            
        </div>
*/

        
        <div>
            <Layout />
        </div>
        

        
    );
}

export default App;