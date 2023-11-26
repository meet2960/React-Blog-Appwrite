import React from "react";
import LogoutBtn from "@/Common/LogoutBtn";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import ProfileDropdown from "@/component/Header/ProfileDropdown";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <div className="nav-bg">
      <Container>
        <nav className="navbar navbar-expand-lg py-3">
          <div className="container-fluid">
            <h4 className="me-3 mb-0 fw-semibold">
              <NavLink to={"/"} className="text-decoration-none">
                TinyBlogs
              </NavLink>
            </h4>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <div>
                <Form.Control type="text" placeholder="Search" />
              </div>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {navItems &&
                  navItems.map((items) =>
                    items.active ? (
                      <li key={items.name} className="nav-item">
                        <Button
                          type="button"
                          size="sm"
                          className="ms-2"
                          variant="primary"
                          onClick={() => navigate(items.path)}
                        >
                          {items.name}
                        </Button>
                      </li>
                    ) : null
                  )}
                {authStatus && (
                  <React.Fragment>
                    <li className="nav-item">
                      <LogoutBtn />
                    </li>
                  </React.Fragment>
                )}
              </ul>
              <ProfileDropdown />
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Header;
