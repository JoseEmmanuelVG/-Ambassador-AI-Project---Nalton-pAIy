import React, { useContext, useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';
import WalletContext from './WalletContext';
import LocalWalletModal from './wallet_local_modal';
import DeleteWalletModal from './wallet_local_modal_delete';
import './styles/SelectWalletStyles.css';

const SelectWallet = () => {
  const { setSelectedWallet } = useContext(WalletContext);
  const [showModal, setShowModal] = useState(false);
  const [localWallets, setLocalWallets] = useState([]);
  const navigate = useNavigate();
  const [currentWallet, setCurrentWallet] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("default"); 

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/wallet/get_wallets', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
          }
        });
        setLocalWallets(response.data);
      } catch (error) {
        console.error('Error fetching wallets:', error);
      }
    };
      
    fetchWallets();
  }, []);

  const selectWallet = async (event) => {
    const selectedWallet = localWallets.find(w => w.name === event.target.value);
    setCurrentWallet(selectedWallet);   
    if (event.target.value === 'localWallet') {
      setShowModal(true);
      setCurrentWallet(null); 
      return;
    }
    setSelectedWallet(selectedWallet.address);

    try {
      const response = await axios.post('http://localhost:4000/api/wallet/select_wallet', { wallet: selectedWallet.name });
      if (response.data.confirmation === 'ok') {
        setSelectedWallet(response.data.address);
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`selectWalletContainer ${currentPage}`}>
      <div className="leftSection">
        <select onChange={selectWallet}>
          <option value="">Select a Wallet</option>
          <option value="localWallet">Add a Nalton Local Wallet</option>
          {localWallets.map(wallet => (
            <option key={wallet._id} value={wallet.name}>
              {wallet.name}
            </option>
          ))}
        </select>
        <button className="editButton" onClick={() => setShowModal(true)}>Edit Wallet</button>
        <button className="deleteButton" onClick={() => setShowDeleteModal(true)}>Delete Wallet</button>
      </div>
      <div className="centralSection">
        <button className="detailsButton" onClick={() => {navigate('/details'); setCurrentPage("details");}}>Details</button>
        <button className="transactionButton" onClick={() => {navigate('/transactions'); setCurrentPage("transactions");}}>New Transaction</button>
        <button className="memoriesButton" onClick={() => {navigate('/memories'); setCurrentPage("memories");}}>Memories</button>
      </div>
      <button className="naltonHomeButton" onClick={() => window.open('https://lp-nalton-3b514b803893.herokuapp.com/', '_blank')}>Nalton Home</button>
      {showModal && 
        <LocalWalletModal 
          onClose={() => setShowModal(false)} 
          mode={currentWallet ? "edit" : "create"} 
          currentWallet={currentWallet}
        />
      }
      {
        showDeleteModal && 
        <DeleteWalletModal 
          onClose={() => setShowDeleteModal(false)} 
          currentWallet={currentWallet}
        />
      }
    </div>
  );
};

export default SelectWallet;
