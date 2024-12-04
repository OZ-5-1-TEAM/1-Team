import React from 'react';
import styled from 'styled-components';
import { TextArea, ButtonRight } from '../CommonComponents';
import Button from '../../Button/Button';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const MessageForm = ({ receiver, content, onChange, onSend }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(receiver.id, content);
    }
  };

  return (
    <FormContainer>
      <Title>{receiver?.nickname}님에게 쪽지 보내기</Title>
      <TextArea
        placeholder='내용을 입력하세요'
        value={content}
        maxLength={500} // 최대 500자
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <ButtonRight>
        <Button onClick={() => onSend(receiver.id, content)}>보내기</Button>
      </ButtonRight>
    </FormContainer>
  );
};

export default MessageForm;
