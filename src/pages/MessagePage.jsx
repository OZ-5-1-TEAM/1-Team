import React, { useState, useEffect } from 'react';
import {
  Box,
  PageWrapper,
  Notification,
  FixedImage,
} from '../components/Pages/CommonComponents';
import MessageList from '../components/Pages/MessagePage/MessageList';
import MessageForm from '../components/Pages/MessagePage/MessageForm';
import { useNavigate } from 'react-router-dom';
// import api from '../api/axiosInstance';

const dummyReceived = [
  {
    id: 1,
    sender: { nickname: 'John Doe' },
    content: '안녕하세요!',
    created_at: '2024-12-04T10:00:00Z',
    is_read: false,
  },
  {
    id: 2,
    sender: { nickname: 'Jane Smith' },
    content: '내일 만나요.',
    created_at: '2024-12-03T15:00:00Z',
    is_read: true,
  },
];

const dummySent = [
  {
    id: 1,
    receiver: { nickname: 'Alice' },
    content: '감사합니다!',
    created_at: '2024-12-02T10:30:00Z',
    is_read: true,
  },
];

const MessagePage = () => {
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [replyMode, setReplyMode] = useState(false);
  const [currentReply, setCurrentReply] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const fetchMessages = async () => {
    try {
      const [receivedRes, sentRes] = await Promise.all([
        api.get('/messages/received'),
        api.get('/messages/sent'),
      ]);
      setReceivedMessages(receivedRes.data.messages);
      setSentMessages(sentRes.data.messages);
    } catch (error) {
      showNotification(
        '쪽지 불러오기에 실패했습니다. 더미 데이터를 사용합니다.',
        'error'
      );
      setReceivedMessages(dummyReceived);
      setSentMessages(dummySent);
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
    } catch {
      showNotification('메시지 삭제에 실패했습니다.', 'error');
    }
  };

  const markMessageAsRead = async (messageId) => {
    try {
      await api.put(`/messages/${messageId}/read`);
      setReceivedMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, is_read: true } : msg
        )
      );
    } catch (error) {
      showNotification('읽음 처리에 실패했습니다.', 'error');
    }
  };

  const handleSendMessage = async (receiverId, content) => {
    if (!content.trim()) {
      showNotification('메시지를 입력하세요.', 'error');
      return;
    }
    try {
      const response = await api.post('/messages', {
        receiver_id: receiverId,
        content,
      });
      setSentMessages((prev) => [response.data, ...prev]);
      showNotification('메시지가 전송되었습니다!', 'success');
      setReplyMode(false);
      setCurrentReply(null);
      setMessage('');
    } catch {
      showNotification('메시지 전송에 실패했습니다.', 'error');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <PageWrapper>
      <Notification message={notification.message} type={notification.type} />
      <Box />

      {replyMode ? (
        <MessageForm
          receiver={currentReply}
          content={message}
          onChange={setMessage}
          onSend={handleSendMessage}
          Button={sendButton}
        />
      ) : (
        <>
          <MessageList
            title='받은 쪽지함'
            messages={receivedMessages.slice(0, 3)}
            onReply={(receiver, messageId) => {
              markMessageAsRead(messageId);
              setReplyMode(true);
              setCurrentReply(receiver);
            }}
            onDelete={(id) => handleDeleteMessage(id, 'received')}
            onNavigate={() => navigate('/receivedmessages')}
          />
          <MessageList
            title='보낸 쪽지함'
            messages={sentMessages.slice(0, 3)}
            onDelete={(id) => handleDeleteMessage(id, 'sent')}
            onNavigate={() => navigate('/sentmessages')}
          />
        </>
      )}

      <FixedImage src='/icon-192x192.webp' alt='dog foot icon' />
    </PageWrapper>
  );
};

export default MessagePage;
