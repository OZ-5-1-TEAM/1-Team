import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import dog1 from '../assets/images/강아지1.jpg';
import dog2 from '../assets/images/강아지2.jpg';
import dog3 from '../assets/images/강아지3.jpg';
import dog4 from '../assets/images/강아지4.jpg';

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

const SlideImageContainer = styled.div`
  width: 550px;
  height: 250px;
  margin: 10px auto;
  overflow: hidden;
  position: relative;
`;

const SlideTrack = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'imagePosition',
})`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.imagePosition}%);
  will-change: transform;
  //브라우저가 transform 속성의 변경을 예상하고 성능 최적화를 미리 준비하도록 돕는 CSS 속성 추가
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  object-fit: cover;
  object-position: bottom;
  border-radius: 10px;
`;

const CommunityHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 20px 0px 15px 0px;
`;

const CommunityTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #ff9900;
  margin: 10px;
  cursor: pointer;
`;

const CommunityArrow = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #ff9900;
  cursor: pointer;
`;

const CommunityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const CommunityIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #eee;
  border-radius: 5px;
  margin-right: 15px;
`;

const CommunityCategory = styled.p`
  font-size: 11px;
  color: #dfa700;
  margin: 0;
`;

const CommunityPostTitle = styled.p`
  font-size: 17px;
  color: #8f8e94;
  margin: 5px 0 0 0;
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
  const images = [dog1, dog2, dog3, dog4];

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const imagePosition = -imageIndex * 100;

  return (
    <>
      <SlideImageContainer>
        <SlideTrack imagePosition={imagePosition}>
          {images.map((image, i) => (
            <SlideImage
              key={i}
              src={image}
              alt={`강아지 사진 ${i + 1}`}
              //강아지 사진 설명 수정 alt slide -> '강아지 사진'
            ></SlideImage>
          ))}
        </SlideTrack>
      </SlideImageContainer>
    </>
  );
};

// community 섹션 추가(정적 데이터)
const CommunityList = () => {
  const navigate = useNavigate();

  const communities = [
    { id: 1, category: 'COMMUNITY NAME', postTitle: 'TITLE', path: '/post/1' },
    { id: 2, category: 'COMMUNITY NAME', postTitle: 'TITLE', path: '/post/2' },
    { id: 3, category: 'COMMUNITY NAME', postTitle: 'TITLE', path: '/post/3' },
  ];

  return (
    <>
      <CommunityHeader>
        <CommunityTitle onClick={() => navigate('/community')}>
          커뮤니티
        </CommunityTitle>
        <CommunityArrow onClick={() => navigate('/community')}>
          ›
        </CommunityArrow>
      </CommunityHeader>
      {communities.map((community) => (
        <CommunityItem
          key={community.id}
          onClick={() => navigate(community.path)}
        >
          <CommunityIcon />
          <div>
            <CommunityCategory>{community.category}</CommunityCategory>
            <CommunityPostTitle>{community.postTitle}</CommunityPostTitle>
          </div>
        </CommunityItem>
      ))}
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
