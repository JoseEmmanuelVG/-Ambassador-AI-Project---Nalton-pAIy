import React, { useContext} from 'react'; 
import styled from 'styled-components';
import NFT from './NFT_show';

import WalletContext from './WalletContext';
import WalletDetails from './wallet_details';


const DetailsPage = styled.div`
  margin: 2mm;
  padding: 1mm;
  display: flex;
  flex-direction: row; 
  > * {
    width: 50%; 
  }
`;

const LeftSide = styled(WalletDetails)`
  background-color: #FFF;
  height: 100vh;
`;

const RightSide = styled(NFT)`
  background-color: #000;
  color: #fff;
  height: 100vh;
`;

function Details() {
  const { selectedWallet } = useContext(WalletContext); 

  return (
    <DetailsPage>
      <LeftSide address={selectedWallet} /> {/* Pass the address to the component */}
      <RightSide />
    </DetailsPage>
  );
}

export default Details;
