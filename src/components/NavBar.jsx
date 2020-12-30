import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap'


function NavBar(props) {
    return (

        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/"> DexChatt </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">{props.username}</Nav.Link>


                </Nav>
                {props.username.length === 0 && (<div>
                    <Button variant="login" className="" href="/login" >Login</Button>
                    <Button variant="login" className="" href="/register">Register</Button> </div>)
                }
                {
                    props.username.length > 0 && < Button variant="login" className="" onClick={props.logout}>Logout</Button>
                }


            </Navbar.Collapse>
        </Navbar >

    );
}

export default NavBar;