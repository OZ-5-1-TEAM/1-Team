import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// 전체 페이지 Wrapper
const PageWrapper = styled.div`
  padding-top: 140px; /* 헤더 여백 */
  width: 100%;
  max-width: 600px;
  min-height: calc(100vh - 60px); /* Footer 높이 보정 */
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

// 섹션 Wrapper
const Section = styled.section`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #ddd;
`;

// 프로필 섹션
const ProfileSection = styled(Section)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ProfileImage = styled.div`
  width: 70px;
  height: 70px;
  background-color: #ddd;
  border-radius: 50%;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const ProfileEmail = styled.p`
  font-size: 14px;
  color: #999;
  margin: 5px 0 0 0;
`;

const ProfileIcons = styled.div`
  display: flex;
  gap: 15px;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const ProfileIcon = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #f5b041;
  cursor: pointer;
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 20px;
  background: none;
  border: none;
  font-size: 14px;
  color: #f5b041;
  cursor: pointer;
`;

// 섹션 Header
const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #f5b041;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 14px; /* 프로필 섹션 EDIT와 동일한 스타일 */
  color: #f5b041;
  cursor: pointer;
`;

// MY Photo 섹션과 반려견 정보 섹션
const HorizontalSectionBody = styled.div`
  display: flex;
  gap: 10px;
`;

const Box = styled.div`
  width: 48%;
  height: 100px;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

// 내가 좋아요한 게시물 섹션
const VerticalSectionBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CommunityItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

const CommunityDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommunityName = styled.span`
  font-size: 12px;
  color: #f5b041;
`;

const CommunityTitle = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

// Footer Actions
const FooterActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding-bottom: 80px; /* 푸터와의 간격 확보 */
`;

const FooterActionButton = styled.button`
  background: none;
  border: none;
  color: #f5b041;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    color: #f39c12;
  }
`;

function MyPage() {
  const navigate = useNavigate();

  return (
    <>
      <PageWrapper>
        {/* 상단 Header */}
        <Header title='My Page' />

        {/* 프로필 섹션 */}
        <ProfileSection>
          <ProfileInfo>
            <ProfileImage />
            <ProfileDetails>
              <ProfileName>Nickname</ProfileName>
              <ProfileEmail>해당 회원 이메일 주소</ProfileEmail>
            </ProfileDetails>
          </ProfileInfo>
          <ProfileIcons>
            <ProfileIcon onClick={() => navigate('/mate')}>🐾</ProfileIcon>
            <ProfileIcon onClick={() => navigate('/message')}>✉️</ProfileIcon>
          </ProfileIcons>
          <EditButton onClick={() => navigate('/edit')}>EDIT</EditButton>
        </ProfileSection>

        {/* 자기소개 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>자기소개</SectionTitle>
          </SectionHeader>
          <p>자기소개를 입력해주세요.</p>
        </Section>

        {/* MY Photo 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>MY Photo</SectionTitle>
          </SectionHeader>
          <HorizontalSectionBody>
            <Box />
            <Box />
          </HorizontalSectionBody>
        </Section>

        {/* 반려견 소개 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>반려견 소개</SectionTitle>
            <ButtonGroup>
              <ActionButton onClick={() => navigate('/pet/add')}>
                ADD
              </ActionButton>
              <ActionButton onClick={() => navigate('/pet/edit')}>
                EDIT
              </ActionButton>
              <ActionButton onClick={() => navigate('/mypetphoto')}>
                {'>'}
              </ActionButton>
            </ButtonGroup>
          </SectionHeader>
          <HorizontalSectionBody>
            <Box />
            <Box />
          </HorizontalSectionBody>
        </Section>

        {/* 내가 좋아요한 게시물 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>내가 좋아요한 게시물</SectionTitle>
          </SectionHeader>
          <VerticalSectionBody>
            <CommunityItem>
              <CommunityDetails>
                <CommunityName>COMMUNITY NAME</CommunityName>
                <CommunityTitle>TITLE</CommunityTitle>
              </CommunityDetails>
            </CommunityItem>
            <CommunityItem>
              <CommunityDetails>
                <CommunityName>COMMUNITY NAME</CommunityName>
                <CommunityTitle>TITLE</CommunityTitle>
              </CommunityDetails>
            </CommunityItem>
          </VerticalSectionBody>
        </Section>

        {/* Footer Actions */}
        <FooterActions>
          <FooterActionButton onClick={() => navigate('/logout')}>
            LOGOUT
          </FooterActionButton>
          <FooterActionButton onClick={() => navigate('/withdraw')}>
            MEMBERSHIP WITHDRAWAL
          </FooterActionButton>
        </FooterActions>
      </PageWrapper>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default MyPage;
