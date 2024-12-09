import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Styled Components
const PageWrapper = styled.div`
  padding-top: 140px;
  width: 100%;
  max-width: 600px;
  min-height: calc(100vh - 60px);
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid #ddd;
`;

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
  background-image: ${(props) => (props.src ? `url(${props.src})` : 'none')};
  background-size: cover;
  background-position: center;
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
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: #f5b041;
  cursor: pointer;
`;

const HorizontalSectionBody = styled.div`
  display: flex;
  gap: 10px;
`;

const Box = styled.div`
  width: 48%;
  height: 100px;
  background-color: #f5f5f5;
  border-radius: 10px;
  background-image: ${(props) => (props.src ? `url(${props.src})` : 'none')};
  background-size: cover;
  background-position: center;
`;

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

const FooterActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding-bottom: 80px;
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

  // States
  const [profile, setProfile] = useState({});
  const [pets, setPets] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [profileResponse, petsResponse, likedPostsResponse] =
          await Promise.all([
            axios.get('/api/v1/users/me'),
            axios.get('/api/v1/pets'),
            axios.get('/api/v1/posts/liked'),
          ]);

        setProfile(profileResponse.data || {});
        setPets(petsResponse.data?.pets || []);
        setLikedPosts(likedPostsResponse.data?.posts || []);
      } catch (err) {
        console.error('데이터 가져오기 오류:', err);
        setError('데이터를 가져오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <PageWrapper>
        <Header title='My Page' />

        {/* 프로필 섹션 */}
        <ProfileSection>
          <ProfileInfo>
            <ProfileImage src={profile.profilePhoto} />
            <ProfileDetails>
              <ProfileName>{profile.nickname || '닉네임 없음'}</ProfileName>
              <ProfileEmail>{profile.email || '이메일 없음'}</ProfileEmail>
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
          <p>{profile.intro || '자기소개를 입력해주세요.'}</p>
        </Section>

        {/* MY Photo 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle onClick={() => navigate('/myphoto')}>
              MY Photo
            </SectionTitle>
          </SectionHeader>
          <HorizontalSectionBody>
            <Box src={profile.profilePhoto} />
            <Box src={profile.additionalPhoto} />
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
            {pets.length > 0 ? (
              pets.map((pet) => (
                <Box key={pet.id} src={pet.photo}>
                  <p>{pet.name}</p>
                  <p>{pet.breed}</p>
                </Box>
              ))
            ) : (
              <p>등록된 반려견이 없습니다.</p>
            )}
          </HorizontalSectionBody>
        </Section>

        {/* 반려견 사진 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle>반려견 사진</SectionTitle>
          </SectionHeader>
          <HorizontalSectionBody>
            {pets.length > 0 ? (
              pets.map((pet) => (
                <Box
                  key={`photo-${pet.id}`}
                  src={pet.additionalPhoto || pet.photo}
                >
                  <p>{pet.name}</p>
                </Box>
              ))
            ) : (
              <p>등록된 반려견 사진이 없습니다.</p>
            )}
          </HorizontalSectionBody>
        </Section>

        {/* 내가 좋아요한 게시물 섹션 */}
        <Section>
          <SectionHeader>
            <SectionTitle onClick={() => navigate('/likedposts')}>
              내가 좋아요한 게시물
            </SectionTitle>
          </SectionHeader>
          <VerticalSectionBody>
            {likedPosts.length > 0 ? (
              likedPosts.map((post) => (
                <CommunityItem key={post.id}>
                  <CommunityDetails>
                    <CommunityName>{post.category}</CommunityName>
                    <CommunityTitle>{post.title}</CommunityTitle>
                  </CommunityDetails>
                </CommunityItem>
              ))
            ) : (
              <p>좋아요한 게시물이 없습니다.</p>
            )}
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
      <Footer />
    </>
  );
}

export default MyPage;
