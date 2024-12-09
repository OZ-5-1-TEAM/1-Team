import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// 전체 화면 Wrapper
const FullScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  margin: 0;
`;

// 로고 Wrapper
const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  display: inline-block;
  width: 150px;
  height: auto;
`;

const LoginWrapper = styled.div`
  padding: 30px;
  width: 300px;
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = '유효한 이메일 형식이 아닙니다.';
    }

    if (!form.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await axios.post(
          'http://43.201.242.157:8000/api/v1/users/login',
          form
        );
        const { access_token } = response.data;
        localStorage.setItem('access_token', access_token);
        alert('로그인 성공!');
        window.location.href = '/dashboard'; // 로그인 후 리다이렉트
      } catch (error) {
        console.error('로그인 에러:', error);
        if (error.response?.status === 401) {
          alert('이메일 또는 비밀번호가 올바르지 않습니다.');
        } else {
          alert('로그인 중 문제가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FullScreenWrapper>
      <LoginWrapper>
        <LogoWrapper>
          <Logo src='/path/to/logo.png' alt='개랑말이 로고' />
        </LogoWrapper>
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
          <Button type='submit' disabled={loading}>
            {loading ? '로그인 중...' : 'LOGIN'}
          </Button>
        </form>
      </LoginWrapper>
    </FullScreenWrapper>
  );
}

export default LoginPage;
