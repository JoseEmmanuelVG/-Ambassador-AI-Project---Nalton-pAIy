import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import WalletContext from './WalletContext';
import Browser from './wallet_browser_gpt';
import SelectWallet from './wallet_multichain_selector';
import Details from './page_details_wallets';
import ImageGenerator from './page_saved_images';
import Login from './auth/Login';
import Register from './auth/Register';
import './styles/App.css';


const App = () => {
  const [selectedWallet, setSelectedWallet] = React.useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <WalletContext.Provider value={{ selectedWallet, setSelectedWallet }}>
      <Router>
        {isAuthenticated ? (
          <>
            <SelectWallet /> 
            <button className="Close" onClick={() => {
                localStorage.removeItem('jwtToken');
                setIsAuthenticated(false);
              }}>
                Close this session
            </button>
            <Routes>
              <Route path="/details" element={<Details />} />
              <Route path="/memories" element={<ImageGenerator />} />
              <Route path="/transactions" element={<Browser />} />
              <Route path="/" element={<Browser />} />
              <Route path="/logout" element={() => {
                localStorage.removeItem('jwtToken');
                setIsAuthenticated(false);
                return <Navigate  to="/login" />;
              }} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate  to="/login" />} />
          </Routes>
        )}
      </Router>
    </WalletContext.Provider>
  );
};

export default App;
