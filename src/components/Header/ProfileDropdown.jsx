import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { BiSolidUserCircle } from 'react-icons/bi';
import LogoutBtn from '@/components/Common/LogoutBtn';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
const ProfileDropdown = () => {
  const authStatus = useSelector(state => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: 'Home',
      path: '/',
      active: true
    },
    {
      name: 'Login',
      path: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      path: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      path: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      path: '/add-post',
      active: authStatus
    }
  ];
  return (
    <React.Fragment>
      <Dropdown align={'end'}>
        <Dropdown.Toggle as={'div'} id='dropdown-basic' className='cursor-pointer text-primary'>
          <BiSolidUserCircle size={'28px'} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {navItems &&
            navItems.map((items, index) =>
              items.active ? (
                <React.Fragment key={index}>
                  <Dropdown.Item as={'div'} className='p-0'>
                    <NavLink to={`${items.path}`} className={'nav-link'}>
                      {items.name}
                    </NavLink>
                  </Dropdown.Item>
                </React.Fragment>
              ) : null
            )}
          <Dropdown.Item as={'div'}>
            <LogoutBtn />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
