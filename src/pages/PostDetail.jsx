import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';

const PageWrapper = styled.div`
  padding-top: 100px !important;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  min-height: 100vh;
  width: 100%;
  padding-bottom: 63px;
`;

const PostHeader = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 0;
  color: #ff9900;
`;

const Info = styled.div`
  font-size: 14px;
  color: #777;
  margin-top: 5px;
`;

const Content = styled.div`
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
`;

const CommentsSection = styled.div`
  margin-top: 40px;
`;

const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const CommentInput = styled.input`
  flex: 1;
  height: 35px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;

  &:focus {
    outline: none;
    border: 2px solid #ffa000;
  }
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CommentItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 14px;
`;

const CommentText = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 10px;
`;

// 더미 게시물 데이터
const dummyPosts = {
  1: {
    id: 1,
    title: '게시물 제목 1',
    content: '게시물 내용 1입니다.',
    district: '강남구',
    neighborhood: '삼성동',
    nickname: '꾸앵',
    dog_size: '소형견',
    created_at: Date.now(),
  },
  2: {
    id: 2,
    title: '게시물 제목 2',
    content: '게시물 내용 2입니다.',
    district: '서초구',
    neighborhood: '반포동',
    nickname: '꾸앵',
    dog_size: '소형견',
    created_at: Date.now(),
  },
};

// 더미 댓글 데이터
const dummyComments = [
  { id: 1, author: '사용자1', content: '이건 정말 멋진 게시물이네요!' },
  { id: 2, author: '사용자2', content: '도움이 많이 됐어요. 감사합니다.' },
];

const PostDetail = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  const parsedId = parseInt(id, 10); // 문자열 id를 숫자로 변환
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // 더미 데이터를 기반으로 게시물 정보 설정
    const fetchedPost = dummyPosts[parsedId] || {
      title: '알 수 없는 게시물',
      content: '해당 게시물을 찾을 수 없습니다.',
      district: '강남구',
      neighborhood: '삼성동',
      nickname: '꾸앵',
      dog_size: '소형견',
      created_at: Date.now(),
    };
    setPost(fetchedPost);

    // 더미 댓글 데이터 설정
    setComments(dummyComments);
  }, [parsedId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: Date.now(),
        author: '나',
        content: newComment,
      };
      setComments((prevComments) => [newCommentData, ...prevComments]);
      setNewComment('');
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  return (
    <PageWrapper>
      {post ? (
        <>
          <PostHeader>
            <Title>{post.title}</Title>
            <Info>
              닉네임:{post.nickname} | 지역: {post.district} {post.neighborhood}{' '}
              | {post.dog_size}
            </Info>
            <Info>작성일: {new Date(post.created_at).toLocaleString()}</Info>
          </PostHeader>
          <Content>{post.content}</Content>
        </>
      ) : (
        <p>게시물을 불러오는 중...</p>
      )}

      <CommentsSection>
        <h2>댓글</h2>
        <CommentInputContainer>
          <CommentInput
            type='text'
            placeholder='댓글을 입력하세요...'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleAddComment} disabled={!newComment.trim()}>
            등록
          </Button>
        </CommentInputContainer>

        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentAuthor>{comment.author}</CommentAuthor>
              <CommentText>{comment.content}</CommentText>
              <CommentActions>
                <Button onClick={() => handleDeleteComment(comment.id)}>
                  삭제
                </Button>
              </CommentActions>
            </CommentItem>
          ))}
        </CommentList>
      </CommentsSection>
    </PageWrapper>
  );
};

export default PostDetail;
