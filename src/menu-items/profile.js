// assets
import { IconUser, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconUser, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const profile = {
  id: 'profile',
  type: 'group',
  children: [
    {
      id: 'profile-page',
      title: 'Profile Page',
      type: 'item',
      url: '/profile',
      icon: icons.IconUser,
      breadcrumbs: false
    }
  ]
};

export default profile;
