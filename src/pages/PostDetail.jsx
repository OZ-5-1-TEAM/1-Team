import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import api from '../api/axiosInstance';

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

const PostDetail = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 현재 로그인한 사용자 ID
  const currentUserId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchPostDetails = () => {
      setLoading(true);
      api
        .get(`/v1/posts/${id}`)
        .then((response) => {
          const postData = response.data;

          // 게시물 정보 설정
          setPost({
            id: postData.id,
            title: postData.title,
            content: postData.content,
            district: postData.author_profile?.district || '알 수 없음',
            neighborhood: postData.author_profile?.neighborhood || '알 수 없음',
            nickname: postData.author_profile?.nickname || '익명 사용자',
            dog_size: postData.dog_size || '알 수 없음',
            created_at: postData.created_at,
          });

          console.log(post);
          // 댓글 설정
          const formattedComments = (postData.comments || []).map(
            (comment) => ({
              id: comment.id,
              authorId: comment.author.id,
              author: comment.author.nickname,
              content: comment.content,
              created_at: comment.created_at,
            })
          );
          setComments(formattedComments);
        })
        .catch((err) => {
          console.error('게시물 로드 실패:', err);
          setError('게시물을 불러오는 데 실패했습니다.');
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchPostDetails();
  }, [id]);
  console.log(post);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: Date.now(),
        authorId: currentUserId,
        author: '나',
        content: newComment,
        created_at: new Date().toISOString(),
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

  const isCommentDeletable = (authorId) => authorId === Number(currentUserId);

  if (loading) {
    return <p>게시물을 불러오는 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  console.log(post);
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
        <p>게시물을 찾을 수 없습니다.</p>
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
                {isCommentDeletable(comment.authorId) && (
                  <Button onClick={() => handleDeleteComment(comment.id)}>
                    삭제
                  </Button>
                )}
              </CommentActions>
            </CommentItem>
          ))}
        </CommentList>
      </CommentsSection>
    </PageWrapper>
  );
};

export default PostDetail;
