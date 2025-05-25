import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ element }) => {
  const { admin } = useAuth();
  
  if (!admin) {
    // Redirect to default dashboard if not admin
    return <Navigate to="/dashboard/default" replace />;
  }
  
  return element;
};

export default AdminRoute;