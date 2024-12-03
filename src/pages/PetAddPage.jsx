import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  padding-top: 140px; /* Header 공간 확보 */
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const FormWrapper = styled.form`
  width: 90%;
  margin: 20px 0;
  padding-bottom: 60px; /* 하단 박스와 내용 겹침 방지 */
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

const BottomSpacer = styled.div`
  width: 100%;
  height: 60px;
  background-color: transparent; /* 빈 박스 배경 투명 */
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10; /* 다른 요소 위에 배치 */
`;

function AddPetPage() {
  const [form, setForm] = useState({
    name: '',
    breed: '',
    age: '',
    size: '',
    gender: '',
    intro: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = '반려견 이름을 입력해주세요.';
    if (!form.breed) newErrors.breed = '견종을 입력해주세요.';
    if (!form.age || isNaN(form.age))
      newErrors.age = '나이를 숫자로 입력해주세요.';
    if (!form.size) newErrors.size = '크기를 선택해주세요.';
    if (!form.gender) newErrors.gender = '성별을 선택해주세요.';
    if (!form.intro) newErrors.intro = '반려견 소개를 입력해주세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await axios.post('/api/v1/pets', form);
        if (response.status === 201) {
          alert('반려견 정보가 성공적으로 추가되었습니다.');
          navigate('/mypage'); // 마이페이지로 이동
        }
      } catch (error) {
        console.error('반려견 정보 추가 중 에러:', error);
        alert('반려견 정보를 추가하는 데 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <PageWrapper>
      <Title>반려견 정보추가</Title>
      <FormWrapper onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type='text'
            name='name'
            placeholder='반려견 이름을 입력하세요'
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Input
            type='text'
            name='breed'
            placeholder='견종을 입력하세요'
            value={form.breed}
            onChange={handleChange}
            error={errors.breed}
          />
          {errors.breed && <ErrorMessage>{errors.breed}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Input
            type='text'
            name='age'
            placeholder='나이를 입력하세요'
            value={form.age}
            onChange={handleChange}
            error={errors.age}
          />
          {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Select name='size' value={form.size} onChange={handleChange}>
            <option value=''>소형/중형/대형</option>
            <option value='small'>소형</option>
            <option value='medium'>중형</option>
            <option value='large'>대형</option>
          </Select>
          {errors.size && <ErrorMessage>{errors.size}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Select name='gender' value={form.gender} onChange={handleChange}>
            <option value=''>성별</option>
            <option value='male'>남</option>
            <option value='female'>여</option>
          </Select>
          {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
        </InputGroup>

        <UploadWrapper>
          <UploadLabel htmlFor='petPhoto'>
            📷 반려견 프로필 사진 등록하기
          </UploadLabel>
          <Input
            id='petPhoto'
            type='file'
            accept='image/*'
            onChange={(e) => console.log('업로드된 파일:', e.target.files[0])}
          />
        </UploadWrapper>

        <InputGroup>
          <Textarea
            name='intro'
            placeholder='반려견에 대해 소개해주세요'
            value={form.intro}
            onChange={handleChange}
          />
          {errors.intro && <ErrorMessage>{errors.intro}</ErrorMessage>}
        </InputGroup>

        <SubmitButton type='submit' disabled={loading}>
          {loading ? '추가 중...' : 'ADD'}
        </SubmitButton>
      </FormWrapper>

      <BottomSpacer />
    </PageWrapper>
  );
}

export default AddPetPage;
