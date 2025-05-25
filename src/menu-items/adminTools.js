// menu-items/adminTools.js
// assets
import { IconDashboard, IconDashboardFilled, IconUser, IconSettings } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconDashboardFilled, IconUser, IconSettings };

const adminTools = {
  id: 'admin-tools',
  title: 'Admin Tools',
  type: 'group',
  performance: 'admin',
  children: [
    {
        id: 'admin-dashboard',
        title: 'Admin Dashboard',
        type: 'item',
        url: '/dashboard/admin',
        icon: icons.IconDashboardFilled,
        breadcrumbs: false
    },
    {
      id: 'user-management',
      title: 'User Management',
      type: 'item',
      url: '/admin/loans',
      icon: icons.IconUser,
        breadcrumbs: true
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      type: 'item',
      url: '/admin/settings',
      icon: icons.IconSettings,
      breadcrumbs: true
    }
  ]
};

export default adminTools;

