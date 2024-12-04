import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import Header from '../components/Header';
import MessageSection from '../components/Pages/MessagePage/MessageSection';
import MessageModal from '../components/Pages/MessagePage/MessageModal';
import Notification from '../components/Pages/MessagePage/Notification';
import {
  MainPageWrapper,
  Box,
  ContentSection,
  FixedImage,
} from '../components/Pages/MessagePage/styles/MessageStyles';
import Loading from '../components/Loading';

const ReceivedMessagePage = () => {
  // API 연동 시 삭제
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

  // API 연동 시 삭제 끝

  const [notification, setNotification] = useState({ message: '', type: '' });
  const [replyMode, setReplyMode] = useState(false);
  const [currentReply, setCurrentReply] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // API 연동 시 더미데이터(dummyReceived, dummySent) 파라미터 제거
  // const { data: receivedMessages, isLoading: receivedLoading, refetch: refetchReceived } =
  //   useFetch('/messages/received');
  // const { data: sentMessages, isLoading: sentLoading, refetch: refetchSent } =
  //   useFetch('/messages/sent');

  // API 연동 시 아래 더미데이터를 사용하는 useFetch 호출을 위 코드로 교체
  const {
    data: receivedMessages,
    isLoading: receivedLoading,
    refetch: refetchReceived,
  } = useFetch('/messages/received', dummyReceived);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const markMessageAsRead = async (messageId) => {
    try {
      // API 연동 시 주석 해제
      // const response = await api.put(`/messages/${messageId}/read`);
      // if (response.status === 200) {
      //   refetchReceived();
      // }

      // API 연동 시 아래 더미 로직 제거
      refetchReceived();
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
    } catch (error) {
      showNotification('메시지 전송에 실패했습니다.', 'error');
    }
  };

  const handleDeleteMessage = async (id, type) => {
    try {
      // TODO: API 연동 시 주석 해제
      // const response = await api.delete(`/messages/${id}`);
      // if (response.status === 204) {
      //   if (type === 'received') {
      //     refetchReceived();
      //   } else {
      //     refetchSent();
      //   }
      //   showNotification('메시지가 삭제되었습니다!', 'success');
      // }

      // API 연동 시 아래 더미 로직 제거
      if (type === 'received') {
        refetchReceived();
      } else {
        refetchSent();
      }
      showNotification('메시지가 삭제되었습니다!', 'success');
    } catch (error) {
      showNotification('메시지 삭제에 실패했습니다.', 'error');
    }
  };

  const handleCloseModal = () => {
    setReplyMode(false);
    setCurrentReply(null);
    setMessage('');
  };

  return (
    <MainPageWrapper>
      <Box />
      <Header title='받은 쪽지함' />
      <ContentSection>
        {receivedLoading ? (
          <Loading />
        ) : (
          <>
            <MessageModal
              visible={replyMode}
              currentReply={currentReply}
              message={message}
              onChange={(e) => setMessage(e.target.value)}
              onSend={handleSendMessage}
              onClose={handleCloseModal}
            />

            <MessageSection
              title='받은 쪽지함'
              messages={receivedMessages?.messages || []}
              type='received'
              onReply={handleReply}
              onDelete={handleDeleteMessage}
              navigateTo='/receivedmessages'
            />
          </>
        )}
      </ContentSection>

      <Notification {...notification} />
      <FixedImage src='/icon-192x192.webp' alt='dog foot icon' />
    </MainPageWrapper>
  );
};

export default ReceivedMessagePage;
