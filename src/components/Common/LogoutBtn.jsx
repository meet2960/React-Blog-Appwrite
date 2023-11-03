import React from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { logout } from "../../features/auth/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch(() => {});
  };
  return (
    <Button type="button" className="ms-2" size="sm" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutBtn;
