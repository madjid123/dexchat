/* eslint-disable array-callback-return */
import { ProSidebar, Menu, MenuItem, SidebarHeader } from "react-pro-sidebar"
import { Nav } from "react-bootstrap"
import "react-pro-sidebar/dist/css/styles.css"
import { useSelector } from "react-redux"
import { AuthSelector } from "../features/user/authSlice"
import { RoomsSelector } from "../features/user/RoomsSlice"


export interface Room {
  members: any[2];
}
const Rooms = (props: any) => {

  const { rooms } = useSelector(RoomsSelector)

  const { currentUser } = useSelector(AuthSelector)
  return (
    <>
      <Nav className="sidebar flex-column" >
        <Nav.Item>
          <h1> Rooms</h1>
          <br></br>
        </Nav.Item>
        <Nav.Link >
          {
            rooms.map((room: any, index: number) => {
              return (
                <Nav.Item
                  key={index}
                  onClick={() => { props.setConversation(index) }}
                >
                  <div>
                    <img
                      key={index}
                      src={"logo192.png"}
                      width="16"
                      height="16"
                      alt=""
                    />
                    {room.members.map((member: any) => { if (currentUser && member._id !== currentUser._id) return member.name; })}
                  </div>
                </Nav.Item>)
            })
          }
        </Nav.Link>
      </Nav>
    </>
  );
};

export default Rooms;
