import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  background: rgba(0, 0, 0, 0.6); 
  border-radius: 50px;
  padding: 20px 50px; 
  font-size: 1.5em; 
  font-weight: bold; 
  color: #FFFFFF; 
  text-shadow: 1px 1px 2px #000000; 
  cursor: pointer;
  text-decoration: none;
  margin-left: -26px; 
  margin-top: 20px; 
  transition: background 0.3s ease;
  &:hover {
    color: ${props => props.hoverColor || "#FFFFFF"};
    background: rgba(255, 0, 128, 0.6);
  }
`;

const StyledTitle = styled.h1`
  color: #fff;
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 1em;
  font-family: 'Helvetica Neue', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const TeamMember = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.5em;
  width: 150px;
  height: 300px; 
`;

const TeamSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2em 0;
  background-color: #000;
  width: 100%;
  z-index: 2;  
`;

const MemberImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const MemberName = styled.h2`
  color: #ffffff;
  font-size: 1.5em;
  margin-top: 0.5em;
`;

const MemberRole = styled.p`
  color: #ffffff;
  font-size: 1.2em;
  margin: 0;
  text-align: center;
`;

const TeamMemberComponent = ({ name, role, image, to, isExternal }) => (
  isExternal ?
  <a href={to} target="_blank" rel="noopener noreferrer">
    <TeamMember>
      <MemberImage src={image} alt={name} />
      <MemberName>{name}</MemberName>
      <MemberRole>{role}</MemberRole> 
    </TeamMember>
  </a> :
  <StyledLink to={to}>
    <TeamMember>
      <MemberImage src={image} alt={name} />
      <MemberName>{name}</MemberName>
      <MemberRole>{role}</MemberRole> 
    </TeamMember>
  </StyledLink>
);

const teamMembers = [
  { name: 'Daniel', role: 'Product Manager', image: 'https://raw.githubusercontent.com/bancambios/PaiyApp-Hackaton-Etherfuse/main/Images/T1.png', to: '/daniel-info' },
  { name: 'J. E. V. G', role: 'Developer', image: 'https://raw.githubusercontent.com/bancambios/PaiyApp-Hackaton-Etherfuse/main/Images/T2.png', to: 'https://github.com/JoseEmmanuelVG', isExternal: true },
  { name: 'Oscar', role: 'Project Manager', image: 'https://raw.githubusercontent.com/bancambios/PaiyApp-Hackaton-Etherfuse/main/Images/T3.png', to: '/oscar-info' },
];

function MainTeam() {
    return (
      <Section>
        <StyledTitle>Our Team</StyledTitle>
        <TeamSection>
          {teamMembers.map((member, index) => (
            <TeamMemberComponent 
              key={index} 
              name={member.name} 
              role={member.role} 
              image={member.image} 
              to={member.to}
              isExternal={member.isExternal}
            />
          ))}
        </TeamSection>
      </Section>
    );
  }

export default MainTeam;
