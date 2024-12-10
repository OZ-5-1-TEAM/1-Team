import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../Button/Button.jsx';
import { FocusStyles } from '../MessagePage/Styles/MessageStyles';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 1px;
  color: #555;
  user-select: none;
`;

const Input = styled.input`
  min-height: 45px;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: all 0.3s;
  ${FocusStyles}

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const TextArea = styled.textarea`
  min-height: 150px;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  transition: all 0.3s;
  ${FocusStyles}

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const AddressInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const AddressInput = styled(Input)`
  flex: 1;
`;

const EmailWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const EmailInput = styled(Input)`
  flex: 1;
`;

const EmailDomainSelect = styled.select`
  flex: 1;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ddd;
  ${FocusStyles}

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const CustomAddressInput = styled(Input)`
  width: 100%;
`;

function CustomerServiceForm({ onSubmit, onCancel }) {
  const initialFormState = {
    title: '',
    email: '',
    address: { district: '', neighborhood: '', custom_address: '' },
    content: '',
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: { ...prevFormData.address, [id]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormState);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor='title'>제목</Label>
      <Input
        id='title'
        type='text'
        placeholder='제목을 입력하세요'
        onChange={handleInputChange}
        required
      />
      <Label htmlFor='email'>이메일</Label>
      <EmailWrapper>
        <EmailInput
          id='emailId'
          type='text'
          placeholder='이메일 ID 입력'
          onChange={handleInputChange}
          required
        />
        <span>@</span>
        <EmailDomainSelect
          id='emailDomain'
          onChange={(e) =>
            setFormData({ ...formData, emailDomain: e.target.value })
          }
          required
        >
          <option value=''>도메인 선택</option>
          <option value='naver.com'>naver.com</option>
          <option value='daum.net'>daum.net</option>
          <option value='gmail.com'>gmail.com</option>
          <option value='outlook.com'>outlook.com</option>
          <option value='yahoo.com'>yahoo.com</option>
          <option value='hotmail.com'>hotmail.com</option>
          <option value='custom'>직접 입력</option>
        </EmailDomainSelect>
      </EmailWrapper>
      {formData.emailDomain === 'custom' && (
        <CustomAddressInput
          id='customDomain'
          type='text'
          placeholder='도메인 입력'
          onChange={(e) =>
            setFormData({ ...formData, customDomain: e.target.value })
          }
          required
        />
      )}
      <Label>주소</Label>
      <AddressWrapper>
        <AddressInputWrapper>
          <AddressInput
            id='district'
            type='text'
            placeholder='구 입력'
            onChange={handleAddressChange}
            required
          />
          <AddressInput
            id='neighborhood'
            type='text'
            placeholder='동 입력'
            onChange={handleAddressChange}
            required
          />
        </AddressInputWrapper>
      </AddressWrapper>
      <Label htmlFor='content'>내용</Label>
      <TextArea
        id='content'
        placeholder='내용 입력'
        onChange={handleInputChange}
        required
      />
      <div
        style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'flex-end',
        }}
      >
        <Button variant='cancel' size='medium' type='button' onClick={onCancel}>
          취소
        </Button>
        <Button variant='send' size='medium' type='submit'>
          제출
        </Button>
      </div>
    </Form>
  );
}

export default CustomerServiceForm;
