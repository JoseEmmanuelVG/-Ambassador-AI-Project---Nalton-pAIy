import React from 'react';
import styled from 'styled-components';
import EcosystemHeader from './ecosystem_header';
import EcosystemBodyServ from './ecosystem_body_services';
import EcosystemBodyUI from './ecosystem_body_mobile_ui';
import EcosystemBodySolv from './ecosystem_Body_solves';
import FooterAE from './footer_ae';

const EcosystemPage = styled.div`
  margin: 2mm;
  padding: 1mm;
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  border-radius: 25px 25px 25px 25px; // redondea solo las esquinas superiores

`;

function Ecosystem() {
  return (
    <EcosystemPage>
      <EcosystemHeader />
      <EcosystemBodyServ/>
      <EcosystemBodyUI/>
      <EcosystemBodySolv/>
      <FooterAE />
    </EcosystemPage>
  );
}

export default Ecosystem;
