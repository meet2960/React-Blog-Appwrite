import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const authStatus = useSelector(state => state.auth.status);
  useEffect(() => {
    // !TODO make is more easy
    if (authentication && authStatus !== authentication) {
      navigate('/login');
      console.log('inside IF');
    } else if (!authentication && authStatus !== authentication) {
      navigate('/');
      console.log('inside elseif');
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);
  return loader ? <div>loading....</div> : <React.Fragment>{children}</React.Fragment>;
};

export default ProtectedRoute;
