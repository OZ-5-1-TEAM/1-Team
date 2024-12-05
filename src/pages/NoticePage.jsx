import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const MainPageWrapper = styled.div`
  padding-top: 130px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  padding-bottom: 63px;
  min-height: 100vh;
`;

const PostListContainer = styled.div`
  margin: 20px 0;
`;

const PostItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
  border-bottom: 1px solid #ddd;
  gap: 15px;
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
`;

const PostTitle = styled.h4`
  font-size: 16px;
  color: #333;
  margin: 0;
  font-weight: bold;
  margin: 20px 0 0 10px;
`;

const PostMeta = styled.div`
  font-size: 12px;
  color: #aaa;
  text-align: right;
`;

// 더미 데이터 생성 (5개로 고정)
const generateDummyPosts = () =>
  Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 1}-${Date.now()}`, // 고유한 id 생성
    title: `버전 1.${i + 1} 업데이트 사항 `,
    background: `/placeholder-image.jpg`,
  }));

function NoticePage() {
  const [posts] = useState(generateDummyPosts()); // 더미 데이터 5개로 고정

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
                <PostTitle>{post.title}</PostTitle>
                <PostMeta>{new Date().toLocaleDateString()}</PostMeta>
              </PostContentWrapper>
            </Link>
          </PostItem>
        ))}
      </PostListContainer>
    </MainPageWrapper>
  );
}

export default NoticePage;
