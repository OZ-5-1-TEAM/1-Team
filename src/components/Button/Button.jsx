import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// 공통 스타일 정의
const StyledButton = styled.button`
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;

  ${({ $variant }) => {
    switch ($variant) {
      case 'cancel':
        return css`
          background-color: #8f8e94;
        `;
      case 'send':
      case 'reply':
      case 'request':
        return css`
          background-color: #ffe082;
        `;
      default:
        return css`
          background-color: #8f8e94;
        `;
    }
  }}

  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return css`
          width: 50px;
          height: 25px;
        `;
      case 'medium':
        return css`
          width: 75px;
          height: 30px;
        `;
      case 'large':
        return css`
          height: 25px;
          width: ${({ $width }) => $width || '120px'};
        `;
      default:
        return css`
          width: 75px;
          height: 30px;
        `;
    }
  }}

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// 버튼 컴포넌트 정의
const Button = ({
  children,
  onClick,
  variant = 'default',
  size = 'medium',
  width,
  disabled = false,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      $variant={variant}
      $size={size}
      $width={width}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

// PropTypes 검증
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    'cancel',
    'send',
    'reply',
    'delete',
    'message',
    'request',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.string, // width를 커스터마이징할 경우
  disabled: PropTypes.bool,
};

export default Button;
