// SendMessageBox.jsx

import React from 'react';
import Button from '../../Button/Button';
import {
  SendMessageWrapper,
  ReplyTitle,
  TextArea,
  ButtonRight,
} from './Styles/MessageStyles';

const SendMessageBox = ({
  visible,
  currentReply,
  message,
  onChange,
  onSend,
  onKeyDown,
}) => {
  if (!visible) return null;

  return (
    <SendMessageWrapper>
      <label htmlFor='Message'>
        <ReplyTitle>{currentReply?.nickname}님에게 쪽지 보내기</ReplyTitle>
      </label>
      <TextArea
        id='Message'
        placeholder='내용을 입력하세요'
        value={message}
        maxLength={500}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <ButtonRight>
        <Button variant='send' size='large' onClick={onSend}>
          보내기
        </Button>
      </ButtonRight>
    </SendMessageWrapper>
  );
};

export default SendMessageBox;
