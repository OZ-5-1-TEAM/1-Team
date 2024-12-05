import React from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../../Header';

const Box = styled.div`
  width: 100%;
  height: 130px;
  background-color: transparent;
  display: block;
`;

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

const NotificationBox = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ type }) =>
    type === 'success' ? '#ff9900' : '#ffe082'};
  color: white;
  padding: 15px 20px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${slideDown} 0.5s ease;
  z-index: 1000;
  user-select: none;
`;

const MatePageHeader = ({ notification }) => {
  return (
    <>
      <Box />
      {notification.message && (
        <NotificationBox type={notification.type}>
          {notification.message}
        </NotificationBox>
      )}
      <Header title='메이트 🐾' />
    </>
  );
};

export default MatePageHeader;
