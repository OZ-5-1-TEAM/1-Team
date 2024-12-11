import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import Loading from '../components/Loading';

// 갤러리 컨테이너 스타일
const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 20px;
`;

// 사진 스타일
const PhotoCard = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%; // 1:1 비율 유지
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const Photo = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotos = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/start');
        return;
      }

      setLoading(true);
      try {
        const [userResponse, petsResponse] = await Promise.all([
          api.get('/api/users/me/'),
          api.get('/api/pets/'),
        ]);

        // 사용자 프로필 사진
        const userPhotos = [
          userResponse.data.profilePhoto,
          userResponse.data.additionalPhoto,
        ].filter(Boolean); // 빈 값 제외

        // 반려동물 사진
        const petPhotos = petsResponse.data
          .flatMap((pet) => [pet.photo, pet.additionalPhoto])
          .filter(Boolean); // 빈 값 제외

        // 모든 사진 병합
        setPhotos([...userPhotos, ...petPhotos]);
      } catch (err) {
        console.error('사진 로드 실패:', err);
        setError('사진을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <GalleryContainer>
      {photos.map((photo, index) => (
        <PhotoCard key={index}>
          <Photo src={photo} alt={`사진 ${index + 1}`} />
        </PhotoCard>
      ))}
    </GalleryContainer>
  );
};

export default Gallery;
