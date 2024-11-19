import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FooterBar = styled.footer`
  position: fixed;
  bottom: 0;
  width: 600px;
  max-width: 600px;
  height: 60px;
  margin: 0 auto;
  background-color: #f8f8f8;
  border-top: 2px solid #ffe082;
  display: flex;
  justify-content: space-around;
  align-items: center;
  left: 0;
  right: 0;
  overflow: hidden;
`;

const FooterItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 150px;
  cursor: pointer;
`;

const FooterCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ $isActive }) => ($isActive ? '#ff9900' : '#ffe082')};
  background-color: ${({ $isActive }) =>
    $isActive ? '#ff9900' : 'transparent'};
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterLabel = styled.span`
  font-size: 10px;
  color: #777777;
`;

const Footer = () => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 1, label: 'HOME', path: '/' },
    { id: 2, label: 'COMMUNITY', path: '/community' },
    { id: 3, label: 'PHOTO', path: '/photo' },
    { id: 4, label: 'MYPAGE', path: '/mypage' },
  ];

  const currentPageId = 1;

  return (
    <FooterBar>
      {menuItems.map((item) => (
        <FooterItemWrapper key={item.id} onClick={() => navigate(item.path)}>
          <FooterCircle $isActive={item.id === currentPageId} />
          <FooterLabel>{item.label}</FooterLabel>
        </FooterItemWrapper>
      ))}
    </FooterBar>
  );
};

export default Footer;
