import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerServiceForm from '../components/Pages/CustomerServicePage/CustomerServiceForm';
import CustomerServiceAlert from '../components/Pages/CustomerServicePage/CustomerServiceAlert';
import axiosInstance from '../api/axiosInstance';
import {
  MainPageWrapper,
  ContentSection,
  Box,
} from '../components/Pages/MessagePage/Styles/MessageStyles';
import Header from '../components/Header';

function CustomerServicePage() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ message: '', isError: false });

  const handleSubmit = async (formData) => {
    try {
      const response = await axiosInstance.post(
        '/api/v1/customer-service/inquiries',
        formData
      );
      setAlert({
        message: '문의가 성공적으로 제출되었습니다!',
        isError: false,
      });
    } catch (error) {
      console.error('문의 제출 에러:', error);
      setAlert({
        message: '문의 제출에 실패했습니다. 다시 시도해 주세요.',
        isError: true,
      });
    }
  };

  return (
    <>
      <MainPageWrapper>
        <Box />
        <Header title='고객센터' />
        <CustomerServiceAlert message={alert.message} isError={alert.isError} />
        <ContentSection>
          <CustomerServiceForm
            onSubmit={handleSubmit}
            onCancel={() => navigate(-1)}
          />
        </ContentSection>
      </MainPageWrapper>
    </>
  );
}

export default CustomerServicePage;
