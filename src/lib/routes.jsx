import { useContext } from 'react';
import {
  useLocation,
  Navigate,
} from 'react-router-dom';
import { AuthContext } from '@/store/AuthContext';
import { values } from 'lodash';
import {
  Layout,
  Home,
  Signin,
  Signup,
} from '@/pages';

const RequireAuth = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (!isLoading && !user?.uid) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export const features = {
  home: {
    index: true,
    path: '/',
    name: 'home',
    element: <RequireAuth><Home /></RequireAuth>,
  },
};

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      ...values(features),
      {
        path: '/signin',
        name: 'signin',
        element: <Signin />,
      },
      {
        path: '/signup',
        name: 'signup',
        element: <Signup />,
      },
    ],
  },
];
