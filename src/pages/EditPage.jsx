import { useState } from 'react'; // React 삭제
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';

// Styled Components
const PageWrapper = styled.div`
  padding-top: 140px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormWrapper = styled.form`
  width: 90%;
  margin: 20px 0;
  padding-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #f5b041;
  text-align: center;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: 1px solid ${(props) => (props.error ? 'red' : '#ddd')};
  border-radius: 10px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  resize: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #f5b041;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f39c12;
  }
`;

const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const UploadLabel = styled.label`
  font-size: 16px;
  color: #f5b041;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

// 사용자 정보 수정 페이지 컴포넌트
function EditPage({ userData, setUserData }) {
  const [form, setForm] = useState({
    // nickname: userData?.nickname || '',
    bio: userData?.bio || '',
  });
  const [errors, setErrors] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const validate = () => {
  //   const newErrors = {};
  //   if (!form.nickname) {
  //     newErrors.nickname = '닉네임을 입력해주세요.';
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          profilePhoto: '파일 크기는 5MB 이하여야 합니다.',
        }));
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          profilePhoto: 'JPEG 또는 PNG 형식의 이미지만 업로드 가능합니다.',
        }));
        return;
      }
      setErrors((prev) => ({ ...prev, profilePhoto: null }));
      setProfilePhoto(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validate()) return;

    const formData = new FormData();
    // formData.append('nickname', form.nickname);
    formData.append('bio', form.bio);
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }

    setIsLoading(true);
    setErrors({});
    try {
      const response = await api.put('/v1/users/me/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, // 헤더 명시
      });

      setUserData(response.data); // 업데이트된 사용자 정보를 상태에 반영
      alert('정보가 성공적으로 업데이트되었습니다.');
      navigate('/mypage');
    } catch (error) {
      console.error('정보 업데이트 에러:', error);
      const errorMessage =
        error.response?.data?.detail || '요청 처리 중 문제가 발생했습니다.';
      setErrors((prev) => ({ ...prev, server: errorMessage }));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <PageWrapper>
      <Title>정보수정</Title>
      <FormWrapper onSubmit={handleSubmit}>
        {/* <InputGroup>
          <Input
            type='text'
            name='nickname'
            placeholder='닉네임을 입력하세요'
            value={form.nickname}
            onChange={handleChange}
            error={errors.nickname}
          />
          {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
        </InputGroup> */}
        <UploadWrapper>
          <UploadLabel htmlFor='profilePhoto'>
            📷 프로필 사진 등록하기
          </UploadLabel>
          <Input
            id='profilePhoto'
            type='file'
            accept='image/*'
            onChange={handleFileChange}
          />
          {errors.profilePhoto && (
            <ErrorMessage>{errors.profilePhoto}</ErrorMessage>
          )}
        </UploadWrapper>
        <InputGroup>
          <Textarea
            name='bio'
            placeholder='자기소개를 입력하세요'
            value={form.bio}
            onChange={handleChange}
          />
        </InputGroup>
        {errors.server && <ErrorMessage>{errors.server}</ErrorMessage>}
        <SubmitButton type='submit' disabled={isLoading}>
          {isLoading ? '저장 중...' : '저장'}
        </SubmitButton>
      </FormWrapper>
    </PageWrapper>
  );
}

EditPage.propTypes = {
  userData: PropTypes.shape({
    // nickname: PropTypes.string,
    bio: PropTypes.string,
  }),
  setUserData: PropTypes.func.isRequired,
};

export default EditPage;
