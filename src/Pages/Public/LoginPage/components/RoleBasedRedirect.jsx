import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../store/useAuthStore';

const RoleBasedRedirect = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case 'super_admin':
          navigate('/superadmin', { replace: true });
          break;
        case 'admin':
        case 'branch_head':
        case 'doctor':
          navigate('/admin', { replace: true });
          break;
        case 'patient':
        case 'user':
          navigate('/patient-portal', { replace: true });
          break;
        default:
          navigate('/login', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  return null;
};

export default RoleBasedRedirect;