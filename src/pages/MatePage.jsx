import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import api from '../api/axiosInstance';
import MatePageHeader from '../components/Pages/MatePage/MatePageHeader';
import MessageModal from '../components/Pages/MessagePage/MessageModal';
import MateSection from '../components/Pages/MatePage/MateSection';

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
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

// ✅ 1. 더미 데이터로 초기 상태 설정
const dummyMates = [
  { id: 1, name: 'John', image: '/placeholder-image.png' },
  { id: 2, name: 'Jane', image: '/placeholder-image.png' },
];

const dummyMateRequests = [
  { id: 3, name: 'Mike', image: '/placeholder-image.png' },
  { id: 4, name: 'Anna', image: '/placeholder-image.png' },
];

const MatePage = () => {
  // ✅ 2. React 상태로 데이터 관리
  // API 연결 이후 데이터를 업데이트할 수 있도록 상태 변수를 설정
  const [mates, setMates] = useState(dummyMates); // 친구 목록
  const [mateRequests, setMateRequests] = useState(dummyMateRequests); // 친구 요청 목록
  // const [mates, setMates] = useState([]);
  // const [mateRequests, setMateRequests] = useState([]);

  const [newMateName, setNewMateName] = useState(''); // 새로운 친구 추가
  const [message, setMessage] = useState(''); // 쪽지 내용
  const [selectedMate, setSelectedMate] = useState(null); // 선택된 친구
  const [notification, setNotification] = useState({ message: '', type: '' }); // 알림 메시지
  const [searchQuery, setSearchQuery] = useState(''); // 검색 쿼리
  const [filteredMates, setFilteredMates] = useState(dummyMates); // 필터된 친구 목록
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false); // 메시지 모달 상태

  // ✅ 3. 알림 표시 함수
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  // ✅ 4. API로 초기 데이터 가져오기
  // 컴포넌트가 처음 로드될 때 `useEffect`를 사용해 API에서 데이터를 불러옴
  const fetchInitialData = async () => {
    try {
      // 🔹 친구 목록 가져오기
      const friendsResponse = await api.get('/api/friends/');
      const formattedMates = friendsResponse.data.map((item) => ({
        id: item.friend.id, // API 응답 데이터에서 id 추출
        name: item.friend.nickname, // 닉네임 추출
        image: '/placeholder-image.png', // 이미지 (더미 값 사용)
      }));
      setMates(formattedMates);
      setFilteredMates(formattedMates);

      // 🔹 친구 요청 목록 가져오기
      const requestsResponse = await api.get('/api/friends/request/');
      const formattedRequests = requestsResponse.data.map((item) => ({
        id: item.id,
        name: item.friend.nickname,
        image: '/placeholder-image.png',
      }));
      setMateRequests(formattedRequests);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      showNotification('데이터를 불러오는데 실패했습니다.', 'error');
    }
  };

  // ✅ 5. 친구 요청 보내기
  // 새로운 친구 요청을 추가
  const handleAddMate = async () => {
    if (!newMateName.trim()) {
      showNotification('닉네임을 입력해주세요!', 'error');
      return;
    }

    try {
      const response = await api.post('/api/friends/request/', {
        to_user: newMateName, // 사용자 ID 전달
      });

      if (response.status === 201) {
        showNotification('친구 요청이 성공적으로 전송되었습니다!', 'success');
        setNewMateName('');
      }
    } catch (error) {
      console.error('친구 요청 실패:', error);
      showNotification('메이트 추가 요청에 실패했습니다.', 'error');
    }
  };

  // ✅ 6. 친구 요청 수락
  // 특정 요청 ID를 사용해 친구 요청을 수락
  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await api.put(`/api/friends/${requestId}/`, {
        status: 'accepted', // 요청 상태를 'accepted'로 변경
      });

      if (response.status === 200) {
        const acceptedMate = mateRequests.find((mate) => mate.id === requestId);
        setMates((prevMates) => [
          ...prevMates,
          {
            id: acceptedMate.id,
            name: acceptedMate.name,
            image: acceptedMate.image,
          },
        ]);
        setMateRequests((prevRequests) =>
          prevRequests.filter((mate) => mate.id !== requestId)
        );
        showNotification('친구 요청을 수락했습니다.', 'success');
      }
    } catch (error) {
      console.error('요청 수락 실패:', error);
      showNotification('요청 수락에 실패했습니다.', 'error');
    }
  };

  // ✅ 7. 친구 요청 거절
  // 특정 요청 ID를 사용해 친구 요청을 거절
  const handleRejectRequest = async (requestId) => {
    try {
      const response = await api.put(`/api/friends/${requestId}/`, {
        status: 'rejected', // 요청 상태를 'rejected'로 변경
      });

      if (response.status === 200) {
        setMateRequests((prevRequests) =>
          prevRequests.filter((mate) => mate.id !== requestId)
        );
        showNotification('요청을 거절했습니다.', 'error');
      }
    } catch (error) {
      console.error('요청 거절 실패:', error);
      showNotification('요청 거절에 실패했습니다.', 'error');
    }
  };

  // ✅ 8. 친구 삭제
  // 친구를 삭제하거나 요청을 취소
  const handleDeleteMate = async (id) => {
    try {
      await api.put(`/api/friends/${id}/`, { status: 'rejected' });
      setMates((prevMates) => prevMates.filter((mate) => mate.id !== id));
      showNotification('메이트가 삭제되었습니다.', 'success');
    } catch (error) {
      console.error('메이트 삭제 실패:', error);
      showNotification('메이트 삭제에 실패했습니다.', 'error');
    }
  };

  // ✅ 9. 검색 기능
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      showNotification('검색어를 입력해주세요!', 'error');
      setFilteredMates(mates);
      return;
    }
    // if (!searchQuery.trim()) {
    //   setFilteredMates(mates);
    //   return;
    // }

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

  // ✅ 10. 쪽지 전송
  const handleSendMessage = async () => {
    if (!selectedMate) {
      showNotification('쪽지를 보낼 메이트를 선택해주세요!', 'error');
      return;
    }
    if (!message.trim()) {
      showNotification('메시지를 입력해주세요!', 'error');
      return;
    }

    try {
      await api.post('/api/messages/', {
        receiver_id: selectedMate.id,
        content: message,
      });

      showNotification('쪽지가 성공적으로 전송되었습니다!', 'success');
      setMessage('');
      setSelectedMate(null);
      setIsMessageModalVisible(false);
    } catch (error) {
      console.error('쪽지 전송 실패:', error);
      showNotification('쪽지 전송에 실패했습니다.', 'error');
    }
  };

  // ✅ 11. 컴포넌트가 로드되면 초기 데이터 가져오기
  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <MainPageWrapper>
      <MatePageHeader notification={notification} />
      <ContentSection>
        <MateSection
          mateRequests={mateRequests}
          handleAcceptRequest={handleAcceptRequest}
          handleRejectRequest={handleRejectRequest}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          filteredMates={filteredMates}
          setSelectedMate={(mate) => {
            setSelectedMate(mate);
            setIsMessageModalVisible(true);
          }}
          handleDeleteMate={handleDeleteMate}
          newMateName={newMateName}
          setNewMateName={setNewMateName}
          handleAddMate={handleAddMate}
        />
      </ContentSection>
      <MessageModal
        visible={isMessageModalVisible}
        currentReply={selectedMate}
        message={message}
        onChange={(e) => setMessage(e.target.value)}
        onSend={handleSendMessage}
        onClose={() => {
          setIsMessageModalVisible(false);
          setSelectedMate(null);
          setMessage('');
        }}
      />
    </MainPageWrapper>
  );
};

export default MatePage;
