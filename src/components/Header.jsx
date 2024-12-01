// Header
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 600px;
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
  z-index: 100;
  user-select: none;
`;

const CommunityTitle = styled.div`
  font-size: 18px;
  color: #ff9900;
  font-weight: bold;
  margin: 0;
  cursor: pointer;
  user-select: none;
  text-align: left; /* 왼쪽 정렬 고정 */
  flex-shrink: 0; /* 줄어들지 않도록 설정 */
`;

const UserProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  @media (max-width: 600px) {
    flex-grow: 1; /* 공간 확보 */
    justify-content: flex-end; /* 오른쪽으로 정렬 */
  }
`;

const UserName = styled.div`
  font-size: 15px;
  color: #dfa700;
  margin-right: 10px;
  user-select: none;

  @media (max-width: 600px) {
    font-size: 12px; /* 글자 크기 줄이기 */
    margin-right: 5px; /* 간격 조정 */
  }
`;

const UserProfileCircle = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #ffd700;

  @media (max-width: 600px) {
    width: 30px;
    height: 30px; /* 크기 줄이기 */
  }
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
