import { useState } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
import api from '../api/axiosInstance';

// 전체 화면 Wrapper
const FullScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  margin: 0;
`;

const JoinWrapper = styled.div`
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
  position: relative;
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

const SmallButton = styled.button`
  position: absolute;
  right: 5px;
  top: 10px;
  height: 30px;
  background-color: #f5b041;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
    confirm_password: '',
    nickname: '',
    district: '',
    neighborhood: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // 이메일 및 닉네임 중복 확인 초기화
    if (e.target.name === 'email') setEmailChecked(false);
    if (e.target.name === 'nickname') setNicknameChecked(false);
  };

  const validate = () => {
    const newErrors = {};

    // 이메일 유효성 검증
    if (!form.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    } else if (!emailChecked) {
      newErrors.email = '이메일 중복 확인이 필요합니다.';
    }

    // 비밀번호 유효성 검증
    if (!form.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (form.password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자리여야 합니다.';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
      newErrors.password = '비밀번호에 특수문자가 포함되어야 합니다.';
    }

    if (form.password !== form.confirm_password) {
      newErrors.confirm_password = '비밀번호가 일치하지 않습니다.';
    }

    // 닉네임 검증
    if (!form.nickname) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    } else if (!nicknameChecked) {
      newErrors.nickname = '닉네임 중복 확인이 필요합니다.';
    }

    // 지역 및 동 선택 검증
    if (!form.district) {
      newErrors.district = '구를 선택해주세요.';
    }

    if (!form.neighborhood) {
      newErrors.neighborhood = '동을 선택해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkEmail = async () => {
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      setModalMessage('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    try {
      const response = await api.post('/v1/users/check-email/', {
        email: form.email,
      });
      if (response.data.available) {
        setEmailChecked(true);
        setModalMessage('사용 가능한 이메일입니다.');
      } else {
        setEmailChecked(false);
        setModalMessage('이미 사용 중인 이메일입니다.');
      }
    } catch (error) {
      console.error('이메일 확인 오류:', error);
      setModalMessage('이메일 확인 중 문제가 발생했습니다.');
    }
  };

  const checkNickname = async () => {
    if (!form.nickname) {
      setModalMessage('닉네임을 입력해주세요.');
      return;
    }
    try {
      const response = await api.post('/v1/users/check-nickname/', {
        nickname: form.nickname,
      });
      if (response.data.available) {
        setNicknameChecked(true);
        setModalMessage('사용 가능한 닉네임입니다.');
      } else {
        setNicknameChecked(false);
        setModalMessage('이미 사용 중인 닉네임입니다.');
      }
    } catch (error) {
      console.error('닉네임 확인 오류:', error);
      setModalMessage('닉네임 확인 중 문제가 발생했습니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const payload = { ...form };

        const response = await api.post('/v1/users/signup/', payload);
        setModalMessage('회원가입 성공! 로그인 페이지로 이동합니다.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } catch (error) {
        console.error('회원가입 에러:', error);

        if (error.response) {
          const status = error.response.status;
          const errorData = error.response.data;

          if (status === 400) {
            setModalMessage(errorData.message || '입력 데이터를 확인해주세요.');
          } else if (status === 409) {
            setModalMessage('이미 사용 중인 이메일 또는 닉네임입니다.');
          } else {
            setModalMessage('회원가입 중 문제가 발생했습니다.');
          }
        } else {
          setModalMessage(
            '서버와 연결할 수 없습니다. 네트워크 상태를 확인해주세요.'
          );
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FullScreenWrapper>
      {modalMessage && (
        <Modal message={modalMessage} onClose={() => setModalMessage('')} />
      )}
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
            <SmallButton type='button' onClick={checkEmail}>
              중복 확인
            </SmallButton>
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
              name='confirm_password'
              placeholder='비밀번호를 재입력하세요'
              onChange={handleChange}
              error={errors.confirm_password}
            />
            {errors.confirm_password && (
              <ErrorMessage>{errors.confirm_password}</ErrorMessage>
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
            <SmallButton type='button' onClick={checkNickname}>
              중복 확인
            </SmallButton>
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
          <Button type='submit' disabled={loading}>
            {loading ? '가입 중...' : 'JOIN'}
          </Button>
        </form>
      </JoinWrapper>
    </FullScreenWrapper>
  );
}

export default JoinPage;
