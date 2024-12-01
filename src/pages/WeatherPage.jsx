import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Header from '../components/Header';
import PropTypes from 'prop-types';

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
  height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 63px;
  position: relative;
  animation: ${fadeIn} 0.5s ease;

  @media (max-width: 480px) {
    padding: 10px;
    box-shadow: none;
  }
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: calc(100vh - 200px);
  padding-top: 40px;
  box-sizing: border-box;
  text-align: center;
`;

const WeatherIconContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100%;
  max-height: 250px;
  background-color: #fffef8;
  border: 2px solid #ffe29f;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
  img {
    width: 70%;
    height: auto;
  }
`;

const WeatherCard = styled.div`
  background-color: #fffdf5;
  border: 2px solid #ffd591;
  border-radius: 15px;
  width: 100%;
  max-width: 320px;
  padding: 25px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  text-align: center;
  margin: 30px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const Temperature = styled.h2`
  font-size: 64px;
  font-weight: bold;
  color: #ff9900;
  margin: 0;
`;

const WeatherCondition = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #ff8c00;
  margin: 15px 0;
`;

const WeatherDetails = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  padding: 5px 10px;
  border-bottom: 1px solid #ddd;
`;

const Recommendation = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #ff7f50;
  background-color: #fffdf5;
  border-radius: 10px;
  padding: 15px;
  border: 2px #ffd591;
  margin: 10px 30px 30px 30px;
  border-style: solid;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const FixedImage = styled.img`
  position: absolute;
  bottom: 100px;
  right: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const LoadingMessage = styled.p`
  font-size: 18px;
  color: #666666;
  font-style: italic;
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  color: #ff4d4d;
  font-weight: bold;
`;

const recommendationByCondition = {
  storm: {
    message: '⛈️ 폭우가 내리고 있어 산책하기 적합하지 않은 날씨입니다.',
    icon: '/weather/storm.png',
  },
  rain: {
    message: '🌧️ 비가 와서 산책을 피하는 것이 좋습니다.',
    icon: '/weather/rainy.png',
  },
  veryBadDust: {
    message: '😷 미세먼지가 매우 나빠서 외출을 자제하세요.',
    icon: '/weather/dusty.png',
  },
  badDust: {
    message: '😷 미세먼지가 나빠 산책을 자제하는 것이 좋습니다.',
    icon: '/weather/dusty.png',
  },
  cold: {
    message: '❄️ 기온이 매우 낮아 산책하기 적합하지 않습니다.',
    icon: '/weather/cold.png',
  },
  hot: {
    message: '🔥 너무 더운 날씨입니다. 산책 시 충분히 수분을 섭취하세요.',
    icon: '/weather/hot.png',
  },
  clear: {
    message: '☀️ 맑고 따뜻한 날씨입니다. 산책하기 좋습니다.',
    icon: '/weather/sunny.png',
  },
  partlyCloudy: {
    message: '🌤️ 약간의 구름이 있지만 산책하기 좋은 날씨입니다.',
    icon: '/weather/partly cloudy.png',
  },
  cloudy: {
    message: '🌥️ 흐린 날씨이지만 산책하기 무리는 없습니다.',
    icon: '/weather/cloudy.png',
  },
  snow: {
    message: '❄️ 눈이 내려 산책에 주의가 필요합니다.',
    icon: '/weather/snow.png',
  },
  drizzle: {
    message: '🌦️ 가벼운 이슬비가 내립니다. 우산을 챙기세요.',
    icon: '/weather/drizzle.png',
  },
  default: {
    message: '날씨 정보를 기준으로 산책 여부를 판단하세요.',
    icon: '/weather/default.png',
  },
};

// 산책 추천 함수 정의
const getWalkingRecommendation = ({
  condition,
  rainProbability,
  fineDust,
  temperature,
}) => {
  // 조건별 매핑
  if (
    rainProbability > 70 ||
    ['THUNDERSTORM', 'HEAVY RAIN'].includes(condition)
  ) {
    return recommendationByCondition.storm;
  }

  if (condition === 'RAIN') {
    return recommendationByCondition.rain;
  }

  if (fineDust === 'VERY BAD') {
    return recommendationByCondition.veryBadDust;
  }

  if (fineDust === 'BAD') {
    return recommendationByCondition.badDust;
  }

  if (temperature < 0) {
    return recommendationByCondition.cold;
  }

  if (temperature > 35) {
    return recommendationByCondition.hot;
  }

  const conditionMapping = {
    CLEAR: recommendationByCondition.clear,
    'PARTLY CLOUDY': recommendationByCondition.partlyCloudy,
    CLOUDY: recommendationByCondition.cloudy,
    SNOW: recommendationByCondition.snow,
    DRIZZLE: recommendationByCondition.drizzle,
  };

  return conditionMapping[condition] || recommendationByCondition.default;
};

getWalkingRecommendation.propTypes = {
  condition: PropTypes.string.isRequired,
  rainProbability: PropTypes.number.isRequired,
  fineDust: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
};

function WeatherPage() {
  const [weather, setWeather] = useState({
    temperature: null,
    condition: null,
    wind: null,
    humidity: null,
    fineDust: null,
    rainProbability: null,
    recommendation: '날씨 정보를 가져오는 중입니다...',
    icon: '/icons/default.png',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);

        const dummyData = {
          temperature: 36,
          condition: 'SNOW',
          rainProbability: 10,
          fineDust: 'GOOD',
          wind: '10 km/h',
          humidity: '54%',
        };

        const { recommendation, icon } = getWalkingRecommendation(
          dummyData.condition,
          dummyData.rainProbability,
          dummyData.fineDust,
          dummyData.temperature
        );

        setWeather({
          ...dummyData,
          recommendation,
          icon,
        });
        setError(null);
      } catch (err) {
        setError('날씨 정보를 가져오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <MainPageWrapper>
      <Box />
      <Header title='WEATHER ☀️' />
      <ContentSection>
        {loading ? (
          <LoadingMessage>로딩 중...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <>
            <WeatherIconContainer>
              <img src={weather.icon} alt={weather.condition} />
            </WeatherIconContainer>
            <WeatherCard>
              <Temperature>{weather.temperature}°C</Temperature>
              <WeatherCondition>{weather.condition}</WeatherCondition>
              <WeatherDetails>
                <DetailItem>
                  <span>Wind:</span>
                  <span>{weather.wind}</span>
                </DetailItem>
                <DetailItem>
                  <span>Humidity:</span>
                  <span>{weather.humidity}</span>
                </DetailItem>
                <DetailItem>
                  <span>Fine Dust:</span>
                  <span>{weather.fineDust}</span>
                </DetailItem>
                <DetailItem>
                  <span>Rain Probability:</span>
                  <span>{weather.rainProbability}%</span>
                </DetailItem>
              </WeatherDetails>
            </WeatherCard>
            <Recommendation>{weather.recommendation}</Recommendation>
          </>
        )}
      </ContentSection>
      <FixedImage src='/icon-192x192.webp' alt='dog foot icon' />
    </MainPageWrapper>
  );
}

export default WeatherPage;
