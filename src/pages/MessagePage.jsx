import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error('토큰 만료. 로그아웃 처리 또는 토큰 갱신 로직 필요.');
    }
    return Promise.reject(error);
  }
);

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
  gap: 8px;
  margin-left: 50px;
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

const dummyReceived = [
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
  },
];

const dummySent = [
  {
    id: 1,
    receiver: { id: 4, nickname: 'Alice' },
    content: '감사합니다!',
    created_at: '2024-12-02T12:45:00Z',
    is_read: true,
  },
  {
    id: 2,
    receiver: { id: 5, nickname: 'Bob' },
    content: '내일 만나요.',
    created_at: '2024-12-01T18:20:00Z',
    is_read: false,
  },
];

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
    try {
      const [receivedRes, sentRes] = await Promise.all([
        api.get('/messages/received', { params: { page: 1, size: 20 } }),
        api.get('/messages/sent', { params: { page: 1, size: 20 } }),
      ]);

      const formatMessages = (messages) =>
        messages.map((msg) => ({
          ...msg,
          formattedTimestamp: new Date(msg.created_at).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        }));

      setReceivedMessages(formatMessages(receivedRes.data.messages));
      setSentMessages(formatMessages(sentRes.data.messages));
    } catch (error) {
      showNotification(
        '쪽지 불러오기에 실패했습니다. 더미 데이터를 사용합니다.',
        'error'
      );
      const formatMessages = (messages) =>
        messages.map((msg) => ({
          ...msg,
          formattedTimestamp: new Date(msg.created_at).toLocaleString('ko-KR', {
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
    }
  };
  const markMessageAsRead = async (messageId) => {
    try {
      await api.put(`/messages/${messageId}/read`);
      // 읽음 상태 업데이트
      setReceivedMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, is_read: true } : msg
        )
      );
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
      const response = await api.post('/messages', {
        receiver_id: currentReply.id,
        content: message,
      });

      const newMessage = response.data;
      const formattedNewMessage = {
        ...newMessage,
        formattedTimestamp: new Date(newMessage.created_at).toLocaleString(
          'ko-KR',
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }
        ),
      };

      setSentMessages((prev) => [formattedNewMessage, ...prev]);
      showNotification('메시지가 전송되었습니다!', 'success');
      setMessage('');
      setReplyMode(false);
      setCurrentReply(null);
    } catch (error) {
      showNotification('메시지 전송에 실패했습니다.', 'error');
    }
  };

  const handleDeleteMessage = async (id, type) => {
    try {
      await api.delete(`/messages/${id}`);

      if (type === 'received') {
        setReceivedMessages((prev) => prev.filter((msg) => msg.id !== id));
      } else {
        setSentMessages((prev) => prev.filter((msg) => msg.id !== id));
      }
      showNotification('메시지가 삭제되었습니다!', 'success');
    } catch (error) {
      showNotification('메시지 삭제에 실패했습니다.', 'error');
    }
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
            <ReplyTitle>{currentReply?.nickname}님에게 쪽지 보내기</ReplyTitle>
          </label>
          <TextArea
            id='Message'
            placeholder='내용을 입력하세요'
            value={message}
            maxLength={500} // 최대 500자
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setMessage();
              }
            }}
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
                    variant='reply'
                    size='small'
                    onClick={() => handleReply(message.id, message.sender)}
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
                  <MessageSender>
                    <img
                      src={
                        message.receiver.profile_image ||
                        '/logo/gaerangmari_logo.jpeg'
                      }
                      alt={`${message.receiver.nickname} 프로필`}
                    />
                    <div>
                      <span>{message.receiver.nickname}</span>
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
