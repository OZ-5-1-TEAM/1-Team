import React from 'react';
import { SectionHeader, Arrow, MessageTimestamp } from '../CommonComponents';
import styled from 'styled-components';
import Button from '../../Button/Button';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: ${({ isRead }) => (isRead ? '#f9f9f9' : '#fff')};
`;

const MessageList = ({ title, messages, onReply, onDelete, onNavigate }) => (
  <div>
    <SectionHeader onClick={onNavigate}>
      <h3>{title}</h3>
      <Arrow>›</Arrow>
    </SectionHeader>
    <ListContainer>
      {messages.map((msg) => (
        <MessageItem key={msg.id} isRead={msg.is_read}>
          <div>
            <p>{msg.content}</p>
            <MessageTimestamp>
              {new Date(msg.created_at).toLocaleString()}
            </MessageTimestamp>
          </div>
          <div>
            {onReply && (
              <Button
                variant='reply'
                size='small'
                onClick={() => onReply(msg.sender, msg.id)}
              >
                답장
              </Button>
            )}
            {onDelete && (
              <Button
                variant='delete'
                size='small'
                onClick={() => onDelete(msg.id)}
              >
                삭제
              </Button>
            )}
          </div>
        </MessageItem>
      ))}
    </ListContainer>
  </div>
);

export default MessageList;
