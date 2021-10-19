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

export interface Room {
  members: any[2];
}
const Rooms = (props: any) => {

  const { rooms } = useSelector(RoomsSelector)
  const dispatch = useDispatch()
  const { currentUser } = useSelector(AuthSelector)
  return (
    <>

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
