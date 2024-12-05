import React from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
} from '../MessagePage/Styles/MessageStyles';

const SentMessageModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{message.receiver.nickname}님에게 보낸 쪽지</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>{message.content}</ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SentMessageModal;
