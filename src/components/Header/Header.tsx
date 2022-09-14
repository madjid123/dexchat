import { Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import Button from "../Button/Button";
import { useNavigate } from "react-router";
import { logout, AuthSelector } from "../../features/user/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import "./DropMenu.css"
import { PersonCircle } from "react-bootstrap-icons"
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import DexLogo from "../../public/dexplanet.png"
type HeaderProps = {
  show: boolean
  handleShow: () => void

}
const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const dispatch = useDispatch();
  const { currentUser, isAuth } = useSelector(AuthSelector);
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(logout());
    const newPath = "/login";
    navigate(newPath)
  };
  let buttons = <> </>;

  if (!isAuth)
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



  return (
    <div className="header-nav ">
      <Navbar
        collapseOnSelect
        bg="tranparent"
        variant="dark"
        className="Navbar m-auto px-4 align-items-center d-flex justify-content-space-between"
        expand="sm"

      >

        <div className="logo d-flex align-items-center gap-1">
          {currentUser !== undefined &&
            <NavbarToggle
              aria-controls="basic-navbar-nav"
              style={{ color: "white", margin: "0.25rem" }}
              onClick={props.handleShow}
            >

              {/* <MenuApp /> */}
            </NavbarToggle>
          }
          <img src={DexLogo} width="24" height="28" alt="dexlogo" />
        </div>
        <div className="menu d-flex ">
          <Navbar.Collapse area-label="basic-navbar-nav" className="" />
          {currentUser !== undefined && (
            <Dropdown
              id="nav-dropdown-dark-example"
              // menuVariant="dex"
              // title={()}
              align={{ md: "end" }}
              className="text-white text-center d-flex justify-content-center"
              style={{ display: "flex", justifyContent: "center", color: "white" }}
            >
              <Dropdown.Toggle id="" variant="" className="d-flex align-items-center p-2 dropdown-toggle-dex" as={"div"}>
                <div className="flex justify-content-center ">

                  <PersonCircle />
                  <a className="text-white text-center text-decoration-none mx-2 justify-content-between" >
                    {currentUser.username}
                  </a>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dex" style={{ color: "white!important" }} align="end">
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="" onClick={Logout} className="text-danger">
                  Logout
                </NavDropdown.Item>
              </Dropdown.Menu>

            </Dropdown>
          )
          }
          {buttons}

        </div>

      </Navbar>
    </div >
  );
};
export default Header;
