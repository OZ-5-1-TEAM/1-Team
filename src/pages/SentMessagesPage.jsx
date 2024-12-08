import React, { useState, useCallback, useEffect } from 'react';
import api from '../api/axiosInstance';
import Header from '../components/Header';
import SentMessageSection from '../components/Pages/MessagePage/SentMessageSection';
import SentMessageModal from '../components/Pages/MessagePage/SentMessageModal';
import Notification from '../components/Pages/MessagePage/Notification';
import {
  MainPageWrapper,
  Box,
  ContentSection,
} from '../components/Pages/MessagePage/Styles/MessageStyles';
import Loading from '../components/Loading'; // 로딩 컴포넌트 import

// API 연결 시 더미 데이터 삭제
const dummySentMessages = [
  {
    id: 1,
    receiver: {
      id: 2,
      nickname: '김철수',
      profile_image: '/logo/dummy_profile1.jpeg',
    },
    content: '안녕하세요! 날씨가 좋네요.',
    created_at: '2024-12-03T12:00:00Z',
    is_read: false,
  },
  {
    id: 2,
    receiver: {
      id: 3,
      nickname: '이영희',
      profile_image: '/logo/dummy_profile2.jpeg',
    },
    content: '오늘 모임 시간 변경되었습니다.',
    created_at: '2024-12-03T14:30:00Z',
    is_read: true,
  },
];

const SentMessagesPage = () => {
  const [state, setState] = useState({
    messages: [], // 메시지 목록
    selectedMessage: null, // 선택된 메시지
    notification: { message: '', type: '' }, // 알림 상태
    isLoading: false, // 로딩 상태
    error: null, // 에러 메시지
    hasMore: false, // 추가 데이터 여부
  });

  // 알림 표시 함수
  const showNotification = useCallback((message, type) => {
    setState((prev) => ({
      ...prev,
      notification: { message, type },
    }));
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        notification: { message: '', type: '' },
      }));
    }, 3000);
  }, []);

  // 메시지 가져오기 함수
  const fetchMessages = async () => {
    setState((prev) => ({ ...prev, isLoading: true })); // 로딩 시작
    try {
      const formattedMessages = dummySentMessages.map((message) => ({
        ...message,
        formattedTimestamp: new Date(message.created_at).toLocaleString(
          'ko-KR',
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }
        ),
      }));
      setState((prev) => ({
        ...prev,
        messages: formattedMessages,
        isLoading: false, // 로딩 종료
        hasMore: false,
      }));

      /**
       * API 연결 시 아래 코드 활성화:
       * const response = await api.get('/api/messages/sent');
       * const formattedMessages = response.data.map((message) => ({
       *   ...message,
       *   formattedTimestamp: new Date(message.created_at).toLocaleString('ko-KR', {
       *     year: 'numeric',
       *     month: '2-digit',
       *     day: '2-digit',
       *     hour: '2-digit',
       *     minute: '2-digit',
       *   }),
       * }));
       * setState((prev) => ({
       *   ...prev,
       *   messages: formattedMessages,
       *   isLoading: false,
       *   hasMore: response.data.length > 0, // 추가 데이터 여부
       * }));
       */
    } catch (error) {
      console.error('보낸 메시지 목록 조회 실패:', error);
      setState((prev) => ({
        ...prev,
        error: '메시지를 불러오는데 실패했습니다.',
        isLoading: false,
      }));
      showNotification('메시지 로드에 실패했습니다.', 'error');
    }
  };

  //API 연결 시 위 코드 지우고 아래 코드 활성화
  // const handleError = (error) => {
  //   if (error.response) {
  //     console.error('API 오류:', error.response.data);
  //     setState((prev) => ({
  //       ...prev,
  //       error: error.response.data.message || 'API 오류 발생',
  //       isLoading: false,
  //     }));
  //     showNotification(error.response.data.message || 'API 요청 실패', 'error');
  //   } else if (error.request) {
  //     console.error('네트워크 오류:', error.request);
  //     showNotification('서버에 연결할 수 없습니다. 네트워크를 확인해주세요.', 'error');
  //   } else {
  //     console.error('기타 오류:', error.message);
  //     showNotification('오류가 발생했습니다.', 'error');
  //   }
  // };

  // 메시지 삭제 함수
  const handleDeleteMessage = async (messageId) => {
    try {
      setState((prev) => ({
        ...prev,
        messages: prev.messages.filter((message) => message.id !== messageId),
      }));
      showNotification('메시지가 삭제되었습니다.', 'success');
    } catch (error) {
      console.error('메시지 삭제 실패:', error);
      showNotification('메시지 삭제에 실패했습니다.', 'error');
    }
  };

  /**
   * API 연결 시 아래 코드 활성화:
   * const handleDeleteMessage = async (messageId) => {
   *   try {
   *     await api.delete(`/api/messages/${messageId}`);
   *     setState((prev) => ({
   *       ...prev,
   *       messages: prev.messages.filter((message) => message.id !== messageId),
   *     }));
   *     showNotification('메시지가 삭제되었습니다.', 'success');
   *   } catch (error) {
   *     console.error('메시지 삭제 실패:', error);
   *     showNotification('메시지 삭제에 실패했습니다.', 'error');
   *   }
   * };
   */

  // 메시지 선택 함수
  const handleSelectMessage = useCallback((message) => {
    setState((prev) => ({
      ...prev,
      selectedMessage: message,
    }));
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <MainPageWrapper>
      <Box />
      <Header title='보낸 쪽지함' />
      <ContentSection>
        {state.isLoading ? (
          <Loading /> // 로딩 상태일 때 로딩 컴포넌트 표시
        ) : (
          <SentMessageSection
            messages={state.messages} // 메시지 목록
            onSelect={handleSelectMessage} // 메시지 선택 핸들러
            onDelete={handleDeleteMessage} // 메시지 삭제 핸들러
            hasMore={state.hasMore} // 추가 데이터 여부
            onLoadMore={fetchMessages} // 추가 데이터 로드
            isLoading={state.isLoading}
          />
        )}
      </ContentSection>
      <SentMessageModal
        message={state.selectedMessage} // 선택된 메시지 전달
        onClose={() => handleSelectMessage(null)} // 모달 닫기 핸들러
      />
      <Notification
        message={state.notification.message} // 알림 메시지
        type={state.notification.type} // 알림 타입
      />
    </MainPageWrapper>
  );
};

export default SentMessagesPage;
