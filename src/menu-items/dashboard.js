// assets
import { IconDashboard, IconDashboardFilled } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconDashboardFilled };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    // {
    //   id: 'admin',
    //   title: 'Admin',
    //   type: 'item',
    //   url: '/admin/dashboard',
    //   icon: icons.IconDashboardFilled,
    //   breadcrumbs: false
    // }
  ]
};

export default dashboard;
