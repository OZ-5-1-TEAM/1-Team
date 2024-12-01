import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Button from '../components/Button/Button';
import Header from '../components/Header';

const boxStyles = css`
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  z-index: 1000;
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

const SentMessagesWrapper = styled.div`
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
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  margin-bottom: 10px;
  background-color: ${({ isSelected }) => (isSelected ? '#ffefc0' : '#ffffff')};
  cursor: pointer;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MessageRecipient = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #555;
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

const RecipientName = styled.h3`
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

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const SentMessages = () => {
  const [sentMessages, setSentMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const formatDate = (date) =>
    new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(date));

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const fetchMessages = async () => {
    const useDummyData = true; // true: 더미 데이터 사용, false: API 사용
    if (useDummyData) {
      const dummyMessages = [
        {
          id: 1,
          recipient: '사용자 A',
          timestamp: '2024-11-25T10:30:00',
          content: '안녕하세요, 잘 지내시나요?',
        },
        {
          id: 2,
          recipient: '사용자 B',
          timestamp: '2024-11-26T15:00:00',
          content: '다음 미팅은 언제가 좋을까요?',
        },
        {
          id: 3,
          recipient: '사용자 C',
          timestamp: '2024-11-27T14:45:00',
          content: '어제 보내드린 메일 확인 부탁드립니다.',
        },
      ];

      const sortedMessages = dummyMessages
        .map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((msg) => ({
          ...msg,
          timestamp: formatDate(msg.timestamp),
        }));

      setSentMessages(sortedMessages);
    } else {
      try {
        const response = await fetch('/api/sent-messages');
        const data = await response.json();

        const sortedMessages = data
          .map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((msg) => ({
            ...msg,
            timestamp: formatDate(msg.timestamp),
          }));

        setSentMessages(sortedMessages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        showNotification('메시지 데이터를 불러오지 못했습니다.', 'error');
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  const handleDeleteMessage = async (id) => {
    const success = true; // 실제 API 요청 시 성공 여부를 받아와야 함
    if (success) {
      setSentMessages((prev) => prev.filter((msg) => msg.id !== id));
      showNotification('메시지가 삭제되었습니다!', 'success');
    } else {
      showNotification('메시지 삭제에 실패했습니다.', 'error');
    }
  };

  return (
    <SentMessagesWrapper>
      <Box />
      <Header title='보낸 쪽지함' />
      <ContentSection>
        <MessageList>
          {sentMessages.map((message) => (
            <MessageItem
              key={message.id}
              onClick={() => handleSelectMessage(message)}
            >
              <MessageContent>
                <MessageRecipient>
                  받는 사람: {message.recipient}
                </MessageRecipient>
                <MessageTimestamp>{message.timestamp}</MessageTimestamp>
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
              <RecipientName>{selectedMessage.recipient}</RecipientName>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
            </ModalHeader>
            <ModalBody>{selectedMessage.content}</ModalBody>
            <ModalFooter>
              <Button variant='cancel' size='small' onClick={handleCloseModal}>
                닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}

      {notification.message && (
        <Notification type={notification.type}>
          {notification.message}
        </Notification>
      )}
    </SentMessagesWrapper>
  );
};

export default SentMessages;
