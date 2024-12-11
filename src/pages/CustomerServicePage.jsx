import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerServiceForm from '../components/Pages/CustomerServicePage/CustomerServiceForm';
import CustomerServiceAlert from '../components/Pages/CustomerServicePage/CustomerServiceAlert';
import api from '../api/axiosInstance';
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
      const payload = {
        title: formData.title,
        email: formData.email,
        address: {
          district: formData.district,
          neighborhood: formData.neighborhood,
          custom_address: formData.customAddress || '',
        },
        content: formData.content,
      };

      const response = await api.post(
        '/v1/customer-service/inquiries',
        payload
      );

      if (response.status === 201) {
        setAlert({
          message: '문의가 성공적으로 제출되었습니다!',
          isError: false,
        });
        setTimeout(() => navigate(-1), 2000);
      }
    } catch (error) {
      let errorMessage = '문의 제출에 실패했습니다. 다시 시도해 주세요.';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setAlert({
        message: errorMessage,
        isError: true,
      });
    }
  };

  return (
    <MainPageWrapper>
      <Box />
      <Header title='고객센터' />
      {alert.message && (
        <CustomerServiceAlert message={alert.message} isError={alert.isError} />
      )}
      <ContentSection>
        <CustomerServiceForm
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
        />
      </ContentSection>
    </MainPageWrapper>
  );
}

export default CustomerServicePage;
