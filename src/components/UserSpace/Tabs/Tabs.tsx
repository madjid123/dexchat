import { Nav, Offcanvas, Row, Tab, Tabs } from "react-bootstrap";
import { Compass, People, PersonLinesFill } from "react-bootstrap-icons"
import Rooms from "../Rooms/Rooms";
import "./Tabs.css";
import { useTabsContext } from "../../../contexts/TabsContext";
import { useNavigate } from "react-router";
const SideTabs = (props: any) => {
  const navigate = useNavigate()
  const { currentEventKey, setEventKey } = useTabsContext()
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey={currentEventKey} >
      <div>
        <Nav variant="pills" className="flex-row justify-content-center box-container tabs">
          <Nav.Item >
            <Nav.Link eventKey="rooms" className="tab" onClick={() => { setEventKey("rooms"); navigate("/rooms") }}><People /></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="discover" onClick={() => { setEventKey("discover"); navigate("/discover") }} ><Compass /></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="requests" onClick={() => { setEventKey("requests"); navigate("/requests") }}><PersonLinesFill /></Nav.Link>
          </Nav.Item>
        </Nav>

      </div>
      {/* </Container> */}

    </Tab.Container>
  );
};
export default SideTabs;

{/* <Container className="d-flex flex-column justify-content-between main-box gap-2 sidetabs" > */ }
{/* <div className="ox-container" >
          <Tab.Content className="d-flex justify-content-center ">
            <Tab.Pane eventKey="rooms" className="" >
              <Rooms isPage={false} />
            </Tab.Pane>
            <Tab.Pane eventKey="discover">
              <Discover />
            </Tab.Pane>
            <Tab.Pane eventKey="requests">
              <Requests />
            </Tab.Pane>
          </Tab.Content>
        </div> */}