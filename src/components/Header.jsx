// Header
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  width: 600px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  background-color: #f8f8f8;
  position: fixed;
  top: 70px;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 100;
`;

const CommunityTitle = styled.div`
  font-size: 30px;
  color: #ff9900;
  font-weight: bold;
  margin: 0;
  cursor: pointer;
`;

const UserProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  cursor: pointer;
`;

const UserName = styled.div`
  font-size: 15px;
  color: #dfa700;
  margin-right: 10px;
`;

const UserProfileCircle = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #ffd700;
`;

const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <CommunityTitle onClick={() => navigate('./')}>{title}</CommunityTitle>
      <UserProfileWrapper onClick={() => navigate('./')}>
        <UserName>USER NAME</UserName>
        <UserProfileCircle />
      </UserProfileWrapper>
    </HeaderContainer>
  );
};

export default Header;
