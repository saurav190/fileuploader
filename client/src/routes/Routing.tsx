import MasterLayout from '@/layout/MasterLayout';
import { APP_ROUTES } from '@/routes/routes';
import ErrorPage from '@pages/error/ErrorPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const Routing: React.FC = () => {

  return (
    <>
      <Routes>
        <Route>
          {/* App Routes */}
          <Route element={<MasterLayout />}>
            {APP_ROUTES.map(route => {
              return <Route key={route.path} path={route.path} element={route.component} />;
            })}
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
