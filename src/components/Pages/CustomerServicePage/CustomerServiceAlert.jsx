import React from 'react';
import styled, { keyframes } from 'styled-components';
import { BoxStyles } from '../MessagePage/Styles/MessageStyles';

const slideDown = keyframes`
  from {
    opacity: 0;
    top: -50px;
  }
  to {
    opacity: 1;
    top: 0;
  }
`;

const AlertWrapper = styled.div`
  ${BoxStyles}
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ $isError }) => ($isError ? '#ffe082' : '#ff9900')};
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
  z-index: 1000;
  animation: ${slideDown} 0.5s ease;
  user-select: none;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

function CustomerServiceAlert({ message, isError }) {
  return (
    <>{message && <AlertWrapper $isError={isError}>{message}</AlertWrapper>}</>
  );
}

export default CustomerServiceAlert;
