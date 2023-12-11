import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import WalletContext from './WalletContext';
import './styles/TransactionSummaryStyles.css';


const TransactionSummary = ({ destination, currency, amount, gas, submitTransaction }) => {
  const { selectedWallet } = useContext(WalletContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [transactionSent, setTransactionSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedWallet) {
        setError("No hay una wallet seleccionada.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/api/wallet/get_balance_and_transactions/${selectedWallet}`);
        if (response.status === 200) {
          setData(response.data);
        } else {
          console.error('Error fetching transaction summary:', response.status);
        }
      } catch (error) {
        console.error('Error fetching transaction summary:', error);
        setError("Hubo un error al obtener los detalles de la transacción. Por favor, intente nuevamente más tarde.");
      }
    };

    fetchData();
  }, [selectedWallet]);

  const balanceInXrp = data ? data.balance : '---'; 

  const validateTransaction = () => {
    if (!selectedWallet || !destination || !currency || !amount) {
      setErrorMessage('Falta información de la transacción. Por favor, asegúrate de que todos los campos están completos. / Transaction information is missing. Please make sure all fields are complete.');
      return false;
    }
    return true;
  };

  const sendTransaction = () => {
    if (validateTransaction()) {
      submitTransaction();
      setTransactionSent(true);
    }
  };

  return (
    <div className="transaction-summary-container">
      <h2>Transaction Summary</h2>
      <table>
        <tbody> 
          <tr>
            <th>Wallet:</th>
            <td>{selectedWallet || '---'}</td> 
          </tr>
          <tr>
            <th>Balance:</th>
            <td>{balanceInXrp}</td>
          </tr>
          <tr>
            <th>Destination:</th>
            <td>{destination || '---'}</td>
          </tr>
          <tr>
            <th>Coin:</th>
            <td>{currency || '---'}</td>
          </tr>
          <tr>
            <th>Amount:</th>
            <td>{amount || '---'}</td>
          </tr>
          <tr>
            <th>Gas:</th>
            <td>{gas || 'see on details'}</td>
          </tr>
        </tbody>
        </table>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    <button className="submit-button" onClick={sendTransaction}>Submit</button>
    {transactionSent && <p className="transaction-notification">Transaction sent!</p>}
  </div>
  );
};

export default TransactionSummary;
