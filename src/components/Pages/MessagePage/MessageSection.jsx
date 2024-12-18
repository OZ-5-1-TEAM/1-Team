import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Section,
  SectionHeader,
  SectionTitle,
  MessageList,
} from '../MessagePage/Styles/MessageStyles';
import MessageItem from './MessageItem';

const MessageSection = ({
  title,
  messages = [],
  type,
  onReply,
  onDelete,
  navigateTo,
}) => {
  const navigate = useNavigate();

  return (
    <Section>
      <SectionHeader onClick={() => navigate(navigateTo)}>
        <SectionTitle>{title}</SectionTitle>
      </SectionHeader>
      {messages.length === 0 ? (
        <div>메시지가 없습니다.</div>
      ) : (
        <MessageList>
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              type={type}
              onReply={onReply}
              onDelete={onDelete}
            />
          ))}
        </MessageList>
      )}
    </Section>
  );
};

export default MessageSection;
