import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/WalletDetailsStyles.css';


const WalletDetails = ({ address }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!address) {
                setError("There is no wallet selected. Go to New Transaction and select one");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:4000/api/wallet/get_balance_and_transactions/${address}`);
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.error('Error fetching wallet details:', response.status);
                }
            } catch (error) {
                console.error('Error fetching wallet details:', error);
                setError("Hubo un error al obtener los detalles de la wallet. Por favor, intente nuevamente más tarde.");
            }
        };

        fetchData();
    }, [address]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }
    
    if (!data) {
        return <div className="loading-message">Loading...</div>;
    }

    const balanceInXrp = data.balance;

    return (
        <div className="wallet-details-container">
            <h1>{address}</h1>
            <p>Balance: {balanceInXrp} XRP</p>
            
            {data.transactions.map((tx, index) => (
                <div key={index} className="transaction-item">
                    <p>Date: {tx.fecha}</p>
                    <p>Type: {tx.tipo}</p>
                    <p>Hash: {tx.hash}</p>
                    <p>Fee: {tx.fee}</p>
                    <p>Quantity: {tx.cantidad} XRP</p>
                    <p>Shipping wallet: {tx.walletEnvio}</p>
                    <p>Wallet received: {tx.walletRecibido}</p>
                </div>
            ))}
        </div>
    );
};

export default WalletDetails;
