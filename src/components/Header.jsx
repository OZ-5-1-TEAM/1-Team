import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';

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
  text-align: left;
  flex-shrink: 0;
`;

const UserProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  @media (max-width: 600px) {
    flex-grow: 1;
    justify-content: flex-end;
  }
`;

const UserName = styled.div`
  font-size: 15px;
  color: #dfa700;
  margin-right: 10px;
  user-select: none;

  @media (max-width: 600px) {
    font-size: 12px;
    margin-right: 5px;
  }
`;

const UserProfileCircle = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #ffd700;
  background-image: ${(props) =>
    `url(${props.profilePhoto || '/placeholder-image.jpg'})`};
  background-size: cover;
  background-position: center;
`;

const Header = ({ title }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    nickname: 'USER NAME',
    profilePhoto: null,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (accessToken && refreshToken) {
        try {
          const response = await api.get('/v1/users/me');
          const { nickname, profilePhoto } = response.data;
          setUserInfo({ nickname, profilePhoto });
        } catch (err) {
          console.error('사용자 정보를 가져오는 데 실패했습니다:', err);
          // 로그인이 만료되었거나 실패한 경우 토큰 제거 및 로그인 페이지로 이동
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          navigate('/start');
        }
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleUserClick = () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (accessToken && refreshToken) {
      navigate('/mypage');
    } else {
      navigate('/start');
    }
  };

  return (
    <HeaderContainer>
      <CommunityTitle onClick={() => navigate('./')}>{title}</CommunityTitle>
      <UserProfileWrapper onClick={handleUserClick}>
        <UserName>{userInfo.nickname}</UserName>
        <UserProfileCircle profilePhoto={userInfo.profilePhoto} />
      </UserProfileWrapper>
    </HeaderContainer>
  );
};

export default Header;
