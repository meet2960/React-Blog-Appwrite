import React from "react";
import { Dropdown } from "react-bootstrap";
import { BiSolidUserCircle } from "react-icons/bi";
import LogoutBtn from "../Common/LogoutBtn";
const ProfileDropdown = () => {
  return (
    <React.Fragment>
      <Dropdown align={"end"}>
        <Dropdown.Toggle as={"div"} id="dropdown-basic">
          <BiSolidUserCircle size={"28px"} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2"></Dropdown.Item>
          <Dropdown.Item href="#/action-3">Profile</Dropdown.Item>
          <Dropdown.Item href="#/action-3">
            <LogoutBtn />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
