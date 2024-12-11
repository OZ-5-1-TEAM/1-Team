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

const SentMessagesPage = () => {
  const [state, setState] = useState({
    messages: [],
    selectedMessage: null,
    notification: { message: '', type: '' },
    isLoading: false,
    error: null,
    hasMore: true,
    page: 1,
  });

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

  const handleError = (error) => {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || 'API 오류가 발생했습니다.';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      showNotification(errorMessage, 'error');
    } else if (error.request) {
      const networkError =
        '서버에 연결할 수 없습니다. 네트워크를 확인해주세요.';
      setState((prev) => ({
        ...prev,
        error: networkError,
        isLoading: false,
      }));
      showNotification(networkError, 'error');
    } else {
      const unknownError = '오류가 발생했습니다.';
      setState((prev) => ({
        ...prev,
        error: unknownError,
        isLoading: false,
      }));
      showNotification(unknownError, 'error');
    }
  };

  const fetchMessages = async (pageNumber = 1) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await api.get(`/v1/messages/sent/?page=${pageNumber}`);
      const formattedMessages = response.data.map((message) => ({
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
        messages:
          pageNumber === 1
            ? formattedMessages
            : [...prev.messages, ...formattedMessages],
        isLoading: false,
        hasMore: formattedMessages.length === 10, // 페이지당 10개 메시지 가정
        page: pageNumber,
        error: null,
      }));
    } catch (error) {
      handleError(error);
    }
  };

  const handleLoadMore = () => {
    if (!state.isLoading && state.hasMore) {
      fetchMessages(state.page + 1);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await api.delete(`/v1/messages/${messageId}/`);
      setState((prev) => ({
        ...prev,
        messages: prev.messages.filter((message) => message.id !== messageId),
        selectedMessage: null,
      }));
      showNotification('메시지가 삭제되었습니다.', 'success');
    } catch (error) {
      handleError(error);
    }
  };

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
        {state.isLoading && state.messages.length === 0 ? (
          <Loading />
        ) : (
          <SentMessageSection
            messages={state.messages}
            onSelect={handleSelectMessage}
            onDelete={handleDeleteMessage}
            hasMore={state.hasMore}
            onLoadMore={handleLoadMore}
            isLoading={state.isLoading}
          />
        )}
      </ContentSection>
      <SentMessageModal
        message={state.selectedMessage}
        onClose={() => handleSelectMessage(null)}
      />
      <Notification
        message={state.notification.message}
        type={state.notification.type}
      />
    </MainPageWrapper>
  );
};

export default SentMessagesPage;
