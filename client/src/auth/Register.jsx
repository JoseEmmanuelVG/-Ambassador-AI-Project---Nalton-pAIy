import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterStyles.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/user/register', { username, password });
            navigate('/login');
        } catch (error) {
            console.error("Error when registering:", error.response.data.message);
            setErrorMessage(error.response.data.message);
        }
        if (!username || !password) {
            setErrorMessage("Username and password are required.");
            return;
        }
    };

 return (
    <div className="register-container"> {/* Usando la clase contenedora */}
    <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="User"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button type="submit">Register</button>
            {/* Botón para regresar a la página de login */}
            <button type="button" onClick={() => navigate('/login')}>Back to Login</button>
        </form>
    </div>
);
}

export default Register;
