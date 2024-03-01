import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderStyled = styled.header`
  background-color: #FFFFFF;  // Cambio el fondo a blanco
  border: 0.5 px solid #000;     // Añado un borde negro
  color: #fff;
  padding: 1mm;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 25px 25px 0 0;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;



const Title = styled(Link)`
  width: 25%; // ajusta este valor según sea necesario
  margin: 0;
  margin-right: 0.5em; // añadir margen a la derecha
  margin-left: 3.5em; // añadir margen a la derecha
  margin-top: 0.5em; // añadir margen a la derecha
  color: #ffffff; // cambiar color de texto a blanco
  text-decoration: none;
  display: flex; // esto centra el texto en la caja
  align-items: center;
  justify-content: center;
  background: url('https://raw.githubusercontent.com/bancambios/PaiyApp-Hackaton-Etherfuse/main/Images/NaltonWalk.png') repeat center / 120% 150%; // agregar la imagen de fondo
  padding: 10px;
  font-size: 3em; // modifica el tamaño de la fuente del título aquí
  font-family: 'Helvetica Neue', sans-serif; // cambiar el tipo de letra
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); // sombra de texto
  border-radius: 20px; // bordes redondeados
  background-color: #d3d3d3; // color de fondo gris claro
`;

const Navigation = styled.nav`
  display: flex;
  gap: 1em;
  flex: 1; 
  height: 100%; 
  font-size: 1.5em;

  @media (max-width: 800px) {
    width: 100%;
    flex-direction: column; 
    align-items: center; 
  }
`;


const StyledLink = styled(({ hoverColor, ...props }) => <Link {...props} />)`
  display: inline-block;
  background: rgba(0, 0, 0, 0.6); // dar un poco de opacidad
  border-radius: 30px; // bordes redondeados
  padding: 20px 40px; // relleno para hacerlo grande
  font-size: 1.25em; // tamaño de texto
  font-family: 'Helvetica Neue', sans-serif; // cambiar el tipo de letra
  font-weight: 300; // hacer el peso de la fuente más ligero
  color: #FFFFFF; // color de texto
  text-shadow: 1px 1px 2px #000000; // sombra de texto
  cursor: pointer;
  text-decoration: none;
  z-index: 1;
  margin-left: -20px; // mover un poco a la izquierda
  margin-top: 20px; // mover un poco hacia abajo
  transition: background 0.3s ease, color 0.3s ease; // animación suave del cambio de color de fondo y texto
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); // sombra de caja para darle profundidad
  &:hover {
    color: ${props => props.hoverColor || "#FFFFFF"};
    background: rgba(255, 255, 255, 0.6); // cambiar color de fondo a rojo cuando se pasa el cursor
  }
`;

const ExternalStyledLink = styled(({ hoverColor, ...props }) => <a {...props} />)`
  display: inline-block;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 30px;
  padding: 20px 40px;
  font-size: 1.25em;
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 300;
  color: #FFFFFF;
  text-shadow: 1px 1px 2px #000000;
  cursor: pointer;
  text-decoration: none;
  z-index: 1;
  margin-left: -20px;
  margin-top: 20px;
  transition: background 0.3s ease, color 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  &:hover {
    color: ${props => props.hoverColor || "#FFFFFF"};
    background: rgba(255, 255, 255, 0.6);
  }
`;

function Header() {
  return (
    <HeaderStyled>
      <Title to="/">HOME</Title>
      <Navigation>
        <StyledLink to="/about" hoverColor="green">About</StyledLink>
        <StyledLink to="/ecosystem">Ecosystem</StyledLink>
        <ExternalStyledLink hoverColor="red" href="http://localhost:3000">Launch App</ExternalStyledLink>
      </Navigation>
    </HeaderStyled>
  );
}

export default Header;