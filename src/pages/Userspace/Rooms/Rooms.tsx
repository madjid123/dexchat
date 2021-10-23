/* eslint-disable array-callback-return */
import { ProSidebar, Menu, MenuItem, SidebarHeader } from "react-pro-sidebar"
import { Nav, Navbar } from "react-bootstrap"
import "react-pro-sidebar/dist/css/styles.css"
import { useDispatch, useSelector } from "react-redux"
import { AuthSelector } from "../../../features/user/authSlice"
import { RoomsSelector } from "../../../features/user/RoomsSlice"
import { clearAllMessages } from "../../../features/Conversation/MessagesSlice"
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse"
import "./Rooms.css"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import { CSSObject, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, styled, Theme, Toolbar, Typography, useTheme } from "@mui/material"
//Icons  -----------------------
import MenuIcon from "@mui/icons-material/Menu"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import MailIcon from "@mui/icons-material/Mail"
import InboxIcon from "@mui/icons-material/Inbox"
import { useState } from "react"
// -----------------------------


const drawerWidth = "50%";

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: 1,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth})`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: 1,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: "30%",
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));
export interface Room {
  members: any[2];
}
const Rooms = (props: any) => {

  const { rooms } = useSelector(RoomsSelector)
  const dispatch = useDispatch()
  const { currentUser } = useSelector(AuthSelector)
  const theme = useTheme()
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <AppBar position="fixed" open={open}>
        <Toolbar>

          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </ListItem>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}

        </List>
        <Divider />
        <List>

          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Navbar variant='dark' className="sidebar flex-column " collapseOnSelect style={{ color: "white" }}>
        <Navbar.Brand href="#home" >Room</Navbar.Brand>
        <Navbar.Toggle aria-target="colapsedSidbar" />
        <Navbar.Collapse className="flex-column" id="colapsedSidbar">
          <Nav >
            <Nav.Link >
              {
                rooms.map((room, index: number) => {
                  return (
                    <Nav.Item
                      key={index}
                      onClick={() => {
                        props.setConversation(index); if (room._id !== props.currentRoomId) dispatch(clearAllMessages(""))
                      }}
                    >
                      <div>
                        <img
                          key={index}
                          src={"logo192.png"}
                          width="16"
                          height="16"
                          alt=""
                        />
                        {room.members.map((member: any) => { if (currentUser && member._id !== currentUser._id) return member.username; })}
                      </div>
                    </Nav.Item>)
                })
              }
            </Nav.Link>
            <Nav.Link >
              <i className="bi bi-alarm"> </i>
              <div>lkfadsjfjdlskj;f</div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Rooms;
