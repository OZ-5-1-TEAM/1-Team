import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ListItem = styled.div`
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

const ItemIcon = styled.div`
  width: 95px;
  height: 60px;
  background-color: #eee;
  border-radius: 5px;
  margin-right: 15px;
`;

const ItemDate = styled.p`
  font-size: 11px;
  color: #dfa700;
  margin: 0;
`;

const ItemTitle = styled.p`
  font-size: 20px;
  color: #8f8e94;
  margin: 5px 0 0 0;
`;

const ItemContent = styled.p`
  font-size: 17px;
  color: black;
  margin: 0;
`;

const PostList = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <>
      {posts.map((post) => (
        <ListItem key={post.id} onClick={() => navigate(post.path)}>
          <ItemIcon />
          <div>
            <ItemTitle>{post.postTitle}</ItemTitle>
            <ItemDate>{post.category}</ItemDate>
            <ItemContent>{post.postContent}</ItemContent>
          </div>
        </ListItem>
      ))}
    </>
  );
};

export default PostList;
