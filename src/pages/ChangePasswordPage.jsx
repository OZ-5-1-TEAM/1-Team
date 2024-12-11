import { useState } from 'react';
import styled from 'styled-components';
import api from '../api/axiosInstance'; // axiosInstance 사용

// Styled Components
const FullScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  margin: 0;
`;

const ChangePasswordWrapper = styled.div`
  padding: 30px;
  width: 300px;
  border: 1px solid #f5b041;
  border-radius: 20px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  font-size: 24px;
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

function ChangePasswordPage() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.currentPassword) {
      newErrors.currentPassword = '현재 비밀번호를 입력해주세요.';
    }

    if (!form.newPassword) {
      newErrors.newPassword = '새 비밀번호를 입력해주세요.';
    } else if (form.newPassword.length < 8) {
      newErrors.newPassword = '비밀번호는 최소 8자리여야 합니다.';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.newPassword)) {
      newErrors.newPassword = '비밀번호에 특수문자가 포함되어야 합니다.';
    }

    if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword =
        '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        await api.post('/v1/users/password-change/', {
          current_password: form.currentPassword,
          new_password: form.newPassword,
          new_password_confirm: form.confirmPassword,
        });
        alert('비밀번호가 성공적으로 변경되었습니다.');
        window.location.href = '/start';
      } catch (error) {
        console.error('비밀번호 변경 오류:', error);
        if (error.response?.status === 400) {
          alert('현재 비밀번호가 올바르지 않습니다.');
        } else {
          alert('비밀번호 변경 중 문제가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FullScreenWrapper>
      <ChangePasswordWrapper>
        <Title>비밀번호 변경</Title>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type='password'
              name='currentPassword'
              placeholder='현재 비밀번호'
              onChange={handleChange}
              error={errors.currentPassword}
            />
            {errors.currentPassword && (
              <ErrorMessage>{errors.currentPassword}</ErrorMessage>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              type='password'
              name='newPassword'
              placeholder='새 비밀번호'
              onChange={handleChange}
              error={errors.newPassword}
            />
            {errors.newPassword && (
              <ErrorMessage>{errors.newPassword}</ErrorMessage>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              type='password'
              name='confirmPassword'
              placeholder='새 비밀번호 확인'
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            )}
          </InputWrapper>
          <Button type='submit' disabled={loading}>
            {loading ? '변경 중...' : '비밀번호 변경'}
          </Button>
        </form>
      </ChangePasswordWrapper>
    </FullScreenWrapper>
  );
}

export default ChangePasswordPage;
