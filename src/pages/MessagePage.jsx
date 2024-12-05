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

const MessagePage = () => {
  const [replyMode, setReplyMode] = useState(false);
  const [currentReply, setCurrentReply] = useState(null);
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  // API 연결시 더미 데이터 삭제
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
    ],
  };

  const dummySent = {
    messages: [
      {
        id: 1,
        receiver: { id: 4, nickname: 'Alice' },
        content: '감사합니다!',
        created_at: '2024-12-02T12:45:00Z',
        is_read: true,
        formattedTimestamp: new Date('2024-12-02T12:45:00Z').toLocaleString(
          'ko-KR'
        ),
      },
    ],
  };
  // 여기까지 더미 데이터

  const {
    data: receivedMessages = dummyReceived,
    isLoading: receivedLoading,
    refetch: refetchReceived,
  } = useFetch('/api/messages/received', dummyReceived);

  const {
    data: sentMessages = dummySent,
    isLoading: sentLoading,
    refetch: refetchSent,
  } = useFetch('/api/messages/sent', dummySent);

  // API 연결 시 아래로 바꿈
  // const {
  //   data: receivedMessages = { messages: [] },
  //   isLoading: receivedLoading,
  //   refetch: refetchReceived,
  // } = useFetch('/api/messages/received', { messages: [] });

  // const {
  //   data: sentMessages = { messages: [] },
  //   isLoading: sentLoading,
  //   refetch: refetchSent,
  // } = useFetch('/api/messages/sent', { messages: [] });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const createMessage = async (receiverId, content) => {
    try {
      const response = await axiosInstance.post('/api/messages/', {
        receiver: receiverId,
        content,
      });
      if (response.status === 201) {
        showNotification('메시지가 성공적으로 전송되었습니다.', 'success');
        refetchSent();
      }
    } catch (error) {
      showNotification('메시지 전송 실패', 'error');
    }
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
      showNotification('읽음 처리 실패', 'error');
    }
  };

  const deleteMessage = async (messageId, type) => {
    try {
      const response = await axiosInstance.delete(
        `/api/messages/${messageId}/`
      );
      if (response.status === 204) {
        showNotification('메시지가 삭제되었습니다.', 'success');
        type === 'received' ? refetchReceived() : refetchSent();
      }
    } catch (error) {
      showNotification('삭제 실패', 'error');
    }
  };

  const handleReply = (messageId, sender) => {
    markMessageAsRead(messageId);
    setReplyMode(true);
    setCurrentReply(sender);
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      showNotification('메시지를 입력하세요.', 'error');
      return;
    }
    createMessage(currentReply.id, message);
    setReplyMode(false);
    setMessage('');
    setCurrentReply(null);
  };

  const handleCloseModal = () => {
    setReplyMode(false);
    setMessage('');
    setCurrentReply(null);
  };

  return (
    <MainPageWrapper>
      <Box />
      <Header title='쪽지함' />
      {receivedLoading || sentLoading ? (
        <Loading />
      ) : (
        <ContentSection>
          <MessageSection
            title='받은 쪽지함'
            messages={receivedMessages?.messages || []}
            type='received'
            onReply={handleReply}
            onDelete={(id) => deleteMessage(id, 'received')}
            navigateTo='/receivedmessages'
          />
          <MessageSection
            title='보낸 쪽지함'
            messages={sentMessages?.messages || []}
            type='sent'
            onDelete={(id) => deleteMessage(id, 'sent')}
            navigateTo='/sentmessages'
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

export default MessagePage;
