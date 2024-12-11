import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  MessageList,
  MessageItem,
  MessageContent,
  MessageReceiver,
  MessageTimestamp,
  ButtonGroup,
  EmptyStateWrapper,
} from '../MessagePage/Styles/MessageStyles';
import Button from '../../Button/Button';
import Loading from '../../Loading';
import Toast from '../MessagePage/Notification';

const SentMessageSection = ({
  messages,
  onSelect,
  onDelete,
  isLoading,
  onLoadMore,
  hasMore,
}) => {
  const [toastState, setToastState] = useState({
    message: '',
    type: '',
  });
  const observerRef = useRef(null);
  const lastMessageRef = useRef(null);

  const showToast = useCallback((message, type) => {
    setToastState({ message, type });
    setTimeout(() => {
      setToastState({ message: '', type: '' });
    }, 3000);
  }, []);

  const handleDeleteClick = useCallback(
    (e, messageId) => {
      e.stopPropagation();
      onDelete(messageId);
    },
    [onDelete]
  );

  useEffect(() => {
    if (isLoading || !hasMore || !lastMessageRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(lastMessageRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, hasMore, onLoadMore]);

  if (!messages.length && !isLoading) {
    return <EmptyStateWrapper>보낸 메시지가 없습니다.</EmptyStateWrapper>;
  }

  return (
    <>
      <MessageList role='list' aria-label='보낸 메시지 목록'>
        {messages.map((message, index) => (
          <MessageItem
            key={message.id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            onClick={() => onSelect(message)}
            role='listitem'
            aria-label={`${message.receiver.nickname}님에게 보낸 메시지`}
          >
            <MessageContent>
              <MessageReceiver>
                <img
                  src={message.receiver.profile_image}
                  alt={`${message.receiver.nickname}님의 프로필`}
                  onError={(e) => {
                    e.target.src = '/logo/gaerangmari_logo.jpeg';
                    e.target.onerror = null;
                  }}
                />
                <div>
                  <span>{message.receiver.nickname}</span>
                  <MessageTimestamp>
                    {message.formattedTimestamp}
                  </MessageTimestamp>
                </div>
              </MessageReceiver>
            </MessageContent>
            <ButtonGroup>
              <Button
                variant='cancel'
                size='small'
                onClick={(e) => handleDeleteClick(e, message.id)}
                aria-label='메시지 삭제'
              >
                삭제
              </Button>
            </ButtonGroup>
          </MessageItem>
        ))}
      </MessageList>
      {isLoading && <Loading />}
      <Toast {...toastState} />
    </>
  );
};

SentMessageSection.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      receiver: PropTypes.shape({
        id: PropTypes.number,
        nickname: PropTypes.string.isRequired,
        profile_image: PropTypes.string.isRequired,
      }).isRequired,
      content: PropTypes.string.isRequired,
      formattedTimestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

export default SentMessageSection;
