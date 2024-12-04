// MessageModal.jsx

import React from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  TextArea,
  ButtonRight,
} from './styles/MessageStyles';
import Button from '../../Button/Button';

const ReceivedMessageModal = ({
  visible,
  currentReply,
  message,
  onChange,
  onSend,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{currentReply?.nickname}님에게 쪽지 보내기</ModalTitle>
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

export default ReceivedMessageModal;
