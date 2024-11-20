import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StartPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  border: 2px solid #f59e0b;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #f59e0b;
  margin-bottom: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #fff7e6;
  padding: 20px;
  border-radius: 15px;
`;

const Button = styled.button`
  width: 250px;
  height: 50px;
  background-color: #f59e0b;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #d97706;
  }
`;

function StartPage() {
  const navigate = useNavigate();

  return (
    <StartPageWrapper>
      <Title>GAERANG MARI</Title>
      <ButtonWrapper>
        <Button onClick={() => navigate('/login')}>EMAIL LOGIN</Button>
        <Button onClick={() => navigate('/join')}>JOIN</Button>
      </ButtonWrapper>
    </StartPageWrapper>
  );
}

export default StartPage;
