import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './main_header';
import Body from './main_body';
import Team from './main_team';
import Footer from './main_footer';
import About from './sub_pages/about';  // Importa el componente About
import Ecosystem from './sub_pages/ecosystem';  // Importa el componente Ecosystem

const Page = styled.div`
  margin: 2mm;
  padding: 1mm;
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  border-radius: 25px 25px 25px 25px; // redondea solo las esquinas superiores
`;


const Home = () => (
  <Page>
    <Header />
    <Body />
    <Team />   
    <Footer />
  </Page>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />  
        <Route path="/ecosystem" element={<Ecosystem />} />  
        {/* Agregar más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;