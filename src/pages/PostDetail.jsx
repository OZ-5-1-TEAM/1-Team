import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';

const PageWrapper = styled.div`
  padding-top: 130px;
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

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // 게시물 데이터 가져오기
    fetch('/api/v1/posts/1') // 임시 ID 사용
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error('게시물 불러오기 실패:', error));

    // 댓글 목록 가져오기
    fetch('/api/comments/?post_id=1') // 임시 ID 사용
      .then((response) => response.json())
      .then((data) => setComments(data.results))
      .catch((error) => console.error('댓글 불러오기 실패:', error));
  }, []);

  const handleAddComment = () => {
    const newCommentData = {
      post_id: 1, // 임시 ID 사용
      content: newComment,
    };

    fetch('/api/comments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCommentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('댓글 작성 실패');
        }
        return response.json();
      })
      .then((data) => {
        setComments((prevComments) => [data, ...prevComments]);
        setNewComment('');
      })
      .catch((error) => {
        console.error(error);
        alert('댓글 작성 실패: 네트워크 문제');
      });
  };

  const handleDeleteComment = (id) => {
    fetch(`/api/comments/${id}/`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('댓글 삭제 실패');
        }
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== id)
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <PageWrapper>
      {post ? (
        <>
          <PostHeader>
            <Title>{post.title}</Title>
            <Info>
              지역: {post.district} {post.neighborhood} | 작성일:{' '}
              {new Date(post.created_at).toLocaleDateString()}
            </Info>
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
          <Button
            variant='send'
            size='small'
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            등록
          </Button>
        </CommentInputContainer>

        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentAuthor>{comment.author}</CommentAuthor>
              <CommentText>{comment.content}</CommentText>
              <CommentActions>
                <Button
                  variant='reply'
                  size='small'
                  onClick={() => console.log('답글 기능')}
                >
                  답글
                </Button>
                <Button
                  variant='delete'
                  size='small'
                  onClick={() => handleDeleteComment(comment.id)}
                >
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
