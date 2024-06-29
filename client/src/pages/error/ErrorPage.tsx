import { Button } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center ">
        <span className=""> 404 not Found!</span>
        <Button type="button" onClick={() => navigate(-1)}>
          Go Back!
        </Button>
      </div>
    </>
  );
};

export default ErrorPage;
