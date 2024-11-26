import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const MainPageWrapper = styled.div`
  padding-top: 140px;
  width: 100%;
  max-width: 600px;
  height: 100vh;
  display: flex;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 63px;
`;

const ContentSection = styled.section`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
`;

const NoticePostItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const NoticeIcon = styled.div`
  width: 95px;
  height: 60px;
  background-color: #eee;
  border-radius: 5px;
  margin-right: 15px;
`;

const NoticeDate = styled.p`
  font-size: 11px;
  color: #dfa700;
  margin: 0;
`;

const NoticePostTitle = styled.p`
  font-size: 20px;
  color: #8f8e94;
  margin: 5px 0 0 0;
`;

const NoticePostContent = styled.p`
  font-size: 17px;
  color: #8f8e94;
  margin: 0;
`;

const NoticeList = () => {
  const navigate = useNavigate();

  const notices = [
    {
      id: 1,
      date: 'YYYY-MM-DD',
      postTitle: 'TITLE',
      postContent: 'content preview',
      path: '/notice/1',
    },
    {
      id: 2,
      date: 'YYYY-MM-DD',
      postTitle: 'TITLE',
      postContent: 'content preview',
      path: '/notice/2',
    },
    {
      id: 3,
      date: 'YYYY-MM-DD',
      postTitle: 'TITLE',
      postContent: 'content preview',
      path: '/notice/3',
    },
  ];

  return (
    <>
      {notices.map((notice) => (
        <NoticePostItem key={notice.id} onClick={() => navigate(notice.path)}>
          <NoticeIcon />
          <div>
            <NoticePostTitle>{notice.postTitle}</NoticePostTitle>
            <NoticeDate>{notice.date}</NoticeDate>
            <NoticePostContent>{notice.postContent}</NoticePostContent>
          </div>
        </NoticePostItem>
      ))}
    </>
  );
};

function NoticePage() {
  return (
    <MainPageWrapper>
      <Header title='공지사항' />
      <ContentSection>
        <NoticeList />
      </ContentSection>
    </MainPageWrapper>
  );
}

export default NoticePage;
