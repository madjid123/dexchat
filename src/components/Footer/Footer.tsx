
import "./Footer.css"
import { Navbar, NavItem, Nav, NavLink } from "react-bootstrap";
export const FooterHeight = 8
export const SideBar = () => {


    return (
        // <div className="my-footer">
        // <footer className="">
        <Navbar variant="dark" fixed="bottom" color="white" className="my-footer">
            <Navbar.Toggle />
            <Navbar.Collapse >
                <Nav variant="pills" justify={true} className="menu-items" >
                    <NavLink>
                        Home
                    </NavLink>
                    <Nav.Link>
                        Rooms
                    </Nav.Link>
                    <Nav.Link>
                        Settings
                    </Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>

        // </footer >
        // </div >


    );
}
export default SideBar