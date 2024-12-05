import React from 'react';
import styled from 'styled-components';
import Spinner from '/spinner.gif';

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  /* top: 0;
  left: 0; */
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;

export const Loading = () => {
  return (
    <Background>
      <LoadingText>로딩 중입니다</LoadingText>
      <img src={Spinner} alt='로딩중' width='100px' />
    </Background>
  );
};

export default Loading;
