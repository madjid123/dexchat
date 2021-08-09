import React, { } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap'
import { withRouter } from 'react-router'
import {logout, AuthSelector} from '../features/user/authSlice'
import {useDispatch , useSelector} from "react-redux"

type Props = any
function NavBar(props: Props) {
    const dispatch = useDispatch()
    const {currentUser , error , isAuth , isLoading} = useSelector(AuthSelector)
    const Logout = () => {
        dispatch(logout())
        const newPath = "/login"
        //localStorage.removeItem("user")
        props.history.push(newPath)

    }
    console.log(currentUser)
    return (


            <Navbar>

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