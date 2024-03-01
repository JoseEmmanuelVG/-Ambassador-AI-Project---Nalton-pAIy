import React, { useEffect } from "react";
import styled from "styled-components";
import Spline from '@splinetool/react-spline'; 
import { Link } from 'react-router-dom';


const BodyStyled = styled.main`
  position: relative; // hacer relativo para el posicionamiento absoluto de los hijos
  flex: 1;
  color: #000;
  padding: 1mm;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1em;
`;

const SplineBackground = styled(Spline)`
  position: absolute; // posicionamiento absoluto para colocar detrás de otros elementos
  top: 0; // mover verticalmente
  right: 0; // mover horizontalmente 
  bottom: 0;
  left: 0;
  z-index: 0; // índice z inferior para colocar detrás de otros elementos
`;


const Title = styled.h1`
  margin: 0 0 1em; // margen inferior de 2em
  z-index: 1;
  color: #FFFFFF; // color de texto
  font-size: 5em; // tamaño de texto
  text-shadow: 2px 2px 4px #000000; // sombra de texto
`;

const Description = styled.p`
  margin-top: 8em; // margen superior de 
  max-width: 800px;
  font-size: 1.2em; 
  font-style: italic; // estilo de texto
  font-weight: bold; // peso de texto
  z-index: 1;
  color: #FFFFFF; // color de texto
  text-shadow: 1px 1px 2px #000000; // sombra de texto
`;

const StyledLink = styled(Link)`
  display: inline-block;
  background: rgba(0, 0, 0, 0.6); // dar un poco de opacidad
  border-radius: 50px; // bordes redondeados
  padding: 20px 50px; // relleno para hacerlo grande
  font-size: 1.5em; // tamaño de texto
  font-weight: bold; // peso de texto
  color: #FFFFFF; // color de texto
  text-shadow: 1px 1px 2px #000000; // sombra de texto
  cursor: pointer;
  text-decoration: none;
  z-index: 1;
  margin-left: -26px; // mover un poco a la izquierda
  margin-top: 20px; // mover un poco hacia abajo
  transition: background 0.3s ease; // animación suave del cambio de color de fondo
  &:hover {
    color: ${props => props.hoverColor || "#FFFFFF"};
    background: rgba(255, 0, 128, 0.6); // cambiar color de fondo a rojo cuando se pasa el cursor
  }
`;


function Body() {

  useEffect(() => {
    const preloader = document.createElement('img');
    preloader.src = 'URL_DE_TU_ANIMACIÓN'; 
    preloader.style.display = 'none';
    document.body.appendChild(preloader);
  }, []);

  return (
    <BodyStyled>
      <SplineBackground scene="https://prod.spline.design/M7AzHLSZ0vlxSGs9/scene.splinecode" /> {/* Añadir como fondo */}
      <Title>Nalton Paiy App</Title>
      <StyledLink to="/launch" hoverColor="black">Test the App</StyledLink>
      <Description>
        It is a Latin American financial content generator. Using Artificial Intelligence, users can make payments, send remittances, generate NFT images of their purchases, obtain loans and more under a multi-chain CBDC ecosystem on XRP Ledger.
      </Description>
    </BodyStyled>
  );
}

export default Body;