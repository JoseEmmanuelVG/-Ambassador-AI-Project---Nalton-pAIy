import React from 'react';
import styled from 'styled-components';

const BodyStyled = styled.main`
  flex: 1;
  color: #e0e0e0;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2em;
  background-image: url('https://github.com/bancambios/PaiyApp-Hackaton-Etherfuse/raw/main/Images/ColorFont1.mp4');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  font-family: 'Roboto', sans-serif;
  color: #e0e0e0;
  margin-bottom: 0.5em;
`;

const Subtitle = styled.h2`
  font-size: 2em;
  font-family: 'Roboto', sans-serif;
  color: #bdc3c7;
  margin-bottom: 1em;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
`;

const Description = styled.div`
  font-size: 1.2em;
  font-family: 'Open Sans', sans-serif;
  color: #95a5a6;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 50%;
`;

const ListItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.5em;
  transition: transform 0.3s;
  width: 100%;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Diagram = styled.div`
  width: 555px;
  height: 500px;
  border: 3px solid #95a5a6;
  background-image: url('https://github.com/bancambios/PaiyApp-Hackaton-Etherfuse/blob/main/Images/AboutDiagram.png?raw=true');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

function Body() {
  return (
    <BodyStyled>
      <Subtitle>How does it solve it?</Subtitle>
      <ContentWrapper>
        <Description>
          <ListItem>Transaction Manager Module</ListItem>
          <ListItem>Permissioned Wallet</ListItem>
          <ListItem>Proof of Reserve</ListItem>
          <ListItem>Smart Programs executed by the module</ListItem>
          <ListItem>Connection to test available resources</ListItem>
        </Description>
        <Diagram />
      </ContentWrapper>
    </BodyStyled>
  );
}

export default Body;
