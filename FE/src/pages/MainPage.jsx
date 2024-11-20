import React, { useState, useEffect } from 'react';
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

const BannerContainer = styled.section`
  width: 100%;
  padding: 10px 10px;
  background-color: #fff8e1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 20px;
`;

const Wording = styled.div`
  text-align: center;
  font-size: 17px;
`;

function MainPage() {
  const navigate = useNavigate();

  return (
    <MainPageWrapper>
      <Header title='Home' />
      <ContentSection>
        <MainWording />
        <MainBanner />
        <CommunityList />
        <WeatherSection />
        <NoticeSection />
        <CustomerService />
      </ContentSection>
    </MainPageWrapper>
  );
}

export default MainPage;

const MainWording = () => {
  const quotes = [
    '강아지는 우리 삶의 작은 부분이지만, 우리는 강아지의 전부입니다',
    '사람들은 강아지를 키우며 많은 것을 배우지만, 그중 가장 중요한 건 무조건적인 사랑입니다',
    '강아지의 눈에는 세상에 단 한 사람만 있습니다 바로 당신입니다',
    '진정한 친구는 발을 네 개 가진 존재일지도 모릅니다',
    '강아지는 우리에게 하루를 어떻게 기뻐해야 하는지, 단순한 것에서 행복을 찾는 법을 알려줍니다',
    '강아지는 우리의 손을 잡아주진 않지만, 우리의 마음을 붙들고 있습니다',
    '강아지는 사랑을 사는 게 아니라, 그저 나눌 뿐이다',
    '강아지와 함께하는 삶은 매일매일이 새로운 선물입니다',
    '강아지의 꼬리 흔드는 모습은 사랑의 가장 순수한 표현입니다',
    '강아지와의 인연은 하늘이 맺어준 가장 특별한 선물입니다',
    '강아지가 주는 가장 큰 선물은 따뜻한 위로와 무한한 신뢰입니다',
    '세상 모든 사랑을 한 눈빛에 담아 보내는 강아지를 어찌 사랑하지 않을 수 있을까요?',
    '강아지와 함께하는 매 순간은 사랑과 행복으로 가득합니다',
    '강아지는 삶의 모든 것을 더 환하게 만들어주는 작은 천사입니다',
    '강아지와의 하루는 어떤 날보다 특별합니다',
  ];

  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <>
      <BannerContainer>
        <Wording>{quote}</Wording>
      </BannerContainer>
    </>
  );
};

const MainBanner = () => {
  return <></>;
};

const CommunityList = () => {
  return (
    <>
      <p>Main CommunityList</p>
    </>
  );
};

const WeatherSection = () => {
  return (
    <>
      <p>Main WeatherSection</p>
    </>
  );
};

const NoticeSection = () => {
  return (
    <>
      <p>Main NoticeSection</p>
    </>
  );
};

const CustomerService = () => {
  return (
    <>
      <p>Main CustomerService</p>
    </>
  );
};
