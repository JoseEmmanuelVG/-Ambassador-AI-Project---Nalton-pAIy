import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Spline from '@splinetool/react-spline';

const AboutPage = styled.div`
  position: relative;
  flex: 1;
  background-color: #f4f4f4;
  color: #333;
  padding: 2em 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3em;
  z-index: 0;
`;

const Section = styled.section`
  max-width: 1000px;
  background: rgba(255, 255, 255, 0.8); // Transparencia añadida
  border-radius: 15px;
  padding: 2em;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(0, 0, 0, 0.15); // Contorno remarcado
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1em;
  font-size: 3em;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.h2`
display: flex;
justify-content: space-between;
align-items: center;
cursor: pointer; // Esto hace que el Subtitle sea "clicable"
  color: #2a2a2a;
  margin-bottom: 1em;
  font-size: 2em;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5em;
`;

const Arrow = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-right: 2px solid #2a2a2a;
  border-bottom: 2px solid #2a2a2a;
  transform: ${props => (props.open ? "rotate(45deg)" : "rotate(-135deg)")};
  transition: transform 0.3s ease;
`;

const Text = styled.p`
display: ${props => (props.open ? "block" : "none")};
  text-align: justify;
  font-size: 1.1em;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  line-height: 1.8;
  margin-bottom: 1.5em;
`;
const SplineBackground = styled(Spline)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;  // Coloca el fondo detrás del contenido
`;


function About() {
  const [openHistory, setOpenHistory] = useState(false);
  const [openInspiration, setOpenInspiration] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);

  useEffect(() => {
    const preloader = document.createElement('img');
    preloader.src = 'URL_DEL_FONDO'; 
    preloader.style.display = 'none';
    document.body.appendChild(preloader);
  }, []);

  return (
    <AboutPage>
      <SplineBackground scene="https://prod.spline.design/1kDrPJIQyrOxMHq5/scene.splinecode" />
      <Section>
        <Title>Nalton Paiy App</Title>
        <h3>
          AI Transaction and Financial Content Generator - Multi-Chain XRPL
        </h3>
      </Section>
        <Section>
        <Subtitle onClick={() => setOpenHistory(!openHistory)}>
          History
          <Arrow open={openHistory} />
        </Subtitle>
        <Text open={openHistory}>
        Derived from the Mexica mythology, PayNalton represents a "small fast runner" responsible for delivering messages rapidly, emulating the efficiency of modern instant transactions. As technology progressed, so did the banking industry, spawning complex services that often create a barrier for those lacking financial education.
        </Text>
      </Section>
      <Section>
        <Subtitle onClick={() => setOpenInspiration(!openInspiration)}>
          Inspiration
          <Arrow open={openInspiration} />
        </Subtitle>
        <Text open={openInspiration}>
        In rural Mexico and across Latin America, significant challenges exist. A substantial portion of the population is lacking access to basic financial services due to infrastructural gaps. Indigenous communities and women entrepreneurs often face even greater barriers. High-interest rates, complex banking products, and limited access to credit are only a few of the many obstacles. However, with 80% of Latin Americans having access to a smartphone, there's an opportunity to overcome these challenges.
        </Text>
      </Section>
      <Section>
        <Subtitle onClick={() => setOpenAbout(!openAbout)}>
          What is Nalton Paiy App?
          <Arrow open={openAbout} />
        </Subtitle>
        <Text open={openAbout}>
        Nalton Paiy is more than an app—it's a solution. It's an AI-powered transaction and financial content generator that operates on the XRP Ledger. Users can make transfers or payments by simply writing or using Voice in various indigenous languages. Paiy links to CBDC payment services and international networks, unlocking a new era of financial inclusivity.
        </Text>
      </Section>
    </AboutPage>
  );
}

export default About;