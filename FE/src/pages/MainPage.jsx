import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

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

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <MainPageWrapper>
      <Header title='Home' />
      <ContentSection>
        {
          <>
            <Navbar />
            <Header title='GAERANGMARI' />
            <MainWording />
            <MainBanner />
            <CommunityList />
            <WeatherSection />
            <NoticeSection />
            <CustomerService />
            <Footer />
          </>
        }

        <p></p>
      </ContentSection>
    </MainPageWrapper>
  );
};

export default MainPage;

const MainWording = () => {
  return (
    <>
      <p>Main Wording Component</p>
    </>
  );
};

const MainBanner = () => {
  return (
    <>
      <p>Main Banner Component</p>
    </>
  );
};

const CommunityList = () => {
  return (
    <>
      <p>Main CommunityList Component</p>
    </>
  );
};

const WeatherSection = () => {
  return (
    <>
      <p>Main WeatherSection Component</p>
    </>
  );
};

const NoticeSection = () => {
  return (
    <>
      <p>Main NoticeSection Component</p>
    </>
  );
};

const CustomerService = () => {
  return (
    <>
      <p>Main CustomerService Component</p>
    </>
  );
};
