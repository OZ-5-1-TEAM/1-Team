import React, { useState } from 'react';
import PropTypes from 'prop-types'; // PropTypes import
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  padding-top: 140px; /* Header 공간 확보 */
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

const Select = styled.select`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 16px;
  color: #f5b041;
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

function EditPage({ userData, setUserData }) {
  const [form, setForm] = useState({
    email: userData?.email || '',
    password: '',
    confirmPassword: '',
    nickname: userData?.nickname || '',
    intro: userData?.intro || '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = '유효한 이메일 형식이 아닙니다.';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!form.nickname) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setUserData({ ...userData, ...form });
      navigate('/mypage');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <PageWrapper>
      <Title>정보수정</Title>
      <FormWrapper onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type='email'
            name='email'
            placeholder='이메일을 입력하세요'
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Input
            type='password'
            name='password'
            placeholder='비밀번호를 입력하세요'
            value={form.password}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Input
            type='password'
            name='confirmPassword'
            placeholder='비밀번호를 재확인하세요'
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          )}
        </InputGroup>

        <InputGroup>
          <Input
            type='text'
            name='nickname'
            placeholder='닉네임을 입력하세요'
            value={form.nickname}
            onChange={handleChange}
            error={errors.nickname}
          />
          {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Select name='region' onChange={handleChange}>
            <option value=''>구 선택</option>
            <option value='강남구'>강남구</option>
          </Select>
          <Select name='subRegion' onChange={handleChange}>
            <option value=''>동 선택</option>
            <option value='신사역'>신사역</option>
            <option value='논현역'>논현역</option>
            <option value='역삼역'>역삼역</option>
          </Select>
        </InputGroup>

        <UploadWrapper>
          <UploadLabel htmlFor='profilePhoto'>
            📷 프로필 사진 등록하기
          </UploadLabel>
          <Input
            id='profilePhoto'
            type='file'
            accept='image/*'
            onChange={(e) => console.log('업로드된 파일:', e.target.files[0])}
          />
        </UploadWrapper>

        <InputGroup>
          <Textarea
            name='intro'
            placeholder='자기소개를 입력하세요'
            value={form.intro}
            onChange={handleChange}
          />
        </InputGroup>

        <SubmitButton type='submit'>저장</SubmitButton>
      </FormWrapper>
    </PageWrapper>
  );
}

// PropTypes 추가
EditPage.propTypes = {
  userData: PropTypes.shape({
    email: PropTypes.string,
    nickname: PropTypes.string,
    intro: PropTypes.string,
  }),
  setUserData: PropTypes.func.isRequired,
};

export default EditPage;
