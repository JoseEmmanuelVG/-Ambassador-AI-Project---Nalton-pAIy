import React, { useState } from 'react';
import axios from 'axios';

const LocalWalletModal = ({ onClose, mode = "create", currentWallet = {} }) => {
  const [name, setName] = useState(mode === "edit" && currentWallet ? currentWallet.name || '' : '');
  const [address, setAddress] = useState(mode === "edit" && currentWallet ? currentWallet.address || '' : '');
  const [secretKey, setSecretKey] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
     if (mode === "edit") {
        try {
            const response = await axios.put(`http://localhost:4000/api/wallet/update_wallet/${currentWallet._id}`, { name, address, secretKey });
            if (response.data.message === 'Wallet updated successfully!') {
                console.log('Wallet updated!');
            } else {
                console.error('Error updating wallet.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } 
    else {
      try {
        const response = await axios.post('http://localhost:4000/api/wallet/save_wallet', { name, address, secretKey });
        if (response.data.message === 'Wallet saved successfully!') {
          console.log('Wallet saved!');
          onClose();
        } else {
          console.error('Error saving wallet.');
        }
      } catch (error) {
        console.error('Error:', error);
      }    }
    onClose();
  };

  return (
<div className="modal-container">
  <div className="modal-content">
      <form onSubmit={handleSubmit}>
      <h2>{mode === "create" ? "Create New Wallet" : "Edit Wallet"}</h2>
        <div>
          <label>Name: </label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Address: </label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>Secret Key: </label>
          <input type="password" value={secretKey} onChange={e => setSecretKey(e.target.value)} required />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
      <button className="close-button" onClick={onClose}>&times;</button> {}
    </div>
  </div>
  );
};
export default LocalWalletModal;