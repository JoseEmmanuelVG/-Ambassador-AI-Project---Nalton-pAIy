import React from 'react';

const WalletContext = React.createContext({
  selectedWallet: '',
  setSelectedWallet: () => {},
});

export default WalletContext;
