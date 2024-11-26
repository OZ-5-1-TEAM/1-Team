import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

// 전체 화면 레이아웃 스타일
const MyPageWrapper = styled.div`
  padding-top: 120px;
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 63px;
`;

// 프로필 섹션
const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #ddd;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  background-color: #eee;
  border-radius: 50%;
  margin-right: 15px;
  background-image: url('/placeholder-profile.png');
  background-size: cover;
  background-position: center;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

const Email = styled.span`
  font-size: 14px;
  color: #999;
`;

const Location = styled.span`
  font-size: 14px;
  color: #f5b041;
`;

const EditButton = styled.button`
  font-size: 14px;
  color: #f5b041;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #f39c12;
  }
`;

// 섹션 공통 스타일
const Section = styled.section`
  padding: 20px;
  border-bottom: 1px solid #ddd;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #f5b041;
  margin-bottom: 10px;
`;

const AddEditButton = styled.button`
  font-size: 14px;
  color: #f5b041;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: #f39c12;
  }
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PhotoBox = styled.div`
  width: 100px;
  height: 100px;
  background-color: #eee;
  border-radius: 5px;
`;

// 좋아요 한 게시물 스타일
const PostList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostCommunity = styled.span`
  font-size: 12px;
  color: #f5b041;
`;

const PostTitle = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #f5b041;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #f39c12;
  }
`;

function MyPage() {
  return (
    <MyPageWrapper>
      <Header title='마이페이지' />

      {/* 프로필 섹션 */}
      <ProfileSection>
        <ProfileInfo>
          <ProfileImage />
          <ProfileDetails>
            <Nickname>Nickname</Nickname>
            <Email>해당 회원 이메일 주소</Email>
            <Location>논현동</Location>
          </ProfileDetails>
        </ProfileInfo>
        <EditButton>EDIT</EditButton>
      </ProfileSection>

      {/* 자기소개 섹션 */}
      <Section>
        <SectionTitle>
          자기소개
          <AddEditButton>EDIT</AddEditButton>
        </SectionTitle>
        <p>자기소개 내용을 입력해주세요.</p>
      </Section>

      {/* MY Photo 섹션 */}
      <Section>
        <SectionTitle>MY Photo</SectionTitle>
        <PhotoContainer>
          <PhotoBox />
          <PhotoBox />
          <PhotoBox />
        </PhotoContainer>
      </Section>

      {/* 반려견 소개 섹션 */}
      <Section>
        <SectionTitle>
          반려견 소개
          <AddEditButton>ADD</AddEditButton>
          <AddEditButton>EDIT</AddEditButton>
        </SectionTitle>
        <p>반려견 소개 내용을 입력해주세요.</p>
      </Section>

      {/* 좋아요 한 게시물 섹션 */}
      <Section>
        <SectionTitle>내가 좋아요한 게시물</SectionTitle>
        <PostList>
          <PostItem>
            <PostDetails>
              <PostCommunity>COMMUNITY NAME</PostCommunity>
              <PostTitle>TITLE</PostTitle>
            </PostDetails>
          </PostItem>
          <PostItem>
            <PostDetails>
              <PostCommunity>COMMUNITY NAME</PostCommunity>
              <PostTitle>TITLE</PostTitle>
            </PostDetails>
          </PostItem>
        </PostList>
      </Section>

      {/* 로그아웃 / 탈퇴 버튼 */}
      <Section>
        <LogoutButton>LOGOUT</LogoutButton>
        <LogoutButton>MEMBERSHIP WITHDRAWAL</LogoutButton>
      </Section>
    </MyPageWrapper>
  );
}

export default MyPage;
