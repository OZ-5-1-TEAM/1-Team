import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Button from '../components/Button/Button';
import Header from '../components/Header';

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
  z-index: 1000;

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
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const MessageSender = styled.span`
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
    const dummyMessages = [
      {
        id: 1,
        sender: 'John Doe',
        timestamp: '2024-11-25T10:30:00',
        content: 'Hello! How are you?',
      },
      {
        id: 2,
        sender: 'Jane Smith',
        timestamp: '2024-11-26T15:00:00',
        content: 'Meeting rescheduled to tomorrow at 10 AM.',
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
        timestamp: msg.timestamp.toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      }));

    setReceivedMessages(sortedMessages);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
    setReplyMessage('');
  };

  const handleDeleteMessage = async (id) => {
    const success = true;
    if (success) {
      setReceivedMessages((prev) =>
        prev.filter((message) => message.id !== id)
      );
      showNotification('메시지가 삭제되었습니다!', 'success');
    } else {
      showNotification('메시지 삭제에 실패했습니다.', 'error');
    }
  };

  const handleReply = async () => {
    if (!replyMessage.trim()) {
      showNotification('답장 내용을 입력하세요.', 'error');
      return;
    }
    const success = true;
    if (success) {
      showNotification('답장이 전송되었습니다!', 'success');
      setReplyMessage('');
      handleCloseModal();
    } else {
      showNotification('답장 전송에 실패했습니다.', 'error');
    }
  };

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
                <MessageSender>보낸 사람: {message.sender}</MessageSender>
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
              <SenderName>{selectedMessage.sender}</SenderName>
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
