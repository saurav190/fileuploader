import React from 'react';
import { Outlet } from 'react-router-dom';

const MasterLayout: React.FC = () => {
  return (
    <>
        <Outlet />
    </>
  );
};

export default MasterLayout;