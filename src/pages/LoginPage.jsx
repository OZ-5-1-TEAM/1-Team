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

// Wrapper: 회원가입 페이지와 동일한 스타일 유지
const LoginWrapper = styled.div`
  padding: 30px;
  width: 300px; /* 회원가입 페이지와 동일한 너비 */
  border: 1px solid #f5b041;
  border-radius: 20px;
  background-color: #ffffff;
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

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('로그인 정보:', form);
      // 로그인 API 호출 로직 추가
    }
  };

  return (
    <FullScreenWrapper>
      <LoginWrapper>
        <Title>LOGIN</Title>
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
          <Button type='submit'>LOGIN</Button>
        </form>
      </LoginWrapper>
    </FullScreenWrapper>
  );
}

export default LoginPage;
