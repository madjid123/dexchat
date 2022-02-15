import { Navbar, Nav } from "react-bootstrap";
import Button from "../Button/Button";
import { useState } from "react";
import { Redirect, RouteProps, withRouter } from "react-router";
import { logout, AuthSelector } from "../../features/user/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { useTheme, Theme, styled, Container, Grid } from "@mui/material";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";

const NavBar: React.FunctionComponent<RouteProps & any> = ({
  history,
}: any) => {
  const dispatch = useDispatch();
  const { currentUser, isAuth } = useSelector(AuthSelector);

  const Logout = () => {
    dispatch(logout());
    const newPath = "/login";
    history.push(newPath);
    // <Redirect to="/login"></Redirect>;
  };
  let buttons = <> </>;

  if (isAuth) {
    buttons = (
      <Button className="mx-2 " onClick={() => Logout()}>
        {" "}
        <a> Logout</a>
      </Button>
    );
  } else {
    buttons = (
      <div className="">
        <Button className="" href="/login">
          <a>Login </a>
        </Button>
        <Button className="mx-1 btn-dex" href="/register">
          Register
        </Button>
      </div>
    );
  }

  return (
    <Navbar
      collapseOnSelect
      bg="tranparent"
      variant="dark"
      className="Navbar"
      expand="sm"
    >
      <NavbarToggle
        aria-controls="basic-navbar-nav"
        style={{ color: "white" }}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto">
          {currentUser !== undefined && (
            <Nav.Link className="text-white" href="#home">
              {currentUser.username}
            </Nav.Link>
          )}
        </Nav>
        {buttons}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavBar);
