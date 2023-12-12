import { useState } from 'react';
import authService from '@/appwrite/auth';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { logout } from '@/features/auth/authSlice';
import { toast } from 'react-toastify';
import LogHelper from '@/utility/LogHelper';
const LogoutBtn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    LogHelper.log('lodaing', loading);
    setLoading(true);
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        toast.success('Logout Successfully');
      })
      .catch(() => {
        toast.error('Error While Logging Out');
      });
  };
  return (
    <Button type='button' className='ms-2' size='sm' onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutBtn;
