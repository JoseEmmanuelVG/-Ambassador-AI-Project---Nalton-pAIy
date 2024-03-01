import React from 'react';
import styled from 'styled-components';
import AboutHeader from './about_header';
import AboutBody from './about_body';
import FooterAbout from './footer_about';

const AboutPage = styled.div`
  margin: 2mm;
  padding: 1mm;
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  border-radius: 25px 25px 25px 25px; // redondea solo las esquinas superiores

`;

function About() {
  return (
    <AboutPage>
      <AboutHeader />
      <AboutBody />
      <FooterAbout />
    </AboutPage>
  );
}

export default About;
