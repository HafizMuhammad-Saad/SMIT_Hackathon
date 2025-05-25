import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// maintenance routing
const LoginPage = Loadable(lazy(() => import('views/pages/authentication/Login')));
const RegisterPage = Loadable(lazy(() => import('views/pages/authentication/Register')));
// const AdminLoginPage = Loadable(lazy(() => import('views/pages/authentication/AdminLogin')));
// const DashboardAdmin = Loadable(lazy(() => import('views/dashboard/Admin')));
// const User = Loadable(lazy(() => import('views/dashboard/Admin/User')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/register',
      element: <RegisterPage />
    },
    // {
    //   path: '/admin',
    //   element: <AdminLoginPage />
    // },
    // {
    //   path: 'admin/dashboard',
    //   element: <DashboardAdmin />
    // },
    // {
    //   path: 'admin/users',
    //   element: <User />
    // },
  ]
};

export default AuthenticationRoutes;
