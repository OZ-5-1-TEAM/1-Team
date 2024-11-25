import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 전체 페이지 레이아웃 스타일
// 페이지가 화면 중앙에 위치하도록 flexbox를 사용하며, 배경색과 전체 크기를 설정
const StartPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
`;

// 앱 이름 스타일
// 텍스트 크기와 색상을 강조하여 시각적으로 돋보이게 설정
const Title = styled.h1`
  font-size: 48px; /* 크기를 키움 */
  font-weight: bold;
  color: #f59e0b;
  margin-bottom: 40px; /* 여백을 더 추가 */
`;

// 버튼 섹션 스타일
// 버튼 그룹을 감싸는 박스에 배경색, 패딩, 그림자를 추가하여 디자인 개선
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px; /* 버튼 사이의 간격을 넓힘 */
  background-color: #fffbea;
  padding: 30px; /* 박스 내부 여백을 키움 */
  border-radius: 20px; /* 박스의 모서리를 둥글게 설정 */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15); /* 그림자를 더 두드러지게 */
`;

// 버튼 스타일
// 버튼 크기와 폰트 크기를 키우고, 호버 효과로 인터랙션 추가
const Button = styled.button`
  width: 300px; /* 버튼 너비를 더 키움 */
  height: 60px; /* 버튼 높이를 더 키움 */
  background-color: #f59e0b;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 20px; /* 폰트 크기를 키움 */
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d97706; /* 버튼 호버 시 색상을 어둡게 */
  }
`;

function StartPage() {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션 훅

  return (
    <StartPageWrapper>
      {/* 중앙 타이틀 */}
      <Title>GAERANG MARI</Title>
      <ButtonWrapper>
        {/* 각 버튼을 클릭하면 해당 경로로 이동 */}
        <Button onClick={() => navigate('/login')}>EMAIL LOGIN</Button>
        <Button onClick={() => navigate('/join')}>JOIN</Button>
      </ButtonWrapper>
    </StartPageWrapper>
  );
}

export default StartPage;
