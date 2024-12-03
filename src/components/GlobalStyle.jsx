import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @font-face {
  font-family: 'Pretendard';
  src: url('/fonts/Pretendard-SemiBold.woff') format('woff');
  font-weight: 600; 
  font-style: normal;
  font-display: swap;
}

  html, body {
    width: 100%;
    height: 100%;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
`;

export default GlobalStyle;
