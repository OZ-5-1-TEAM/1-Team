import React from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  TextArea,
  ButtonRight,
} from '../MessagePage/Styles/MessageStyles';
import Button from '../../Button/Button';

const MessageModal = ({
  visible,
  currentReply,
  message,
  onChange,
  onSend,
  onClose,
}) => {
  if (!visible) return null;

  const recipientName = currentReply?.name || currentReply?.nickname;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{recipientName}님에게 쪽지 보내기</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <TextArea
          placeholder='내용을 입력하세요'
          value={message}
          maxLength={500}
          onChange={onChange}
        />
        <ButtonRight>
          <Button variant='send' size='large' onClick={onSend}>
            보내기
          </Button>
        </ButtonRight>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MessageModal;
