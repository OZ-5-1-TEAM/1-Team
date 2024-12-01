import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Box = styled.div`
  width: 100%;
  height: 130px;
  background-color: transparent;
  display: block;
`;

const MainPageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 63px;
  animation: ${fadeIn} 0.5s ease;

  @media (max-width: 480px) {
    padding: 10px;
    box-shadow: none;
  }
`;

const ContentSection = styled.section`
  width: 100%;
  height: 1070px;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
`;

const BannerContainer = styled.section`
  width: 100%;
  padding: 10px;
  background-color: #fff8e1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Wording = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 17px;
  align-items: center;
  color: #ff9900;
`;

const SlideImageContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 550px;
  max-height: 250px;
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
  margin: 0px;
  cursor: pointer;
`;

const CommunityTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #ff9900;
  margin: 5px;
`;

const CommunityArrow = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #ff9900;
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
  background-image: url('/placeholder-image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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

const WeatherContainer = styled.section`
  margin: 20px;
  padding: 10px;
  cursor: pointer;
  background-color: #fff8e1;
  border-radius: 10px;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #ff9900;
  margin: 10px;
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const WeatherRow = styled.div`
  display: flex;
  align-items: center;
`;

const WeatherIcon = styled.span`
  color: #ff9900;
  font-size: 30px;
  margin-right: 10px;
`;

const Temperature = styled.span`
  font-size: 22px;
  font-weight: bold;
  color: #ff9900;
  margin-right: 10px;
`;

const Description = styled.span`
  font-size: 17px;
  font-weight: bold;
  color: #ff9900;
`;

const NoticeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin: 0px;
  cursor: pointer;
`;

const NoticeTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #ff9900;
  margin: 5px;
`;

const NoticeArrow = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #ff9900;
`;

const NoticePostItem = styled.div`
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

const NoticeIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #eee;
  border-radius: 5px;
  margin-right: 15px;
  background-image: url('/placeholder-image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const NoticePostTitle = styled.p`
  font-size: 17px;
  color: #8f8e94;
  margin: 5px 0 0 0;
`;

const NoticeDate = styled.p`
  font-size: 11px;
  color: #dfa700;
  margin: 0;
`;

const CustomerServiceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin: 5px 0 0 0;
  cursor: pointer;
`;

const CustomerServiceTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #ff9900;
  margin: 10px;
`;

const CustomerServiceArrow = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #ff9900;
`;

function MainPage() {
  const navigate = useNavigate();

  return (
    <>
      <MainPageWrapper>
        <Box />
        <Header title='Home' />
        <ContentSection>
          <MainWording />
          <MainBanner />
          <CommunityList />
          <WeatherSection />
          <NoticeSection />
          <CustomerServiceSection />
        </ContentSection>
      </MainPageWrapper>
    </>
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
  const images = [
    '/banner_image/강아지1.jpg',
    '/banner_image/강아지2.jpg',
    '/banner_image/강아지3.jpg',
    '/banner_image/강아지4.jpg',
  ];

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
            ></SlideImage>
          ))}
        </SlideTrack>
      </SlideImageContainer>
    </>
  );
};

const CommunityList = () => {
  const navigate = useNavigate();

  const [communities, setCommunities] = useState([
    {
      id: 1,
      category: '커뮤니티',
      postTitle: '산책메이트 커뮤니티',
      path: '/workcommunity',
    },
    {
      id: 2,
      category: '커뮤니티',
      postTitle: '강아지 커뮤니티',
      path: '/dogcommunity',
    },
  ]);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const response = await fetch('/api/community');
        const data = await response.json();

        if (data.status === 'success') {
          setCommunities(data.data.communities);
        }
      } catch (error) {
        console.error('커뮤니티 데이터를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchCommunityData();
  }, []);

  return (
    <>
      <CommunityHeader onClick={() => navigate('/community')}>
        <CommunityTitle>커뮤니티</CommunityTitle>
        <CommunityArrow>›</CommunityArrow>
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

const getWalkingRecommendation = (
  condition,
  rainProbability,
  fineDust,
  temperature
) => {
  let recommendation = '';
  let icon = '';

  if (
    rainProbability > 70 ||
    condition === 'THUNDERSTORM' ||
    condition === 'HEAVY RAIN'
  ) {
    recommendation = '⛈️ 폭우가 내리고 있어 산책하기 적합하지 않은 날씨입니다.';
    icon = '/weather/storm.png';
  } else if (condition === 'RAIN') {
    recommendation = '🌧️ 비가 와서 산책을 피하는 것이 좋습니다.';
    icon = '/weather/rainy.png';
  } else if (fineDust === 'VERY BAD') {
    recommendation = '😷 미세먼지가 매우 나빠서 외출을 자제하세요.';
    icon = '/weather/dusty.png';
  } else if (fineDust === 'BAD') {
    recommendation = '😷 미세먼지가 나빠 산책을 자제하는 것이 좋습니다.';
    icon = '/weather/dusty.png';
  } else if (temperature < 0) {
    recommendation = '❄️ 기온이 매우 낮아 산책하기 적합하지 않습니다.';
    icon = '/weather/cold.png';
  } else if (temperature > 35) {
    recommendation =
      '🔥 너무 더운 날씨입니다. 산책 시 충분히 수분을 섭취하세요.';
    icon = '/weather/hot.png';
  } else if (condition === 'CLEAR') {
    recommendation = '☀️ 맑고 따뜻한 날씨입니다. 산책하기 좋습니다.';
    icon = '/weather/sunny.png';
  } else if (condition === 'PARTLY CLOUDY') {
    recommendation = '🌤️ 약간의 구름이 있지만 산책하기 좋은 날씨입니다.';
    icon = '/weather/partly cloudy.png';
  } else if (condition === 'CLOUDY') {
    recommendation = '🌥️ 흐린 날씨이지만 산책하기 무리는 없습니다.';
    icon = '/weather/cloudy.png';
  } else if (condition === 'SNOW') {
    recommendation = '❄️ 눈이 내려 산책에 주의가 필요합니다.';
    icon = '/weather/snow.png';
  } else if (condition === 'DRIZZLE') {
    recommendation = '🌦️ 가벼운 이슬비가 내립니다. 우산을 챙기세요.';
    icon = '/weather/drizzle.png';
  } else {
    recommendation = '날씨 정보를 기준으로 산책 여부를 판단하세요.';
    icon = '/weather/default.png';
  }

  return { recommendation, icon };
};

const WeatherSection = () => {
  const navigate = useNavigate();

  const [weather, setWeather] = useState({
    temperature: null,
    condition: null,
    recommendation: '날씨 정보를 가져오는 중입니다...',
    icon: '',
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('/api/weather');
        const data = await response.json();

        if (data.status === 'success') {
          const weatherData = data.data.weather;
          const { recommendation, icon } = getWalkingRecommendation(
            weatherData.condition,
            weatherData.rainProbability,
            weatherData.fineDust
          );

          setWeather({
            temperature: weatherData.temperature,
            condition: weatherData.condition,
            recommendation,
            icon,
          });
        }
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
        setWeather({
          temperature: '-',
          condition: 'UNKNOWN',
          recommendation: '날씨 정보를 가져오는 데 실패했습니다.',
          icon: '❌',
        });
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <WeatherContainer onClick={() => navigate('/weather')}>
      <Title>날씨</Title>
      <WeatherInfo>
        <WeatherRow>
          <WeatherIcon>{weather.icon}</WeatherIcon>
          <Temperature>
            {weather.temperature ? `${weather.temperature}°C` : '-'}
          </Temperature>
          <Description>{weather.recommendation}</Description>
        </WeatherRow>
      </WeatherInfo>
    </WeatherContainer>
  );
};

const NoticeSection = () => {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([
    { id: 1, date: '2024-11-01', postTitle: '공지 1', path: '/notice/1' },
    { id: 2, date: '2024-11-02', postTitle: '공지 2', path: '/notice/2' },
  ]);

  useEffect(() => {
    const fetchNoticeData = async () => {
      try {
        const response = await fetch('/api/notices');
        const data = await response.json();

        if (data.status === 'success') {
          setNotices(data.data.notices);
        }
      } catch (error) {
        console.error('공지 데이터를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchNoticeData();
  }, []);

  return (
    <>
      <NoticeHeader onClick={() => navigate('/notice')}>
        <NoticeTitle>공지사항</NoticeTitle>
        <NoticeArrow>›</NoticeArrow>
      </NoticeHeader>
      {notices.map((notice) => (
        <NoticePostItem key={notice.id} onClick={() => navigate(notice.path)}>
          <NoticeIcon />
          <div>
            <NoticePostTitle>{notice.postTitle}</NoticePostTitle>
            <NoticeDate>{notice.date}</NoticeDate>
          </div>
        </NoticePostItem>
      ))}
    </>
  );
};

const CustomerServiceSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <CustomerServiceHeader onClick={() => navigate('/customerservice')}>
        <CustomerServiceTitle>고객센터</CustomerServiceTitle>
        <CustomerServiceArrow>›</CustomerServiceArrow>
      </CustomerServiceHeader>
    </>
  );
};
