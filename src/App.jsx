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
import MyPage from './pages/MyPage';
import EditPage from './pages/EditPage';
import PetAddPage from './pages/PetAddPage';
import PetEditPage from './pages/PetEditPage';
import MatePage from './pages/MatePage';
import MessagePage from './pages/MessagePage';
import ReceivedMessagesPage from './pages/ReceivedMessagesPage';
import SentMessagesPage from './pages/SentMessagesPage';
import CustomerServicePage from './pages/CustomerServicePage';
import WorkCommunity from './pages/WorkCommunity';
import DogCommunity from './pages/DogCommunity';
import LikeCommunity from './pages/LikeCommunity';
import PostPage from './pages/PostPage';
import PostDetail from './pages/PostDetail';
import { useState } from 'react';
import GlobalStyle from './components/GlobalStyle';

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
  // 유저 데이터 및 상태
  const [userData, setUserData] = useState({
    email: '',
    nickname: '',
    intro: '',
  });

  // 반려견 데이터 및 상태
  const [petData, setPetData] = useState({
    name: '',
    breed: '',
    age: '',
    size: '',
    gender: '',
    intro: '',
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/notice' element={<NoticePage />} />
          <Route path='/start' element={<StartPage />} />
          <Route path='/weather' element={<WeatherPage />} />
          <Route path='/join' element={<JoinPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route
            path='/edit'
            element={<EditPage userData={userData} setUserData={setUserData} />}
          />
          <Route path='/pet/add' element={<PetAddPage />} />
          <Route
            path='/pet/edit'
            element={<PetEditPage petData={petData} setPetData={setPetData} />}
          />
          <Route path='/customerservice' element={<CustomerServicePage />} />
          <Route path='/workcommunity' element={<WorkCommunity />} />
          <Route path='/dogcommunity' element={<DogCommunity />} />
          <Route path='/likecommunity' element={<LikeCommunity />} />
          <Route path='/mate' element={<MatePage />} />
          <Route path='/message' element={<MessagePage />} />
          <Route path='/receivedmessages' element={<ReceivedMessagesPage />} />
          <Route path='/sentmessages' element={<SentMessagesPage />} />
          <Route path='/postpage' element={<PostPage />} />
          <Route path='/postdetail/:id' element={<PostDetail />} />
          {/* 경로를 소문자로 통일하십쇼 */}
          {/* 예시) path부분 소문자 통일 <Route path="/community" element={<Community />} /> */}
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
