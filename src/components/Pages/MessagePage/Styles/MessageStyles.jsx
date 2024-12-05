import styled, { keyframes, css } from 'styled-components';

export const FadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SlideDown = keyframes`
  from {
    opacity: 0;
    top: -50px;
  }
  to {
    opacity: 1;
    top: 0;
  }
`;

// Common Styles
export const BoxStyles = css`
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FocusStyles = css`
  &:focus {
    outline: none;
    border: 2px solid #ffe29f;
    background-color: #fffef8;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`;

// Main Page Styles
export const Box = styled.div`
  width: 100%;
  height: 130px;
  background-color: transparent;
  display: block;
`;

export const MainPageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
  ${BoxStyles}
  padding-bottom: 63px;
  position: relative;
  animation: ${FadeIn} 0.5s ease;

  @media (max-width: 480px) {
    padding: 10px;
    box-shadow: none;
  }
`;

export const ContentSection = styled.section`
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Message Section Styles
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #ff9900;
  margin: 0;
`;

export const Arrow = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #ff9900;
`;

export const MessageList = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MessageItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }
`;

// Message Item Styles
export const MessageItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
`;

export const MessageSender = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #555;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  span {
    display: block;
    font-weight: bold;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 50px;
`;

// Send Message Box Styles
export const SendMessageWrapper = styled.div`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  user-select: none;
`;

export const ReplyTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  color: #ff9900;
  margin-bottom: 10px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 15px;
  box-sizing: border-box;
  resize: none;
  ${FocusStyles}
`;

export const ButtonRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// Notification Styles
export const NotificationWrapper = styled.div`
  ${BoxStyles}
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ type }) =>
    type === 'success' ? '#ff9900' : '#ffe082'};
  color: white;
  padding: 15px 20px;
  animation: ${SlideDown} 0.5s ease;
  z-index: 1000;
  user-select: none;
`;

export const FixedImage = styled.img`
  position: absolute;
  bottom: 100px;
  right: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  ${BoxStyles}
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #ff9900;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #ff9900;
  }
`;

export const MessageReceiver = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  span {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
`;

export const MessageTimestamp = styled.span`
  font-size: 12px;
  color: #dfa700;
`;

export const EmptyStateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #666;
  font-size: 1rem;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 1rem 0;
`;
export const ModalBody = styled.div`
  padding: 20px;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  max-height: 60vh;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #dfa700;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ffe082;
  }
`;
