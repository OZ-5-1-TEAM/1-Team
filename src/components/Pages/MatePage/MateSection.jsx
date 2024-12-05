import React from 'react';
import styled from 'styled-components';
import Button from '../../Button/Button';
import { FocusStyles } from '../MessagePage/Styles/MessageStyles';

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
  user-select: none;
`;

const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: bold;
  color: #ffa726;
  margin-bottom: 15px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  margin: 10px;
  ${FocusStyles}
`;

const ButtonRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MateList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 15px;
  user-select: none;
`;

const MateItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MateProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #ddd;
`;

const MateName = styled.span`
  font-size: 14px;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const MateSection = ({
  mateRequests,
  handleAcceptRequest,
  handleRejectRequest,
  searchQuery,
  setSearchQuery,
  handleSearch,
  filteredMates,
  setSelectedMate,
  handleDeleteMate,
}) => {
  return (
    <>
      <Section>
        <SectionTitle>메이트 신청 알림</SectionTitle>
        <MateList>
          {mateRequests.map((request) => (
            <MateItem key={request.id}>
              <MateProfile>
                <ProfileImage
                  src={request.image}
                  alt={`${request.name} 프로필`}
                />
                <MateName>{request.name}</MateName>
              </MateProfile>
              <ButtonGroup>
                <Button
                  variant='request'
                  size='small'
                  onClick={() => handleAcceptRequest(request.id)}
                >
                  수락
                </Button>
                <Button
                  variant='cancel'
                  size='small'
                  onClick={() => handleRejectRequest(request.id)}
                >
                  거절
                </Button>
              </ButtonGroup>
            </MateItem>
          ))}
        </MateList>
      </Section>

      <Section>
        <SectionTitle>메이트 List</SectionTitle>
        <SearchBarContainer>
          <SearchInput
            type='text'
            placeholder='검색할 닉네임을 입력하세요'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <ButtonRight>
            <Button
              variant='send'
              size='small'
              onClick={handleSearch}
              style={{ margin: '10px' }}
            >
              검색
            </Button>
          </ButtonRight>
        </SearchBarContainer>
        <MateList>
          {filteredMates.map((mate) => (
            <MateItem key={mate.id}>
              <MateProfile>
                <ProfileImage src={mate.image} alt={`${mate.name} 프로필`} />
                <MateName>{mate.name}</MateName>
              </MateProfile>
              <ButtonGroup>
                <Button
                  variant='reply'
                  size='small'
                  onClick={() => setSelectedMate(mate)}
                >
                  쪽지
                </Button>
                <Button
                  variant='cancel'
                  size='small'
                  onClick={() => handleDeleteMate(mate.id)}
                >
                  삭제
                </Button>
              </ButtonGroup>
            </MateItem>
          ))}
        </MateList>
      </Section>
    </>
  );
};

export default MateSection;
