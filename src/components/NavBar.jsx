import { React } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap'
import { withRouter } from 'react-router'

function NavBar(props) {

    const Logout = () => {
        props.logout()
        const newPath = "/login"
        props.history.push(newPath)

    }
    return (

        <Navbar bg="mydark" expand="lg" variant="dark"  >
            <Navbar.Brand href="/"> DexChatt </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto m-auto">
                    <Nav.Link href="#home">{props.username}</Nav.Link>
                </Nav>
                {
                    props.username.length === 0 && (
                        <div>
                            <Button variant="login" className="" href="/login" >Login</Button>
                            <Button variant="login" className="" href="/register">Register</Button>
                        </div>)
                }
                {
                    props.username.length > 0 && < Button variant="login" className="" onClick={() => Logout()}> Logout</Button>
                }


            </Navbar.Collapse>
        </Navbar >

    );
}

export default withRouter(NavBar);