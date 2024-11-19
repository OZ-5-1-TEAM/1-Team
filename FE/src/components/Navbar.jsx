import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 70px;
  margin: 0 auto;
  background-color: #fff8e1;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`;

const BackButton = styled.button`
  position: absolute;
  left: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #ff9900;
`;

const Title = styled.div`
  font-size: 20px;
  color: #ff9900;
  font-weight: bold;
  cursor: pointer;
`;

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavbarContainer>
      <BackButton onClick={() => navigate(-1)}>{'<'} Back</BackButton>
      <Title onClick={() => navigate('/')}>GAERANGMARI</Title>
    </NavbarContainer>
  );
};

export default Navbar;
``;
