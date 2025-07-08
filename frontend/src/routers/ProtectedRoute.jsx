import { useEffect, useRef, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { isTokenValid, parseJwt, clearAuthData } from '../utils/authToken';

const ProtectedRoute = ({ allowedRoles }) => {
  const [isValid, setIsValid] = useState(null);
  const location = useLocation();
  const timerRef = useRef(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!isTokenValid(token)) {
        await Swal.fire({
          icon: 'warning',
          title: 'Session Expired',
          text: 'Please login again.',
        });
        clearAuthData();
        setIsValid(false);
        return;
      }

      const decoded = parseJwt(token);
      const userRole = decoded.role;  

      if (!allowedRoles.includes(userRole)) {
        await Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'You do not have access to this page.',
        });
        setIsValid(false);
        return;
      }

      const timeUntilExpire = (decoded.exp - Math.floor(Date.now() / 1000)) * 1000;
      timerRef.current = setTimeout(() => {
        clearAuthData();
        setIsValid(false);
      }, timeUntilExpire);

      setIsValid(true);
    };

    checkToken();
    return () => clearTimeout(timerRef.current);
  }, [allowedRoles]);

  if (isValid === null) return <div>Loading...</div>;
  return isValid ? <Outlet /> : <Navigate to="/" state={{ from: location }} />;
};

export default ProtectedRoute;
