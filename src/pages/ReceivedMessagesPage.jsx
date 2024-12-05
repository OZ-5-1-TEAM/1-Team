import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import axiosInstance from '../api/axiosInstance';
import Header from '../components/Header';
import MessageSection from '../components/Pages/MessagePage/MessageSection';
import MessageModal from '../components/Pages/MessagePage/MessageModal';
import Notification from '../components/Pages/MessagePage/Notification';
import {
  MainPageWrapper,
  Box,
  ContentSection,
  FixedImage,
} from '../components/Pages/MessagePage/Styles/MessageStyles';
import Loading from '../components/Loading';

const ReceivedMessagesPage = () => {
  //API 연결 시 더미 데이터 삭제

  const dummyReceived = {
    messages: [
      {
        id: 1,
        sender: {
          id: 2,
          nickname: 'John Doe',
          profile_image: '/logo/gaerangmari_logo.jpeg',
        },
        content: '안녕하세요, 산책 같이 하실래요?',
        created_at: '2024-12-02T15:00:00Z',
        is_read: false,
        formattedTimestamp: new Date('2024-12-02T15:00:00Z').toLocaleString(
          'ko-KR'
        ),
      },
      {
        id: 2,
        sender: {
          id: 3,
          nickname: 'Jane Smith',
          profile_image: '/logo/gaerangmari_logo.jpeg',
        },
        content: '회의 일정이 변경되었습니다.',
        created_at: '2024-12-03T09:30:00Z',
        is_read: true,
        formattedTimestamp: new Date('2024-12-03T09:30:00Z').toLocaleString(
          'ko-KR'
        ),
      },
    ],
  };

  const [replyMode, setReplyMode] = useState(false);
  const [currentReply, setCurrentReply] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const { data: receivedMessages = dummyReceived, isLoading: receivedLoading } =
    useFetch('/api/messages/received', dummyReceived);

  //API 연결 시 아래로 변경
  // const { data: receivedMessages = { messages: [] } } = useFetch('/api/messages/received', { messages: [] });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const markMessageAsRead = async (messageId) => {
    try {
      const response = await axiosInstance.put(
        `/api/messages/${messageId}/read/`
      );
      if (response.status === 200) {
        showNotification('메시지가 읽음 처리되었습니다.', 'success');
        refetchReceived();
      }
    } catch (error) {
      showNotification('읽음 처리에 실패했습니다.', 'error');
    }
  };

  const handleReply = (messageId, sender) => {
    markMessageAsRead(messageId);
    setReplyMode(true);
    setCurrentReply(sender);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      showNotification('메시지를 입력하세요.', 'error');
      return;
    }
    try {
      //  API 연동 시 주석 해제
      // const response = await api.post('/messages', {
      //   receiver_id: currentReply.id,
      //   content: message,
      // });
      // if (response.status === 201) {
      //   showNotification('메시지가 전송되었습니다!', 'success');
      //   setMessage('');
      //   setReplyMode(false);
      //   setCurrentReply(null);
      //   refetchSent();
      // }
      // IsLoading 빼주세요~~~~~ 프엔에서 관리하는게 더 좋아요
      // API 연동 시 아래 더미 로직 제거
      showNotification('메시지가 전송되었습니다!', 'success');
      setMessage('');
      setReplyMode(false);
      setCurrentReply(null);
      refetchSent();

      const response = await axiosInstance.post('/api/messages/', {
        receiver: currentReply.id,
        content: message,
      });
      if (response.status === 201) {
        showNotification('메시지가 성공적으로 전송되었습니다!', 'success');
        setReplyMode(false);
        setMessage('');
        setCurrentReply(null);
      }
    } catch (error) {
      showNotification('메시지 전송에 실패했습니다.', 'error');
    }
  };

  const handleCloseModal = () => {
    setReplyMode(false);
    setMessage('');
    setCurrentReply(null);
  };

  return (
    <MainPageWrapper>
      <Box />
      <Header title='받은 쪽지함' />
      {receivedLoading ? (
        <Loading />
      ) : (
        <ContentSection>
          <MessageSection
            title=''
            messages={receivedMessages?.messages || []}
            type='received'
            onReply={handleReply}
            onDelete={(id) =>
              showNotification(`메시지 ID ${id}가 삭제되었습니다.`, 'success')
            }
          />
        </ContentSection>
      )}
      {replyMode && (
        <MessageModal
          visible={replyMode}
          currentReply={currentReply}
          message={message}
          onChange={(e) => setMessage(e.target.value)}
          onSend={handleSendMessage}
          onClose={handleCloseModal}
        />
      )}

      <Notification {...notification} />
      <FixedImage src='/icon-192x192.webp' alt='dog foot icon' />
    </MainPageWrapper>
  );
};

export default ReceivedMessagesPage;
