import { useState } from 'react';
import styled from 'styled-components';

// 전체 화면 Wrapper
const FullScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  margin: 0;
`;

// JoinWrapper: 박스 너비를 첫 화면과 동일하게 설정, 색상은 기존 유지
const JoinWrapper = styled.div`
  padding: 30px;
  width: 300px; /* 첫 화면과 동일한 가로 너비 */
  border: 1px solid #f5b041;
  border-radius: 20px;
  background-color: #ffffff; /* 기존 색상 유지 */
`;

const Title = styled.h1`
  font-size: 36px;
  color: #f5b041;
  text-align: center;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  border: 1px solid ${(props) => (props.error ? 'red' : '#f5b041')};
  border-radius: 10px;
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color: #f5b041;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #f39c12;
  }
`;

const RegionSelectorWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Dropdown = styled.select`
  flex: 1;
  height: 50px;
  padding: 0 10px;
  border: 1px solid ${(props) => (props.error ? 'red' : '#f5b041')};
  border-radius: 10px;
  font-size: 16px;
`;

function JoinPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    district: '',
    neighborhood: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }

    if (!form.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (form.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자리여야 합니다.';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!form.nickname) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    }

    if (!form.district) {
      newErrors.district = '구를 선택해주세요.';
    }

    if (!form.neighborhood) {
      newErrors.neighborhood = '동을 선택해주세요.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('회원가입 정보:', form);
      // 서버로 데이터 전송 로직 추가
    }
  };

  return (
    <FullScreenWrapper>
      <JoinWrapper>
        <Title>JOIN</Title>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type='email'
              name='email'
              placeholder='이메일을 입력하세요'
              onChange={handleChange}
              error={errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputWrapper>
          <InputWrapper>
            <Input
              type='password'
              name='password'
              placeholder='비밀번호를 입력하세요'
              onChange={handleChange}
              error={errors.password}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputWrapper>
          <InputWrapper>
            <Input
              type='password'
              name='confirmPassword'
              placeholder='비밀번호를 재입력하세요'
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              type='text'
              name='nickname'
              placeholder='닉네임을 입력하세요'
              onChange={handleChange}
              error={errors.nickname}
            />
            {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
          </InputWrapper>
          <RegionSelectorWrapper>
            <Dropdown
              name='district'
              onChange={handleChange}
              error={errors.district}
            >
              <option value=''>구 선택</option>
              <option value='강남구'>강남구</option>
            </Dropdown>
            <Dropdown
              name='neighborhood'
              onChange={handleChange}
              error={errors.neighborhood}
            >
              <option value=''>동 선택</option>
              <option value='논현동'>논현동</option>
              <option value='신사동'>신사동</option>
              <option value='역삼동'>역삼동</option>
            </Dropdown>
          </RegionSelectorWrapper>
          {errors.district && <ErrorMessage>{errors.district}</ErrorMessage>}
          {errors.neighborhood && (
            <ErrorMessage>{errors.neighborhood}</ErrorMessage>
          )}
          <Button type='submit'>JOIN</Button>
        </form>
      </JoinWrapper>
    </FullScreenWrapper>
  );
}

export default JoinPage;
