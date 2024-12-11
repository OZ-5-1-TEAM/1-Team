import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import api from '../api/axiosInstance';
import Loading from '../components/Loading';

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
  user-select: none;
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
  user-select: none;

  h2 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const CommentInput = styled.input`
  flex: 1;
  height: 30px;
  padding: 8px;
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
  display: flex;
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

const Actions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: left;
`;

const CommentsButtons = styled.div`
  display: flex;
  margin-left: 10px;
  margin-top: 2px;

  Button {
    margin-right: 5px;
  }
`;

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUserId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/v1/posts/${id}`);
        const postData = response.data.data;

        setPost({
          id: postData.id,
          title: postData.title,
          content: postData.content,
          district: postData.author_profile?.district || '알 수 없음',
          neighborhood: postData.author_profile?.neighborhood || '알 수 없음',
          nickname: postData.author_profile?.nickname || '익명 사용자',
          dog_size: postData.dog_size || '알 수 없음',
          likes_count: postData.likes_count,
          comments_count: postData.comments_count,
          is_liked: postData.is_liked,
          created_at: postData.created_at,
        });

        const formatComments = (comments, level = 0) =>
          comments.map((comment) => ({
            id: comment.id,
            authorId: comment.author,
            author: comment.author_nickname,
            content: comment.content,
            created_at: comment.created_at,
            level,
            parent: comment.parent,
            replies: formatComments(comment.replies || [], level + 1),
          }));

        const formattedComments = formatComments(postData.comments || []);
        setComments(formattedComments);
      } catch (err) {
        console.error('게시물 로드 실패:', err);
        setError('게시물을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleLikePost = async () => {
    try {
      const response = await api.post(`/v1/posts/${id}/like`);
      setPost((prevPost) => ({
        ...prevPost,
        likes_count: response.data.likes_count,
        is_liked: response.data.is_liked,
      }));
    } catch (err) {
      console.error('좋아요 처리 실패:', err);
      alert('좋아요 처리에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await api.post(`/v1/posts/${id}/comments/`, {
          content: newComment,
          parent: replyingTo?.id || null, // 부모 댓글 ID를 전달
        });

        const newCommentData = {
          id: response.data.id,
          authorId: currentUserId,
          author: '나',
          content: newComment,
          created_at: new Date().toISOString(),
          level: replyingTo ? replyingTo.level + 1 : 0,
          parent: replyingTo?.id || null,
          replies: [],
        };

        if (replyingTo) {
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === replyingTo.id
                ? {
                    ...comment,
                    replies: [...comment.replies, newCommentData],
                  }
                : comment
            )
          );
        } else {
          setComments((prevComments) => [newCommentData, ...prevComments]);
        }

        setPost((prevPost) => ({
          ...prevPost,
          comments_count: prevPost.comments_count + 1,
        }));

        setNewComment('');
        setReplyingTo(null);
      } catch (err) {
        console.error('댓글 작성 실패:', err);
        alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleReply = (comment) => {
    setReplyingTo(comment);
    setNewComment(`@${comment.author} `); // 답글 태그 표시
  };

  const handleDeleteComment = async (commentId, authorId) => {
    if (authorId !== Number(currentUserId)) {
      alert('본인이 작성한 댓글만 삭제할 수 있습니다.');
      return;
    }

    try {
      await api.delete(`/v1/posts/${id}/comments/${commentId}/`);
      setComments(
        (prevComments) =>
          prevComments
            .map((comment) => {
              // 댓글 및 대댓글 삭제 처리
              if (comment.id === commentId) return null; // 삭제된 댓글은 null로 설정
              if (comment.replies) {
                comment.replies = comment.replies.filter(
                  (reply) => reply.id !== commentId
                );
              }
              return comment;
            })
            .filter(Boolean) // null 값 제거
      );
      alert('댓글이 삭제되었습니다.');
    } catch (err) {
      console.error('댓글 삭제 실패:', err);
      alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const isCommentDeletable = (authorId) => authorId === Number(currentUserId);

  // 새 댓글 입력 시 replyingTo 초기화 로직 추가
  const handleCommentInputChange = (value) => {
    setNewComment(value);

    // 태그가 비어있거나 기존 @닉네임 형식이 삭제된 경우 초기화
    if (!value.startsWith(`@${replyingTo?.author}`)) {
      setReplyingTo(null);
    }
  };

  const renderComments = (comments) =>
    comments.map((comment) => (
      <CommentItem
        key={comment.id}
        style={{ marginLeft: `${comment.level * 20}px` }}
      >
        <CommentAuthor>
          {comment.author}{' '}
          <CommentsButtons>
            <Button
              variant='reply'
              size='sosmall'
              onClick={() => handleReply(comment)}
            >
              답글
            </Button>
            <CommentActions>
              <Button
                variant='delete'
                size='sosmall'
                onClick={() => handleDeleteComment(comment.id)}
              >
                삭제
              </Button>
            </CommentActions>
          </CommentsButtons>
        </CommentAuthor>

        <CommentText>{comment.content}</CommentText>
        {comment.replies &&
          comment.replies.length > 0 &&
          renderComments(comment.replies)}
      </CommentItem>
    ));

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <PageWrapper>
      {post ? (
        <>
          <PostHeader>
            <Title>{post.title}</Title>
            <Info>
              닉네임: {post.nickname} | 지역: {post.district}{' '}
              {post.neighborhood} | {post.dog_size}
            </Info>
            <Info>작성일: {new Date(post.created_at).toLocaleString()}</Info>
          </PostHeader>
          <Content>{post.content}</Content>
          <Actions>
            <LikeButton onClick={handleLikePost} isLiked={post.is_liked}>
              {post.is_liked ? '🤍' : '❤️'} 좋아요 {post.likes_count}
            </LikeButton>
            <CommentCount>댓글 {post.comments_count}개</CommentCount>
          </Actions>
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
          <Button variant='send' onClick={handleAddComment}>
            등록
          </Button>
        </CommentInputContainer>

        {replyingTo && (
          <p>
            <strong>@{replyingTo.author}</strong> 님에게 답글 작성 중...
          </p>
        )}

        <CommentList>{renderComments(comments)}</CommentList>
      </CommentsSection>
    </PageWrapper>
  );
};

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }
`;

const CommentCount = styled.span`
  background: none;
  border: none;
  color: ${(props) => (props.isLiked ? 'red' : 'black')};
  font-size: 16px;
  margin-top: 3.2px;
  margin-right: 10px;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }
`;

export default PostDetail;
