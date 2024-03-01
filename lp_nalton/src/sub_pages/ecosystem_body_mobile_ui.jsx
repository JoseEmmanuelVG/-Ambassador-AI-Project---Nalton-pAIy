import React, { useEffect } from "react";
import styled from "styled-components";
import Spline from '@splinetool/react-spline'; 


const BodyStyled = styled.main`
  position: relative; // hacer relativo para el posicionamiento absoluto de los hijos
  flex: 1;
  color: #000;
  padding: 1mm;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  text-align: center;
  gap: 1em;
  min-height: 700px; // o cualquier valor que consideres adecuado

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

function Body() {

  useEffect(() => {
    const preloader = document.createElement('img');
    preloader.src = 'URL_DE_TU_ANIMACIÓN'; 
    preloader.style.display = 'none';
    document.body.appendChild(preloader);
  }, []);

  return (
    <BodyStyled>
      <SplineBackground scene="https://prod.spline.design/r8kTAttT7dvLDYp9/scene.splinecode" /> {/* Añadir como fondo */}
      <Title>Mobile UI Design</Title>
    </BodyStyled>
  );
}

export default Body;