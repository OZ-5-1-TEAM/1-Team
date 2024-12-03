import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Button from '../components/Button/Button';
import Header from '../components/Header';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: { Authorization: `Bearer access_token_here` }, // 환경 변수로 관리 예정
});

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
  margin: 15px;
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

const SearchBarContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  margin: 10px;

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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMates, setFilteredMates] = useState([]); // 필터링된 결과 상태

  // 검색 처리 함수
  // const handleSearch = async () => {
  //   if (!searchQuery.trim()) {
  //     showNotification('검색어를 입력해주세요!', 'error');
  //     setFilteredMates(mates); // 검색어 없을 때 전체 표시
  //     return;
  //   }

  //   await fetchMates(searchQuery.trim()); // 검색어로 서버 요청
  // };

  //로컬 필터링만 사용하는 경우:
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      showNotification('검색어를 입력해주세요!', 'error');
      setFilteredMates(mates); // 검색어 없을 때 전체 표시
      return;
    }

    const result = mates.filter((mate) =>
      mate.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (result.length === 0) {
      showNotification('검색 결과가 없습니다.', 'error');
    } else {
      showNotification(`검색 결과: ${result.length}명`, 'success');
    }

    setFilteredMates(result);
  };

  useEffect(() => {
    const fetchInitialMates = async () => {
      try {
        // 우선 더미 데이터를 상태에 설정
        setMates(dummyMates);
        setFilteredMates(dummyMates);

        // API 호출 후 데이터를 상태에 업데이트
        const response = await api.get('/friends');
        setMates(response.data.friends || dummyMates);
        setFilteredMates(response.data.friends || dummyMates);
      } catch (error) {
        console.error('Failed to fetch mates:', error);
        // 에러가 발생해도 더미 데이터를 유지
        setMates(dummyMates);
        setFilteredMates(dummyMates);
      }
    };

    const fetchInitialMateRequests = async () => {
      try {
        const response = await api.get('/requests');
        setMateRequests(response.data.requests || dummyMateRequests);
      } catch (error) {
        console.error('Failed to fetch mate requests:', error);
        // 에러 발생 시 더미 요청 데이터 유지
        setMateRequests(dummyMateRequests);
      }
    };

    // 초기 데이터를 가져오는 함수 호출
    fetchInitialMates();
    fetchInitialMateRequests();
  }, []); // 의존성 배열에서 mates를 제거

  // 더미 데이터 및 API 데이터 불러오기
  const fetchMates = async (search = '') => {
    try {
      const response = await api.get('/friends', {
        params: { search },
      });
      setMates(response.data.friends || dummyMates); // API 데이터가 없으면 더미 데이터 사용
      setFilteredMates(response.data.friends || dummyMates);
    } catch (error) {
      console.error('Failed to fetch mates:', error);
      setMates(dummyMates); // 에러 발생 시 더미 데이터 유지
      setFilteredMates(dummyMates);
    }
  };

  // 친구 요청 목록 가져오기
  const fetchMateRequests = async () => {
    try {
      const response = await api.get('/requests');
      setMateRequests(response.data.requests || dummyMateRequests);
    } catch (error) {
      console.error('Failed to fetch mate requests:', error);
      setMateRequests(dummyMateRequests);
    }
  };
  // 친구 추가 요청 보내기
  const handleAddMate = async () => {
    if (!newMateName.trim()) {
      showNotification('닉네임을 입력해주세요!', 'error');
      return;
    }

    try {
      const receiverId = await fetchReceiverId(newMateName); // 닉네임 -> ID 변환
      if (!receiverId) {
        showNotification(
          '해당 닉네임을 가진 사용자를 찾을 수 없습니다.',
          'error'
        );
        setNewMateName(''); // 입력 필드 초기화

        return;
      }

      await api.post('/friends/requests', { receiver_id: receiverId });
      showNotification('친구 요청이 성공적으로 전송되었습니다!', 'success');
      setNewMateName(''); // 입력 필드 초기화
    } catch (error) {
      console.error('Failed to add mate:', error);
      showNotification(
        '메이트 추가 요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
        'error'
      );
    }
  };

  const fetchReceiverId = async (nickname) => {
    try {
      const response = await api.get(`/users?nickname=${nickname}`);
      return response.data.id; // 서버에서 반환된 ID
    } catch (error) {
      console.error('Failed to fetch receiver ID:', error);
      showNotification('닉네임을 찾을 수 없습니다.', 'error');
      return null;
    }
  };
  // 친구 요청 수락
  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await api.put(`/friends/requests/${requestId}`, {
        status: 'accepted',
      });
      if (response.status === 200) {
        const acceptedMate = mateRequests.find((mate) => mate.id === requestId);
        if (acceptedMate) {
          setMates((prevMates) => [acceptedMate, ...prevMates]);
          setMateRequests((prevRequests) =>
            prevRequests.filter((mate) => mate.id !== requestId)
          );
          showNotification(
            `${acceptedMate.name}님의 요청을 수락했습니다.`,
            'success'
          );
        }
      }
    } catch (error) {
      console.error('Failed to accept request:', error);
      showNotification('요청 수락에 실패했습니다.', 'error');
    }
  };

  // 친구 요청 거절
  const handleRejectRequest = async (requestId) => {
    try {
      const response = await api.put(`/friends/requests/${requestId}`, {
        status: 'rejected',
      });
      if (response.status === 200) {
        setMateRequests((prevRequests) =>
          prevRequests.filter((mate) => mate.id !== requestId)
        );
        showNotification('요청을 거절했습니다.', 'error');
      }
    } catch (error) {
      console.error('Failed to reject request:', error);
      showNotification('요청 거절에 실패했습니다.', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  useEffect(() => {
    fetchMates();
    fetchMateRequests();
  }, []);

  // 메이트 삭제
  const handleDeleteMate = async (id) => {
    const mateToDelete = mates.find((mate) => mate.id === id);

    if (!mateToDelete) {
      showNotification('삭제할 메이트를 찾을 수 없습니다.', 'error');
      return;
    }

    try {
      await api.delete(`/friends/${id}`);
      setMates((prevMates) => prevMates.filter((mate) => mate.id !== id));
      showNotification(`${mateToDelete.name}님이 삭제되었습니다.`, 'success');
    } catch (error) {
      console.error('Failed to delete mate:', error);
      showNotification('메이트 삭제에 실패했습니다.', 'error');
    }
  };

  // 메시지 전송
  const handleSendMessage = async () => {
    if (!selectedMate) {
      showNotification('쪽지를 보낼 메이트를 선택해주세요!', 'error');
      return;
    }
    if (!message.trim()) {
      showNotification('메시지를 입력해주세요!', 'error');
      return;
    }

    if (message.length > 500) {
      showNotification('메시지는 최대 500자까지 입력 가능합니다.', 'error');
      return;
    }

    try {
      await api.post('/messages', {
        receiver_id: selectedMate.id,
        content: message,
      });

      showNotification(
        `${selectedMate.name}님에게 쪽지가 성공적으로 전송되었습니다!`,
        'success'
      );
      setMessage('');
      setSelectedMate(null);
    } catch (error) {
      console.error('Failed to send message:', error);
      showNotification('쪽지 전송에 실패했습니다.', 'error');
    }
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
              value={newMateName || ''}
              onChange={(e) => setNewMateName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddMate();
                }
              }}
            />

            <ButtonRight>
              <Button variant='send' size='small' onClick={handleAddMate}>
                요청
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
          <SearchBarContainer>
            <SearchInput
              type='text'
              placeholder='검색할 닉네임을 입력하세요'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <ButtonRight>
              <Button
                variant='send'
                size='small'
                onClick={handleSearch}
                style={{ margin: '10px' }}
              >
                검색
              </Button>
            </ButtonRight>
          </SearchBarContainer>
          <MateList>
            {filteredMates.map((mate) => (
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
