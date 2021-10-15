/* eslint-disable array-callback-return */
import { ProSidebar, Menu, MenuItem, SidebarHeader } from "react-pro-sidebar"
import { Nav, Navbar } from "react-bootstrap"
import "react-pro-sidebar/dist/css/styles.css"
import { useDispatch, useSelector } from "react-redux"
import { AuthSelector } from "../features/user/authSlice"
import { RoomsSelector } from "../features/user/RoomsSlice"
import { clearAllMessages } from "../features/Conversation/MessagesSlice"


export interface Room {
  members: any[2];
}
const Rooms = (props: any) => {

  const { rooms } = useSelector(RoomsSelector)
  const dispatch = useDispatch()
  const { currentUser } = useSelector(AuthSelector)
  return (
    <>
      <Navbar className="sidebar flex-column" >
        <Nav.Item>
          <label> Rooms</label>
          <br></br>
        </Nav.Item>
        <Nav.Link >
          {
            rooms.map((room, index: number) => {
              return (
                <Nav.Item
                  key={index}
                  onClick={() => {
                    console.log("inspecting weird behaviour")
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
      </Navbar>
    </>
  );
};

export default Rooms;
