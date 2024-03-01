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

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-bottom: 1em;

  @media (max-width: 800px) {
    width: 90%;
  }
`;

const Input = styled.input`
  margin-bottom: 1em;
  padding: 0.5em;
`;

const Textarea = styled.textarea`
  margin-bottom: 1em;
  padding: 0.5em;
`;

const Button = styled.button`
  padding: 0.5em;
`;

const CopyRight = styled.p`
  margin: 0;
  text-align: center;
`;

function Footer() {
  return (
    <FooterStyled>
      <FormStyled>
        <Input type="text" name="name" placeholder="Name" />
        <Input type="email" name="email" placeholder="Email" />
        <Textarea name="message" placeholder="Message" />
        <Button type="submit">Contact Us</Button>
      </FormStyled>
      <CopyRight>
      <p>&copy; 2023 Nalton Paiy App. All rights reserved </p>
      <p>"Quetzalcoatl" (https://skfb.ly/66KQJ) by Chris3dblender is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
      "Metallic Fluidity" (https://skfb.ly/otqCx) by Tycho Magnetic Anomaly is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</p>
      </CopyRight>
    </FooterStyled>
  );
}

export default Footer;
