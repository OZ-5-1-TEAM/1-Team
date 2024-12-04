import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Section,
  SectionHeader,
  SectionTitle,
  Arrow,
  MessageList,
} from './styles/MessageStyles';
import MessageItem from './MessageItem';

const MessageSection = ({
  title,
  messages,
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
        <Arrow>›</Arrow>
      </SectionHeader>
      <MessageList>
        {messages.slice(0, 3).map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            type={type}
            onReply={onReply}
            onDelete={onDelete}
          />
        ))}
      </MessageList>
    </Section>
  );
};

export default MessageSection;
