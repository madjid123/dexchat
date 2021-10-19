import { Navbar, Nav, Button } from "react-bootstrap"
import { RouteProps, withRouter } from "react-router"
import { logout, AuthSelector } from "../../features/user/authSlice"
import { useDispatch, useSelector } from "react-redux"
import "./Navbar.css"
const NavBar: React.FunctionComponent<RouteProps & any> = ({ history }: any) => {
    const dispatch = useDispatch()
    const { currentUser, isAuth } = useSelector(AuthSelector)
    const Logout = () => {
        dispatch(logout())
        const newPath = "/"
        history.push(newPath)

    }
    let buttons = <> </>;

    if (isAuth) {
        buttons = (<Button variant="dex" className="" onClick={() => Logout()}> Logout</Button>)
    }
    else {
        buttons = (<div>
            <Button variant="login" className="" href="/login" >Login</Button>
            <Button variant="login" className="" href="/register">Register</Button>
        </div>)
    }


    return (
        <Navbar bg="dark" className="Navbar " >

            <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="mr-auto m-auto">
                    {currentUser !== undefined && <Nav.Link className="text-white" href="#home" >{currentUser.username}</Nav.Link>}
                </Nav>
                {
                    buttons
                }
            </Navbar.Collapse>
        </Navbar >

    );
}

export default withRouter(NavBar);