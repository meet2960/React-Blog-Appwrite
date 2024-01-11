import { NavLink } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import ProfileDropdown from '@/components/Header/ProfileDropdown';

const Header = () => {
  return (
    <div className='nav-bg sticky-top'>
      <Container>
        <nav className='navbar navbar-expand-lg py-3'>
          <div className='container-fluid'>
            <div className='logo'>
              <h4 className='me-3 mb-0 fw-semibold'>
                <NavLink to={'/'} className='text-decoration-none'>
                  TinyBlogs
                </NavLink>
              </h4>
            </div>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarTogglerDemo02'
              aria-controls='navbarTogglerDemo02'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse justify-content-lg-between' id='navbarTogglerDemo02'>
              <div className='row w-100'>
                <div className='col d-flex justify-content-center'>
                  <div className='col-5'>
                    <Form.Control type='text' placeholder='Search' className='' />
                  </div>
                </div>
                <div className='col-auto'>
                  <ProfileDropdown />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Header;
