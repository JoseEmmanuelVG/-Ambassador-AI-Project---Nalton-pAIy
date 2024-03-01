import React, { useState } from 'react';
import axios from 'axios';
import './styles/WalletModalStyles.css';


const DeleteWalletModal = ({ onClose, currentWallet }) => {
    const [secretKey, setSecretKey] = useState('');

    if (!currentWallet) {
        return (
            <div style={{  }}>
                You must select a portfolio to delete.
                <button onClick={onClose}>Cerrar</button>
            </div>
        );
    }

    const handleDelete = async (event) => {
        event.preventDefault();
    
        // Obtener el token JWT del almacenamiento local
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          console.error('No JWT token found. Make sure you are logged in.');
          return;
        }
    
        // Configurar los headers para incluir el token JWT
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            // Axios espera que los datos enviados en la solicitud DELETE estén en la propiedad `data`
            data: { secretKey },
        };
    
        try {
            const response = await axios.delete(`http://localhost:4000/api/wallet/delete_wallet/${currentWallet.name}`, config);
            if (response.data.message === 'Wallet deleted successfully!') {
                console.log('Wallet deleted!');
                alert('Wallet deleted successfully!');
            } else {
                console.error('Error deleting wallet.');
                alert('Error deleting wallet.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Error deleting the wallet: ${error.response?.data?.message || error.message}`);
        }
    
        onClose();
    };
    
    return (
<div className="modal-container">
    <div className="modal-content">
            <form onSubmit={handleDelete}>
                <h2>Delete Billetera</h2>
                <div>Name: {currentWallet.name}</div>
                <div>Address: {currentWallet.address}</div>
                <div>
                    <label>Secret Key: </label>
                    <input type="password" value={secretKey} onChange={e => setSecretKey(e.target.value)} required />
                </div>
                <div>
                    <button type="submit">Delete</button>
                </div>
            </form>
            <button className="close-button" onClick={onClose}>&times;</button> 
    </div>
  </div>
);
};

export default DeleteWalletModal;
