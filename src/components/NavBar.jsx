import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap'


function NavBar(props) {
    console.log(props.username)
    return (

        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="#home"> DexChatt </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">{props.username}</Nav.Link>


                </Nav>

                <Button variant="login" className="" href="/login">Login</Button>


            </Navbar.Collapse>
        </Navbar>

    );
}

export default NavBar;