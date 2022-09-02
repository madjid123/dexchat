import "./Footer.css";
import { NavItem, Navbar, Nav, NavLink, } from "react-bootstrap";
export const FooterHeight = 10;
export const Footer: React.FC = (_props) => {
  return (
    <Navbar
      variant="dark"
      color="white"
      className="my-footer"
    >
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav variant="pills" justify={true} className="menu-items">
          <Nav.Link>Home</Nav.Link>
          <Nav.Link>Rooms</Nav.Link>
          <Nav.Link>Settings</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Footer;
