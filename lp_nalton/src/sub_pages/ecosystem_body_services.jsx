import React from 'react';
import styled from 'styled-components';

const BodyStyled = styled.main`
  flex: 1;
  background-color: #FFFFF;
  color: #fff; // Cambiado a color blanco
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;
  background-image: url('http://...'); // GIF de fondo
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  font-family: 'Roboto', sans-serif; 
  color: #e0e0e0; // Cambiado a un gris claro
  margin-bottom: 0.5em;
`;

const Subtitle = styled.h2`
  font-size: 2em;
  font-family: 'Roboto', sans-serif;
  color: #bdc3c7; // Cambiado a un gris más claro
  margin-bottom: 1em;
`;

const Description = styled.p`
  font-size: 1.2em;
  font-family: 'Open Sans', sans-serif;
  color: #95a5a6; // Cambiado a un gris claro
  max-width: 800px;
  margin-bottom: 1em;
`;

const List = styled.ul`
  font-size: 1.1em;
  font-family: 'Open Sans', sans-serif;
  color: #bdc3c7; // Cambiado a un gris claro
  text-align: left;
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 800px;
  display: grid; 
  grid-template-columns: repeat(3, 1fr); // Divide la lista en 3 columnas
  gap: 1em; 

  li {
    padding-left: 2em;
    position: relative;
    margin-bottom: 1em;
    transition: background 0.3s, transform 0.3s;

    &:hover {
      background: rgba(255,255,255,0.05); // Cambiado a un blanco translúcido
      transform: translateX(10px);
    }

    &::before {
      content: '✔';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      color: #2ecc71;
      font-size: 1.2em;
      margin-right: 10px;
    }
  }
`;

function Body() {
  return (
    <BodyStyled>
      <Title>How does it work?</Title>
      <Subtitle>Services Offered</Subtitle>
      <Description>
        The user can leverage Paiy's browser for:
      </Description>
      <List>
        <li>Sending and receiving payments</li>
        <li>Performing CBDC swaps</li>
        <li>Generating AI descriptions or images of purchases made</li>
        <li>Accessing loans</li>
        <li>Tokenizing small stores</li>
        <li>Messaging</li>
        <li>Checking transaction history</li>
        <li>Inspecting asset prices</li>
        <li>Finding the best rates</li>
        <li>Innovation</li>
        <li>Conducting financial inquiries</li>
        <li>Innovation</li>
      </List>
    </BodyStyled>
  );
}

export default Body;
