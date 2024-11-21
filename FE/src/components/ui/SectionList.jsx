import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 15px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #ff9900;
  margin: 10px;
  cursor: pointer;
`;

const SectionArrow = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #ff9900;
  cursor: pointer;
`;

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

const ListIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #eee;
  border-radius: 5px;
  margin-right: 15px;
`;

const ItemCategory = styled.p`
  font-size: 11px;
  color: #dfa700;
  margin: 0;
`;

const ItemTitle = styled.p`
  font-size: 17px;
  color: #8f8e94;
  margin: 5px 0 0 0;
`;

const SectionList = ({ sections, sectionTitle, sectionPath }) => {
  const navigate = useNavigate();

  return (
    <>
      <SectionHeader>
        <SectionTitle onClick={() => navigate(sectionPath)}>
          {sectionTitle}
        </SectionTitle>
        <SectionArrow onClick={() => navigate(sectionPath)}>›</SectionArrow>
      </SectionHeader>
      {sections.map((section) => (
        <ListItem key={section.id} onClick={() => navigate(section.path)}>
          <ListIcon />
          <div>
            <ItemCategory>{section.category}</ItemCategory>
            <ItemTitle>{section.postTitle}</ItemTitle>
          </div>
        </ListItem>
      ))}
    </>
  );
};

export default SectionList;
