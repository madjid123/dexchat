import "./Footer.css";
import { NavItem, Navbar, Nav, NavLink } from "react-bootstrap";
import NavBar from "../Header/Header";
export const FooterHeight = 10;
export const SideBar = () => {
  return (
    <div className="my-footer">
      <footer className="">
        <Navbar
          variant="dark"
          fixed="bottom"
          color="white"
          className="my-footer"
        >
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav variant="pills" justify={true} className="menu-items">
              <NavLink>Home</NavLink>
              <Nav.Link>Rooms</Nav.Link>
              <Nav.Link>Settings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </footer>
    </div>
  );
};
export default SideBar;
