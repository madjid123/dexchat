
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import { Container, Grid, Box, CSSObject, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, styled, Theme, Toolbar, Typography, useTheme } from "@mui/material"
//Icons  -----------------------
import { useState } from "react"
import { Nav, Navbar, NavbarBrand, NavDropdown, NavItem, NavLink } from "react-bootstrap"
export const drawerWidth = window.screen.width < 500 ? "100%" : "20%";
console.log(window.screen.width)

export const SideBar = () => {
    const theme = useTheme()
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <Navbar className="sidebar Navbar flex-column" bg="dark" style={{ width: "5%", alignItems: "center" }}>
            <Navbar.Toggle aria-controls="sidenav" />

            <Navbar.Brand className="justify-center">
                <NavLink className="justify-center" color="white"> <i className="bi bi-list"> </i> </NavLink>
            </Navbar.Brand>

            <Navbar.Offcanvas className="" id="sidenav" show={open} bg="dark" style={{ minWidth: "30%" }}>
                <Nav className="flex-column" justify={false} id="sidenav">

                    <NavLink href="#">Rooms</NavLink>
                    <NavDropdown id={"dfd"} title={undefined}>
                        <NavDropdown.Item>erw</NavDropdown.Item>
                        <NavDropdown.Item>erw</NavDropdown.Item>
                        <NavDropdown.Item>erw</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Offcanvas>
        </Navbar>
        // <Drawer variant="permanent" open={open}>
        //     <DrawerHeader>

        //         <IconButton onClick={handleDrawerClose}>
        //             {theme.direction === 'rtl' ? (
        //                 <ChevronRightIcon />
        //             ) : (
        //                 <ChevronLeftIcon />
        //             )}
        //         </IconButton>
        //     </DrawerHeader>
        //     <Divider />
        //     <List>
        //         <ListItem button>
        //             <IconButton
        //                 color="inherit"
        //                 aria-label="open drawer"
        //                 onClick={handleDrawerOpen}
        //                 edge="start"
        //                 sx={{
        //                     marginRight: '36px',
        //                     ...(open && { display: 'none' }),
        //                 }}
        //             >
        //                 <MenuIcon />
        //             </IconButton>
        //         </ListItem>
        //         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        //             <ListItem button key={text}>
        //                 <ListItemIcon>
        //                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        //                 </ListItemIcon>
        //                 <ListItemText primary={text} />
        //             </ListItem>
        //         ))}

        //     </List>

        // </Drawer>

    );
}
export default {}