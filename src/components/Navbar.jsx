import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 70px;
  margin: 0 auto;
  background-color: #fff8e1;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #ffe082;
`;

const NavbarContent = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #ff9900;
  padding: 0;
`;

const Title = styled.h1`
  font-size: 20px;
  color: #ff9900;
  font-weight: bold;
  margin: 0;
  cursor: pointer;
  text-align: center;
  flex-grow: 1;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // BackButton을 숨길 경로를 설정 (메인 페이지에서 숨김)
  const hideBackButton =
    location.pathname === '/' || location.pathname === '/index.html';

  return (
    <HeaderContainer>
      <NavbarContent>
        {!hideBackButton && (
          <BackButton onClick={() => navigate(-1)}>{'<'} Back</BackButton>
        )}
        <Title onClick={() => navigate('/')}>GAERANGMARI</Title>
      </NavbarContent>
    </HeaderContainer>
  );
};

export default Navbar;
