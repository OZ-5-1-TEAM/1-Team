import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import useFetch from '../hooks/useFetch';
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

const MatePage = () => {
  const [matesData, setMatesData] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  const [newMateName, setNewMateName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedMate, setSelectedMate] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMates, setFilteredMates] = useState([]);
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const fetchMates = async () => {
    try {
      const response = await api.get('/v1/friends/');
      const mates = Array.isArray(response.data) ? response.data : [];
      setMatesData(mates);
      setFilteredMates(mates);
    } catch (error) {
      console.error('친구 목록 조회 실패:', error);
      setMatesData([]);
      setFilteredMates([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await api.get('/v1/friends/');
      const requests = Array.isArray(response.data)
        ? response.data.filter((friend) => friend.status === 'pending')
        : [];
      setRequestsData(requests);
    } catch (error) {
      console.error('친구 요청 목록 조회 실패:', error);
      setRequestsData([]);
    }
  };

  useEffect(() => {
    fetchMates();
    fetchRequests();
  }, []);

  const handleAddMate = async () => {
    if (!newMateName.trim()) {
      showNotification('닉네임을 입력해주세요!', 'error');
      return;
    }

    try {
      const response = await api.post('/v1/friends/request/', {
        to_user: newMateName,
      });

      if (response.status === 201) {
        showNotification('친구 요청이 성공적으로 전송되었습니다!', 'success');
        setNewMateName('');
        fetchRequests();
      }
    } catch (error) {
      showNotification('메이트 추가 요청에 실패했습니다.', 'error');
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await api.put(`/v1/friends/${requestId}/`, {
        status: 'accepted',
      });

      if (response.status === 200) {
        fetchMates();
        fetchRequests();
        showNotification('친구 요청을 수락했습니다.', 'success');
      }
    } catch (error) {
      showNotification('요청 수락에 실패했습니다.', 'error');
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      const response = await api.put(`/v1/friends/${requestId}/`, {
        status: 'rejected',
      });

      if (response.status === 200) {
        fetchRequests();
        showNotification('요청을 거절했습니다.', 'success');
      }
    } catch (error) {
      showNotification('요청 거절에 실패했습니다.', 'error');
    }
  };

  const handleDeleteMate = async (id) => {
    try {
      await api.put(`/v1/friends/${id}/`, { status: 'rejected' });
      fetchMates();
      showNotification('메이트가 삭제되었습니다.', 'success');
    } catch (error) {
      showNotification('메이트 삭제에 실패했습니다.', 'error');
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredMates(matesData);
      return;
    }

    const result =
      matesData.filter((mate) =>
        mate?.friend?.nickname
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) || [];

    setFilteredMates(result);
  };

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
      await api.post('/v1/messages/', {
        receiver: selectedMate.friend.id,
        content: message,
      });

      showNotification('쪽지가 성공적으로 전송되었습니다!', 'success');
      setMessage('');
      setSelectedMate(null);
      setIsMessageModalVisible(false);
    } catch (error) {
      showNotification('쪽지 전송에 실패했습니다.', 'error');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MainPageWrapper>
      <MatePageHeader notification={notification} />
      <ContentSection>
        <MateSection
          mateRequests={requestsData || []}
          handleAcceptRequest={handleAcceptRequest}
          handleRejectRequest={handleRejectRequest}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          filteredMates={filteredMates || []}
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
