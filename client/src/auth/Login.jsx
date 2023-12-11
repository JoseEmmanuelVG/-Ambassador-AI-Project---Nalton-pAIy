import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/login', { username, password });
            window.location.reload(); 
            navigate('/transactions');
            if (response.data.token) {
                localStorage.setItem('jwtToken', response.data.token);
                localStorage.setItem('jwtToken', response.data.token);
                console.log("Token stored:", localStorage.getItem('jwtToken'));
            }            
        
        } catch (error) {
            console.error("Error en el inicio de sesión:", error.response.data.message);
            setErrorMessage(error.response.data.message);
            
        }
        const token = localStorage.getItem('jwtToken');
            if (token) {
            console.log("Token exists in local storage:", token);
            } else {
            console.log("Token does not exist in local storage.");
            }
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {
                    errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>
                }
                <button type="submit">Iniciar sesión</button>
            </form>
            <p>¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
        </div>
    );
}

export default Login;
