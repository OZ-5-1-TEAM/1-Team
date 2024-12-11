import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import api from '../api/axiosInstance';
import Loading from '../components/Loading';

const MainPageWrapper = styled.div`
  padding-top: 100px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  min-height: 100vh;
`;

const PostListContainer = styled.div`
  margin: 20px 0;
  user-select: none;
`;

const PostItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  border-bottom: 1px solid #ddd;
  gap: 15px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const PostImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 5px;
  background-color: #f0f0f0;
  background-image: url('/placeholder-image.jpg');
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

const PostContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PostTitle = styled.h4`
  font-size: 16px;
  color: #333;
  margin-left: 5px;
  font-weight: bold;
  max-width: 60%; /* 제목의 최대 너비를 설정 */
  white-space: nowrap; /* 줄바꿈을 방지 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 */
  text-overflow: ellipsis; /* 말줄임표 추가 */
`;

const PostMeta = styled.div`
  font-size: 12px;
  color: #aaa;
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* 오른쪽 정렬 */
  justify-content: center; /* 수직 가운데 정렬 */
  flex-shrink: 0; /* 크기가 줄어들지 않도록 고정 */
  height: 70px; /* PostImage와 동일한 높이로 설정 */
  text-align: right;
`;

const LoadingMessage = styled.p`
  font-size: 16px;
  color: #aaa;
  text-align: center;
`;

const NoticePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/v1/notices');
        setPosts(response.data.results); // API에서 받은 데이터 중 results를 상태로 설정
      } catch (err) {
        console.error('공지사항 데이터를 가져오는데 실패했습니다:', err);
        setError('공지사항 데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (isLoading) {
    return (
      <MainPageWrapper>
        <Header title='고객센터' />
        <LoadingMessage>
          <Loading />
        </LoadingMessage>
      </MainPageWrapper>
    );
  }

  if (error) {
    return (
      <MainPageWrapper>
        <Header title='고객센터' />
        <LoadingMessage>{error}</LoadingMessage>
      </MainPageWrapper>
    );
  }

  return (
    <MainPageWrapper>
      <Header title='고객센터' />
      <PostListContainer>
        {posts.map((post) => (
          <PostItem key={post.id}>
            <Link
              to={`/postdetail/${post.id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <PostImage />
              <PostContentWrapper>
                <PostTitle>
                  {post.title.length > 35
                    ? `${post.title.substring(0, 35)}...`
                    : post.title}
                </PostTitle>
              </PostContentWrapper>
              <PostMeta>
                <div>{post.author_nickname}</div>
                <div>{new Date(post.created_at).toLocaleDateString()}</div>
              </PostMeta>
            </Link>
          </PostItem>
        ))}
      </PostListContainer>
    </MainPageWrapper>
  );
};

export default NoticePage;
