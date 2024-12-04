import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Button from '../components/Button/Button';
import Header from '../components/Header';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});
const getToken = () => localStorage.getItem('access_token');
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const boxStyles = css`
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

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

const Notification = styled.div`
  ${boxStyles}
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ type }) =>
    type === 'success' ? '#ff9900' : '#ffe082'};
  color: white;
  padding: 15px 20px;
  animation:
    ${slideDown} 0.5s ease,
    fadeOut 0.5s ease 3s;
  z-index: 10000;
  user-select: none;
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`;

const Box = styled.div`
  width: 100%;
  height: 130px;
  background-color: transparent;
  display: block;
`;

const ReceivedMessagesWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
  ${boxStyles}
  padding-bottom: 63px;
  flex-direction: column;
  animation: ${fadeIn} 0.5s ease;
  user-select: none;

  @media (max-width: 480px) {
    padding: 10px;
    box-shadow: none;
  }
`;

const ContentSection = styled.section`
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MessageList = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MessageItem = styled.li`
  ${boxStyles}
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 15px;
  margin-bottom: 10px;
  background-color: #ffffff;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
`;

const MessageSender = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #555;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  span {
    display: block;
    font-weight: bold;
  }
`;

const MessageTimestamp = styled.span`
  font-size: 14px;
  color: #dfa700;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const SenderName = styled.h3`
  font-size: 18px;
  color: #ff9900;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #888;

  &:hover {
    color: #000;
  }
`;

const ModalBody = styled.div`
  margin-top: 15px;
  font-size: 16px;
  color: #333;
  line-height: 1.6;
`;

const ReplyBox = styled.div`
  margin-top: 20px;
`;

const ReplyInput = styled.textarea`
  width: 100%;
  min-height: 150px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 15px;
  box-sizing: border-box;
  resize: none;
  ${focusStyles}
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const dummyMessages = [
  {
    id: 1,
    sender: {
      id: 2,
      nickname: 'John Doe',
      profile_image: '/logo/gaerangmari_logo.jpeg',
    },
    created_at: '2024-12-03T12:00:00Z',
    content: 'Hello! How are you?',
    is_read: false,
  },
  {
    id: 2,
    sender: {
      id: 3,
      nickname: 'Jane Smith',
      profile_image: '/logo/gaerangmari_logo.jpeg',
    },
    created_at: '2024-12-03T18:30:00Z',
    content: 'Meeting rescheduled to tomorrow at 10 AM.',
    is_read: true,
  },
];
const ReceivedMessages = () => {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const fetchMessages = async () => {
    try {
      const { data } = await api.get('/messages/received', {
        params: { page: 1, size: 20, sort: 'created_at,desc' },
      });

      const sortedMessages = data.messages
        .map((msg) => ({
          ...msg,
          formattedTimestamp: new Date(msg.created_at).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        }))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setReceivedMessages(sortedMessages);
    } catch (error) {
      showNotification(
        '쪽지 가져오기 실패! 기본 더미 데이터 사용 중.',
        'error'
      );
      const sortedMessages = dummyMessages
        .map((msg) => ({
          ...msg,
          formattedTimestamp: new Date(msg.created_at).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        }))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setReceivedMessages(sortedMessages);
    }
  };

  const markMessageAsRead = async (id) => {
    try {
      await api.put(`messages/${id}/read`, null, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setReceivedMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, is_read: true } : msg))
      );
    } catch (error) {
      const errorMessage = error.response?.data?.message || '읽음 처리 실패!';
      showNotification(errorMessage, 'error');
    }
  };

  const handleSelectMessage = (message) => {
    if (!message.is_read) {
      markMessageAsRead(message.id);
    }
    setSelectedMessage(message);
  };

  const handleDeleteMessage = async (id) => {
    try {
      await api.delete(`/messages/${id}`);
      setReceivedMessages((prev) =>
        prev.filter((message) => message.id !== id)
      );
      showNotification('메시지가 삭제되었습니다!', 'success');
    } catch (error) {
      showNotification('메시지 삭제 실패!', 'error');
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyMessage.trim()) {
      showNotification('답장 내용을 입력하세요.', 'error');
      return;
    }
    if (replyMessage.length > 500) {
      showNotification('최대 500자까지 입력 가능합니다.', 'error');
      return;
    }
    try {
      await api.post('/messages', {
        receiver_id: selectedMessage.sender.id,
        content: replyMessage,
      });

      showNotification('답장이 전송되었습니다!', 'success');
      setReplyMessage('');
      setSelectedMessage(null);
    } catch (error) {
      showNotification('답장 전송 실패!', 'error');
    }
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
    setReplyMessage('');
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <ReceivedMessagesWrapper>
      <Box />
      <Header title='받은 쪽지함' />
      <ContentSection>
        <MessageList>
          {receivedMessages.map((message) => (
            <MessageItem
              key={message.id}
              onClick={() => handleSelectMessage(message)}
            >
              <MessageContent>
                <MessageSender>
                  <img
                    src={
                      message.sender.profile_image ||
                      '/logo/gaerangmari_logo.jpeg'
                    }
                    alt={`${message.sender.nickname} 프로필`}
                  />
                  <div>
                    <span>{message.sender.nickname}</span>
                    <MessageTimestamp>
                      {message.formattedTimestamp}
                    </MessageTimestamp>
                  </div>
                </MessageSender>
              </MessageContent>
              <ButtonGroup>
                <Button
                  variant='cancel'
                  size='small'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMessage(message.id);
                  }}
                >
                  삭제
                </Button>
              </ButtonGroup>
            </MessageItem>
          ))}
        </MessageList>
      </ContentSection>

      {selectedMessage && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <SenderName>{selectedMessage.sender.nickname}</SenderName>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
            </ModalHeader>
            <ModalBody>{selectedMessage.content}</ModalBody>
            <ReplyBox>
              <ReplyInput
                placeholder='답장 내용을 입력하세요...'
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
            </ReplyBox>
            <ModalButtonGroup>
              <Button variant='reply' size='small' onClick={handleReply}>
                답장
              </Button>
              <Button variant='cancel' size='small' onClick={handleCloseModal}>
                닫기
              </Button>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}

      {notification.message && (
        <Notification type={notification.type}>
          {notification.message}
        </Notification>
      )}
    </ReceivedMessagesWrapper>
  );
};

export default ReceivedMessages;
