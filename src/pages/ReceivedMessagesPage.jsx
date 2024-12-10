import React, { useState, useEffect } from 'react';
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
  const [replyMode, setReplyMode] = useState(false);
  const [currentReply, setCurrentReply] = useState(null);
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [receivedMessages, setReceivedMessages] = useState({ messages: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const fetchMessages = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await axiosInstance.get('/v1/messages/received/');
      console.log('API Response:', response);

      if (response.data) {
        setReceivedMessages(response.data);
      } else {
        throw new Error('데이터가 비어있습니다.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
      showNotification(
        '메시지를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markMessageAsRead = async (messageId) => {
    try {
      const response = await axiosInstance.put(
        `/v1/messages/${messageId}/read/`
      );
      if (response.status === 200) {
        showNotification('메시지가 읽음 처리되었습니다.', 'success');
        fetchMessages();
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
      const response = await axiosInstance.post('/v1/messages/', {
        receiver: currentReply.id,
        content: message,
      });

      if (response.status === 201) {
        showNotification('메시지가 전송되었습니다!', 'success');
        setMessage('');
        setReplyMode(false);
        setCurrentReply(null);
        fetchMessages();
      }
    } catch (error) {
      showNotification('메시지 전송에 실패했습니다.', 'error');
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await axiosInstance.delete(`/v1/messages/${id}/`);
      if (response.status === 204) {
        showNotification('메시지가 삭제되었습니다.', 'success');
        fetchMessages();
      }
    } catch (error) {
      showNotification('메시지 삭제에 실패했습니다.', 'error');
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
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ContentSection>
          <div>에러가 발생했습니다. {error}</div>
        </ContentSection>
      ) : (
        <ContentSection>
          <MessageSection
            title=''
            messages={receivedMessages?.messages || []}
            type='received'
            onReply={handleReply}
            onDelete={deleteMessage}
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
