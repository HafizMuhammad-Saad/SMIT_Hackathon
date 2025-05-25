import dashboard from './dashboard';
// import pages from './pages';
// import utilities from './utilities';
// import other from './other';
import events from './event';
// import profile from './profile';
import adminTools from './admintools';


// ==============================|| MENU ITEMS ||============================== //

// Base items for all users
const baseMenuItems = [dashboard, events];

// Admin-only items
const adminMenuItems = [adminTools];

// Function to get menu items based on role
const getMenuItems = (isAdmin) => ({
  items: isAdmin ? adminMenuItems : baseMenuItems
});

export default getMenuItems;


// const menuItems = {
//   items: [dashboard, other, loanRequests, profile]
// };

// export default menuItems;
