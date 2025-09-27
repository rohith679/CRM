import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <div className="space-x-4">
            <Button type="primary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button onClick={handleLogout}>
              Logout
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default UnauthorizedPage;