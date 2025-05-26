import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

import ProtectedRoute from './ProtectedRoutes';
import AdminRoute from './AdminRoutes';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const DashboardAdmin = Loadable(lazy(() => import('views/dashboard/Admin')));
const EventsAdmin = Loadable(lazy(() => import('views/EventsAdmin')));
const Settings = Loadable(lazy(() => import('views/Settings')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const ContactPage = Loadable(lazy(() => import('views/contact-page')));
const Events = Loadable(lazy(() => import('views/events')));
const EventDetail = Loadable(lazy(() => import('views/event-detail')));
const SingleEvent = Loadable(lazy(() => import('views/single-event')));
const Profile = Loadable(lazy(() => import('views/profile')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <ProtectedRoute element={<DashboardDefault />} />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'admin',
          element: <AdminRoute element={<DashboardAdmin />} /> // Protected admin route
        },
      
        {
          path: 'default',
          element: <ProtectedRoute element={<DashboardDefault />} />
        }
      ]
    },
     // Admin-only routes
    {
      path: '/admin',
      children: [
        {
          path: 'loans',
          element: <AdminRoute element={<EventsAdmin />} />
        },
        {
          path: 'settings',
          element: <AdminRoute element={<Settings />} />
        }
      ]
    },
    
    {
      path: '/sample-page',
      element: <ProtectedRoute element={<SamplePage />} />
    },
    {
      path: '/contact-us',
      element: <ProtectedRoute element={<ContactPage />} />
    },
    {
      path: '/profile',
      element: <ProtectedRoute element={<Profile />} />
    },
    {
      path: '/events',
      element: <ProtectedRoute element={<Events />} />
    },
    {
      path: '/add-event/create',
      element: <ProtectedRoute element={<SingleEvent />} />
    },
    {
      path: '/events/:id',
      element: <ProtectedRoute element={<EventDetail />} />
    }
  ],

  
};

export default MainRoutes;
