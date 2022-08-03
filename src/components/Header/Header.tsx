import { Navbar, Nav } from "react-bootstrap";
import Button from "../Button/Button";
import { useState } from "react";
import { Redirect, RouteProps, withRouter } from "react-router";
import { logout, AuthSelector } from "../../features/user/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";
// import { useTheme, Theme, styled, Container, Grid } from "@mui/material";
import styled from "styled-components";
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
        Logout
      </Button>
    );
  } else {
    buttons = (
      <div className="header-content">
        <Button className="" href="/login">
          Login
        </Button>
        <Button className="mx-1" href="/register">
          Register
        </Button>
      </div>
    );
  }

  return (
    <div className="header-nav">
      <Navbar
        collapseOnSelect
        bg="tranparent"
        variant="dark"
        className="Navbar"
        expand="md"
      >
       
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <Nav className="m-auto">
            {currentUser !== undefined && (
              <div >
                <Nav.Link className="text-white" href="#home">
                  {currentUser.username}
                </Nav.Link>
                <div className="show-responsive-elmnts">
                  <Nav.Link
                    className="text-white"
                    onClick={() => {
                      history.push("/wello");
                    }}
                  >
                    Rooms
                  </Nav.Link>
                  <Link to="/wello">madjid</Link>
                </div>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
        {buttons}
         <NavbarToggle
          aria-controls="basic-navbar-nav"
          style={{ color: "white", margin: "0.75rem" }}
        />
      </Navbar>
    </div>
  );
};
export default withRouter(NavBar);
