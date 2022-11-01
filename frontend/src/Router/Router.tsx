import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import ActiveUserContext from '../Contexts/ActiveUserContext';
import PrivateRoute from './PrivateRoute';
import HomePage from '../components/pages/HomePage';

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  //const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/login'} element={<LoginPage />} />

      <Route
        path={'/users'}
        element={
          <PrivateRoute authorities={[]} element={<div>nothing here</div>} />
        }
      />
      <Route
        path='/users/:userId'
        element={
          <PrivateRoute
            authorities={[]}
            element={<div>nothing here</div>}
          ></PrivateRoute>
        }
      />

      <Route
        path='/profile'
        element={
          <PrivateRoute
            authorities={[]}
            element={<div>nothing here</div>}
          ></PrivateRoute>
        }
      />

      <Route path='*' element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;
