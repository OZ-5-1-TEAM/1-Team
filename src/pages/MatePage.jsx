import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import useFetch from '../hooks/useFetch'; // useFetch 활용
import api from '../api/axiosInstance'; // axiosInstance 활용
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

const MatePage = () => {
  // 더미 데이터
  const dummyMates = [
    { id: 1, name: 'John', image: '/placeholder-image.png' },
    { id: 2, name: 'Jane', image: '/placeholder-image.png' },
  ];

  const dummyMateRequests = [
    { id: 3, name: 'Mike', image: '/placeholder-image.png' },
    { id: 4, name: 'Anna', image: '/placeholder-image.png' },
  ];

  // 친구 목록 및 요청 목록 관리
  const {
    data: matesData,
    isLoading: matesLoading,
    refetch: refetchMates,
  } = useFetch('/api/friends/', dummyMates);
  const {
    data: requestsData,
    isLoading: requestsLoading,
    refetch: refetchRequests,
  } = useFetch('/api/friends/request/', dummyMateRequests);

  const [newMateName, setNewMateName] = useState(''); // 새로운 친구 추가
  const [message, setMessage] = useState(''); // 쪽지 내용
  const [selectedMate, setSelectedMate] = useState(null); // 선택된 친구
  const [notification, setNotification] = useState({ message: '', type: '' }); // 알림 메시지
  const [searchQuery, setSearchQuery] = useState(''); // 검색 쿼리
  const [filteredMates, setFilteredMates] = useState(dummyMates); // 필터된 친구 목록
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false); // 메시지 모달 상태

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  // 친구 요청 보내기
  const handleAddMate = async () => {
    if (!newMateName.trim()) {
      showNotification('닉네임을 입력해주세요!', 'error');
      return;
    }

    try {
      const response = await api.post('/api/friends/request/', {
        to_user: newMateName,
      });

      if (response.status === 201) {
        showNotification('친구 요청이 성공적으로 전송되었습니다!', 'success');
        setNewMateName('');
        refetchRequests(); // 요청 목록 새로고침
      }
    } catch (error) {
      console.error('친구 요청 실패:', error);
      showNotification('메이트 추가 요청에 실패했습니다.', 'error');
    }
  };

  // 친구 요청 수락
  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await api.put(`/api/friends/${requestId}/`, {
        status: 'accepted',
      });

      if (response.status === 200) {
        refetchMates(); // 친구 목록 새로고침
        refetchRequests(); // 요청 목록 새로고침
        showNotification('친구 요청을 수락했습니다.', 'success');
      }
    } catch (error) {
      console.error('요청 수락 실패:', error);
      showNotification('요청 수락에 실패했습니다.', 'error');
    }
  };

  // 친구 요청 거절
  const handleRejectRequest = async (requestId) => {
    try {
      const response = await api.put(`/api/friends/${requestId}/`, {
        status: 'rejected',
      });

      if (response.status === 200) {
        refetchRequests(); // 요청 목록 새로고침
        showNotification('요청을 거절했습니다.', 'success');
      }
    } catch (error) {
      console.error('요청 거절 실패:', error);
      showNotification('요청 거절에 실패했습니다.', 'error');
    }
  };

  // 친구 삭제
  const handleDeleteMate = async (id) => {
    try {
      await api.put(`/api/friends/${id}/`, { status: 'rejected' });
      refetchMates(); // 친구 목록 새로고침
      showNotification('메이트가 삭제되었습니다.', 'success');
    } catch (error) {
      console.error('메이트 삭제 실패:', error);
      showNotification('메이트 삭제에 실패했습니다.', 'error');
    }
  };

  // 검색 기능
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      showNotification('검색어를 입력해주세요!', 'error');
      setFilteredMates(matesData || dummyMates);
      return;
    }

    const result = (matesData || dummyMates).filter((mate) =>
      mate.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (result.length === 0) {
      showNotification('검색 결과가 없습니다.', 'error');
    } else {
      showNotification(`검색 결과: ${result.length}명`, 'success');
    }

    setFilteredMates(result);
  };

  // 쪽지 전송
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
        receiver: selectedMate.id,
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

  useEffect(() => {
    setFilteredMates(matesData || dummyMates); // 초기 데이터 설정
  }, [matesData]);

  return (
    <MainPageWrapper>
      <MatePageHeader notification={notification} />
      <ContentSection>
        <MateSection
          mateRequests={requestsData || dummyMateRequests}
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
