// Footer
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const FooterBar = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
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
  z-index: 100;
  user-select: none;
`;

const FooterItemWrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 150px;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
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
  user-select: none;
`;

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 1, label: 'HOME', path: '/' },
    { id: 2, label: 'Walk', path: '/walkcommunity' },
    { id: 3, label: 'Dog', path: '/dogcommunity' },
    { id: 4, label: 'Gallery', path: '/gallery' },
    { id: 5, label: 'MYPAGE', path: '/mypage' },
  ];

  return (
    <FooterBar>
      {menuItems.map((item) => (
        <FooterItemWrapper
          key={item.id}
          onClick={() => navigate(item.path)}
          aria-label={item.label}
        >
          <FooterCircle
            $isActive={
              location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path))
            }
          />
          <FooterLabel>{item.label}</FooterLabel>
        </FooterItemWrapper>
      ))}
    </FooterBar>
  );
};

export default Footer;
