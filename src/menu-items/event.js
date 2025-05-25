// assets
import { IconRouteSquare, IconPlus } from '@tabler/icons-react';

// constant
const icons = { IconRouteSquare, IconPlus };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const events = {
  id: 'events',
  title: 'Events ',
  type: 'group',
  children: [
    {
      id: 'viewEvents',
      title: 'View Events',
      type: 'item',
      url: '/events',
      icon: icons.IconRouteSquare,
      breadcrumbs: false
    },

    {
      id: 'createEvent',
      title: 'Create New Event',
      type: 'item',
      url: '/add-event/create',
      icon: icons.IconPlus,
      breadcrumbs: false
    }
  ]
};

export default events;
