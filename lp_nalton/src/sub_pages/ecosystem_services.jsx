import React from 'react';
import styled from 'styled-components';

const BodyStyled = styled.main`
  flex: 1;
  background-color: #fff;
  color: #000;
  padding: 1mm;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1em;
`;

const Title = styled.h1`
  font-size: 2em;
  font-family: Arial, sans-serif;
  color: #000;
  margin: 0;
`;

const Subtitle = styled.h2`
  font-size: 1.5em;
  font-family: Arial, sans-serif;
  color: #808080;
`;

const Description = styled.p`
  font-size: 1em;
  font-family: Arial, sans-serif;
  color: #000;
  max-width: 800px;
`;

const List = styled.ul`
  font-size: 1em;
  font-family: Arial, sans-serif;
  color: #000;
  text-align: left;
`;

function Body() {
  return (
    <BodyStyled>
      <Title>How does it work?</Title>
      <Subtitle>What services does it offer?</Subtitle>
      <Description>
        The user will be able to access Paiy's browser for:
      </Description>
      <List>
        <li>For sending and receiving payments</li>
        <li>For performing CBDC swaps</li>
        <li>For generating AI descriptions or images of purchases made</li>
        <li>For accessing loans</li>
        <li>For tokenizing small stores</li>
        <li>For messaging</li>
        <li>For checking transaction history</li>
        <li>For checking asset prices</li>
        <li>For finding the best rates</li>
        <li>For financial inquiries</li>
      </List>
      <Subtitle>How does it solve it?</Subtitle>
      <Description>
        - Transaction Manager Module
        - Permissioned Wallet
        - Proof of Reserve
        - Smart Programs executed by the module
        - Connection to test available resources
      </Description>
    </BodyStyled>
  );
}

export default Body;
