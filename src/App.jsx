import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import MainPage from './pages/MainPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NoticePage from './pages/NoticePage';
import StartPage from './pages/StartPage';
import WeatherPage from './pages/WeatherPage';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/LoginPage';
import CustomerServicePage from './pages/CustomerServicePage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Navbar />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/notice' element={<NoticePage />} />
          <Route path='/start' element={<StartPage />} />
          <Route path='/weather' element={<WeatherPage />} />
          <Route path='/join' element={<JoinPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/customerservice' element={<CustomerServicePage />} />
          {/* 경로를 소문자로 통일하십쇼 */}
          {/* 예시) path부분 소문자 통일 <Route path="/community" element={<Community />} /> */}
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
