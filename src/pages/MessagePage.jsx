import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
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

const Box = styled.div`
  width: 100%;
  height: 130px;
  background-color: transparent;
  display: block;
`;

const MainPageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
  ${boxStyles}
  padding-bottom: 63px;
  position: relative;
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #ff9900;
  margin: 0;
`;

const Arrow = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #ff9900;
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
  background-color: #ffffff;
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
  gap: 8px;
`;

const SendMessageBox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'visible',
})`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  user-select: none;
`;

const ReplyTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  color: #ff9900;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
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

const ButtonRight = styled.div`
  display: flex;
  justify-content: flex-end;
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
  animation: ${slideDown} 0.5s ease;
  z-index: 1000;
  user-select: none;
`;

const FixedImage = styled.img`
  position: absolute;
  bottom: 100px;
  right: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const MessagePage = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [replyMode, setReplyMode] = useState(false);
  const [currentReply, setCurrentReply] = useState(null);
  const [message, setMessage] = useState('');

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const fetchMessages = async () => {
    const dummyReceived = [
      {
        id: 1,
        sender: 'John Doe',
        title: 'Hello! How are you?',
        timestamp: '2024-11-25T10:30:00',
      },
      {
        id: 2,
        sender: 'Jane Smith',
        title: 'Meeting rescheduled.',
        timestamp: '2024-11-26T15:00:00',
      },
    ];

    const dummySent = [
      {
        id: 1,
        recipient: 'Alice',
        title: 'Thank you!',
        timestamp: '2024-11-25T14:00:00',
      },
      {
        id: 2,
        recipient: 'Bob',
        title: 'Let’s catch up tomorrow.',
        timestamp: '2024-11-24T16:30:00',
      },
    ];

    const formatMessages = (messages) =>
      messages
        .map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((msg) => ({
          ...msg,
          formattedTimestamp: msg.timestamp.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        }));

    setReceivedMessages(formatMessages(dummyReceived));
    setSentMessages(formatMessages(dummySent));
  };

  const handleReply = (sender) => {
    setReplyMode(true);
    setCurrentReply(sender);
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      showNotification('메시지를 입력하세요.', 'error');
      return;
    }

    const newMessage = {
      id: Date.now(),
      recipient: currentReply,
      title: message,
      timestamp: new Date(),
    };

    const formattedNewMessage = {
      ...newMessage,
      formattedTimestamp: newMessage.timestamp.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };

    setSentMessages((prev) => [formattedNewMessage, ...prev]);
    showNotification('메시지가 전송되었습니다!', 'success');
    setMessage('');
    setReplyMode(false);
    setCurrentReply(null);
  };

  const handleDeleteMessage = (id, type) => {
    if (type === 'received') {
      setReceivedMessages((prev) => prev.filter((msg) => msg.id !== id));
    } else {
      setSentMessages((prev) => prev.filter((msg) => msg.id !== id));
    }
    showNotification('메시지가 삭제되었습니다!', 'success');
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <MainPageWrapper>
      <Box />
      <Header title='쪽지함' />
      <ContentSection>
        <SendMessageBox visible={replyMode}>
          <label htmlFor='Message'>
            <ReplyTitle>{currentReply}님에게 쪽지 보내기</ReplyTitle>
          </label>
          <TextArea
            id='Message'
            placeholder='내용을 입력하세요'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <ButtonRight>
            <Button variant='send' size='large' onClick={handleSendMessage}>
              보내기
            </Button>
          </ButtonRight>
        </SendMessageBox>

        <Section>
          <SectionHeader onClick={() => navigate('/receivedmessages')}>
            <SectionTitle>받은 쪽지함</SectionTitle>
            <Arrow>›</Arrow>
          </SectionHeader>
          <MessageList>
            {receivedMessages.slice(0, 3).map((message) => (
              <MessageItem key={message.id}>
                <MessageContent>
                  <MessageSender>보낸 사람: {message.sender}</MessageSender>
                  <MessageTimestamp>
                    {message.formattedTimestamp}
                  </MessageTimestamp>
                </MessageContent>
                <ButtonGroup>
                  <Button
                    variant='reply'
                    size='small'
                    onClick={() => handleReply(message.sender)}
                  >
                    답장
                  </Button>
                  <Button
                    variant='cancel'
                    size='small'
                    onClick={() => handleDeleteMessage(message.id, 'received')}
                  >
                    삭제
                  </Button>
                </ButtonGroup>
              </MessageItem>
            ))}
          </MessageList>
        </Section>

        <Section>
          <SectionHeader onClick={() => navigate('/sentmessages')}>
            <SectionTitle>보낸 쪽지함</SectionTitle>
            <Arrow>›</Arrow>
          </SectionHeader>
          <MessageList>
            {sentMessages.slice(0, 3).map((message) => (
              <MessageItem key={message.id}>
                <MessageContent>
                  <MessageSender>받는 사람: {message.recipient}</MessageSender>
                  <MessageTimestamp>
                    {message.formattedTimestamp}
                  </MessageTimestamp>
                </MessageContent>
                <ButtonGroup>
                  <Button
                    variant='cancel'
                    size='small'
                    onClick={() => handleDeleteMessage(message.id, 'sent')}
                  >
                    삭제
                  </Button>
                </ButtonGroup>
              </MessageItem>
            ))}
          </MessageList>
        </Section>
      </ContentSection>

      {notification.message && (
        <Notification type={notification.type}>
          {notification.message}
        </Notification>
      )}
      <FixedImage src='/icon-192x192.webp' alt='dog foot icon' />
    </MainPageWrapper>
  );
};

export default MessagePage;
