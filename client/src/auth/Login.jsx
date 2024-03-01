import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginStyles.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Aplica el estilo al body cuando el componente se monta
        document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/JoseEmmanuelVG/Nalton-pAIy/main/images/BackGround.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
    
        // Revierte el estilo cuando el componente se desmonta
        return () => {
            document.body.style.background = ""; // Restablece el fondo a un estado predeterminado o vacío
        };
    }, []);
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/login', { username, password });
            window.location.reload(); 
            navigate('/transactions');
            if (response.data.token) {
                localStorage.setItem('jwtToken', response.data.token);
                localStorage.setItem('userId', response.data.userId); // save user id in local storage
                console.log("Token stored:", localStorage.getItem('jwtToken'));
            }            
        
        } catch (error) {
            console.error("Login error:", error.response.data.message);
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
        <div className="login-container">
            <h1>NALTON pAIy APP</h1>        
        <h2>Login</h2>
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
                {
                    errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>
                }
                <button type="submit">Login</button>
            </form> 
            <p>Don't have an account? <a href="/register">Register</a></p> 
            <footer>
                Empowering seamless financial interactions through Azure AI & cryptocurrencies - starts with XRP- 
            </footer> 
        </div>
    );
}

export default Login;

