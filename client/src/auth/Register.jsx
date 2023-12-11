import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/user/register', { username, password });
            // Aquí podrías redirigir al usuario a la página de inicio de sesión
            window.location.href = '/login';
            
        } catch (error) {
            console.error("Error al registrarse:", error.response.data.message);
            setErrorMessage(error.response.data.message);
        }
        if (!username || !password) {
            setErrorMessage("El nombre de usuario y la contraseña son obligatorios.");
            return;
        }
 };

    return (
        <div>
            <h2>Registrarse</h2>
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
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;
