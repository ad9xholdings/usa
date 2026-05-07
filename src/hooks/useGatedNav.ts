import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function useGatedNav() {
  const navigate = useNavigate();
  const { isAuthenticated, openAuth } = useAuth();

  const gatedNavigate = (path: string) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      openAuth('register');
    }
  };

  return gatedNavigate;
}
