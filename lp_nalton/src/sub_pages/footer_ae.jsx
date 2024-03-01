import React from 'react';
import styled from 'styled-components';

const FooterStyled = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 1mm;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 25px 25px; // redondea solo las esquinas superiores
`;

const CopyRight = styled.p`
  margin: 0;
  text-align: center;
`;

function Footer() {
  return (
    <FooterStyled>
      <CopyRight>&copy; 2023 Nalton Paiy App. All rights reserved</CopyRight>
    </FooterStyled>
  );
}

export default Footer;
