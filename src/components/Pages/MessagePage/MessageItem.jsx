//
import React from 'react';
import Button from '../../Button/Button';
import {
  MessageItemWrapper,
  MessageContent,
  MessageSender,
  MessageTimestamp,
  ButtonGroup,
} from './Styles/MessageStyles';

const MessageItem = ({ message, type, onReply, onDelete }) => {
  const profile = type === 'received' ? message.sender : message.receiver;

  return (
    <MessageItemWrapper>
      <MessageContent>
        <MessageSender>
          <img
            src={profile.profile_image || '/logo/gaerangmari_logo.jpeg'}
            alt={`${profile.nickname} 프로필`}
          />
          <div>
            <span>{profile.nickname}</span>
            <MessageTimestamp>{message.formattedTimestamp}</MessageTimestamp>
          </div>
        </MessageSender>
      </MessageContent>
      <ButtonGroup>
        {type === 'received' && (
          <Button
            variant='reply'
            size='small'
            onClick={() => onReply(message.id, message.sender)}
          >
            답장
          </Button>
        )}
        <Button
          variant='cancel'
          size='small'
          onClick={() => onDelete(message.id, type)}
        >
          삭제
        </Button>
      </ButtonGroup>
    </MessageItemWrapper>
  );
};

export default MessageItem;
