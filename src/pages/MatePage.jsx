import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Button from '../components/Button/Button';
import Header from '../components/Header';

const focusStyles = css`
  &:focus {
    outline: none;
    border: 2px solid #ffe29f;
    background-color: #fffef8;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`;

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
const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  display: block;
  cursor: pointer; /* 마우스 커서 추가 */
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

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
  user-select: none;
`;

const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: bold;
  color: #ffa726;
  margin-bottom: 15px;
`;

const MateList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  user-select: none;
`;

const MateItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MateProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #ddd;
`;

const MateName = styled.span`
  font-size: 14px;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  min-height: 150px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  font-size: 14px;
  box-sizing: border-box;
  resize: none;
  ${focusStyles}
`;

const ButtonRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InputSection = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  margin: 0px 10px 10px 10px;

  ${focusStyles}
`;

const dummyMates = [
  { id: 1, name: 'John', image: '/placeholder-image.png' },
  { id: 2, name: 'Jane', image: '/placeholder-image.png' },
];

const dummyMateRequests = [
  { id: 3, name: 'Mike', image: '/placeholder-image.png' },
  { id: 4, name: 'Anna', image: '/placeholder-image.png' },
];

const MatePage = () => {
  const [mates, setMates] = useState([]);
  const [mateRequests, setMateRequests] = useState([]);
  const [newMateName, setNewMateName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedMate, setSelectedMate] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  // 더미 데이터 및 API 데이터 불러오기
  const fetchMates = async () => {
    try {
      // 실제 API 호출 (예: const response = await fetch('/api/mates');)
      const response = []; // 현재 더미 데이터
      setMates(response.length > 0 ? response : dummyMates);
    } catch (error) {
      console.error('Failed to fetch mates:', error);
      setMates(dummyMates);
    }
  };

  const fetchMateRequests = async () => {
    try {
      // 실제 API 호출 (예: const response = await fetch('/api/mate-requests');)
      const response = []; // 현재 더미 데이터
      setMateRequests(response.length > 0 ? response : dummyMateRequests);
    } catch (error) {
      console.error('Failed to fetch mate requests:', error);
      setMateRequests(dummyMateRequests);
    }
  };

  useEffect(() => {
    fetchMates();
    fetchMateRequests();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  const handleAddMate = () => {
    if (!newMateName.trim()) {
      showNotification('닉네임을 입력해주세요!', 'error');
      return;
    }
    setMates((prevMates) => [
      { id: Date.now(), name: newMateName, image: '/placeholder-image.png' },
      ...prevMates,
    ]);
    setNewMateName('');
    showNotification('메이트가 추가되었습니다!', 'success');
  };

  const handleDeleteMate = (id) => {
    const mateToDelete = mates.find((mate) => mate.id === id);

    if (!mateToDelete) {
      showNotification('삭제할 메이트를 찾을 수 없습니다.', 'error');
      return;
    }

    setMates((prevMates) => prevMates.filter((m) => m.id !== id));
    showNotification(`${mateToDelete.name}님이 삭제되었습니다.`, 'success');
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      showNotification('메시지를 입력해주세요!', 'error');
      return;
    }

    console.log('Message sent to:', selectedMate.name, message);

    setMessage('');
    setSelectedMate(null);
    showNotification(
      `${selectedMate.name}님에게 쪽지가 성공적으로 전송되었습니다!`,
      'success'
    );
  };

  const handleAcceptRequest = (id) => {
    const acceptedMate = mateRequests.find((mate) => mate.id === id);
    if (acceptedMate) {
      setMates((prevMates) => [acceptedMate, ...prevMates]);
      setMateRequests((prevRequests) =>
        prevRequests.filter((mate) => mate.id !== id)
      );
      showNotification(
        `${acceptedMate.name}님의 요청을 수락했습니다.`,
        'success'
      );
    }
  };

  const handleRejectRequest = (id) => {
    setMateRequests((prevRequests) =>
      prevRequests.filter((mate) => mate.id !== id)
    );
    showNotification('요청을 거절했습니다.', 'error');
  };

  return (
    <MainPageWrapper>
      <Box />

      {notification.message && (
        <NotificationBox type={notification.type}>
          {notification.message}
        </NotificationBox>
      )}
      <Header title='메이트 🐾' />
      <ContentSection>
        {selectedMate && (
          <Section>
            <InputSection>
              <Label htmlFor='messageInput'>
                <SectionTitle>
                  {selectedMate.name}님에게 쪽지 보내기
                </SectionTitle>
              </Label>
              <Textarea
                id='messageInput'
                placeholder='내용을 입력하세요'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <ButtonRight>
                <Button variant='send' size='large' onClick={handleSendMessage}>
                  보내기
                </Button>
              </ButtonRight>
            </InputSection>
          </Section>
        )}

        <Section>
          <InputSection>
            <Label htmlFor='nicknameInput'>
              <SectionTitle>메이트 추가</SectionTitle>
            </Label>
            <Input
              id='nicknameInput'
              type='text'
              placeholder='닉네임을 입력하세요'
              value={newMateName}
              onChange={(e) => setNewMateName(e.target.value)}
            />
            <ButtonRight>
              <Button variant='send' size='small' onClick={handleAddMate}>
                추가
              </Button>
            </ButtonRight>
          </InputSection>
        </Section>

        <Section>
          <SectionTitle>메이트 신청 알림</SectionTitle>
          <MateList>
            {mateRequests.map((request) => (
              <MateItem key={request.id}>
                <MateProfile>
                  <ProfileImage
                    src={request.image}
                    alt={`${request.name} 프로필`}
                  />
                  <MateName>{request.name}</MateName>
                </MateProfile>
                <ButtonGroup>
                  <Button
                    variant='request'
                    size='small'
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    수락
                  </Button>
                  <Button
                    variant='cancel'
                    size='small'
                    onClick={() => handleRejectRequest(request.id)}
                  >
                    거절
                  </Button>
                </ButtonGroup>
              </MateItem>
            ))}
          </MateList>
        </Section>

        <Section>
          <SectionTitle>메이트 List</SectionTitle>
          <MateList>
            {mates.map((mate) => (
              <MateItem key={mate.id}>
                <MateProfile>
                  <ProfileImage src={mate.image} alt={`${mate.name} 프로필`} />
                  <MateName>{mate.name}</MateName>
                </MateProfile>
                <ButtonGroup>
                  <Button
                    variant='reply'
                    size='small'
                    onClick={() => setSelectedMate(mate)}
                  >
                    쪽지
                  </Button>
                  <Button
                    variant='cancel'
                    size='small'
                    onClick={() => handleDeleteMate(mate.id)}
                  >
                    삭제
                  </Button>
                </ButtonGroup>
              </MateItem>
            ))}
          </MateList>
        </Section>
      </ContentSection>
    </MainPageWrapper>
  );
};

export default MatePage;
