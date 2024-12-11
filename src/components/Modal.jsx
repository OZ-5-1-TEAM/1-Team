import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalButton = styled.button`
  background: #ffa000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    opacity: 0.9;
  }
`;

const Modal = ({ message, onClose }) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <p>{message}</p>
        <ModalButton onClick={onClose}>확인</ModalButton>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
