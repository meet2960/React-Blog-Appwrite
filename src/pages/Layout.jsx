// import { Container } from "react-bootstrap";
import { Header, Footer } from '../components/index';
import { Outlet } from 'react-router-dom';
// import { useDispatch } from "react-redux";
import { useState } from 'react';
import { useEffect } from 'react';
const Layout = () => {
  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();
  useEffect(() => {
    // authService
    //   .getCurrentUser()
    //   .then((userData) => {
    //     if (userData) {
    //       dispatch(login(userData));
    //     } else {
    //       console.log("Error WHile Loggin");
    //       dispatch(logout());
    //     }
    //   })
    //   .catch(() => {
    //     console.log("Error While Calling Login API");
    //     dispatch(logout());
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Login.....</h1>
      </div>
    );
  }
  return (
    <div className='wrapper'>
      <Header />
      <div className='main'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
