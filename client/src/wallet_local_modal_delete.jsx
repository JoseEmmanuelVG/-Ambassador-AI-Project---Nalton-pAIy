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
        try {
            const response = await axios.delete(`http://localhost:4000/api/wallet/delete_wallet/${currentWallet.name}`, { data: { secretKey } });
            if (response.data.message === 'Wallet deleted successfully!') {
                console.log('Wallet deleted!');
            } else {
                console.error('Error deleting wallet.');
            }
        } catch (error) {
            console.error('Error:', error);
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
