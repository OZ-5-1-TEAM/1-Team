import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const MainPageWrapper = styled.div`
  padding-top: 140px;
  width: 600px;
  height: 1200px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #ffffff;
  padding-bottom: 63px;
`;

const ContentSection = styled.section`
  width: 100%;
  height: 1070px; /* 메인 페이지 표시 영역 */
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
`;

function MainPage() {
  const navigate = useNavigate();

  return (
    <MainPageWrapper>
      <Header title='Home' />
      <ContentSection>
        {/* 여기에 메인 컨텐츠 추가 */}
        <p>메인 컨텐츠를 여기에 추가하세요.</p>
      </ContentSection>
    </MainPageWrapper>
  );
}

export default MainPage;
