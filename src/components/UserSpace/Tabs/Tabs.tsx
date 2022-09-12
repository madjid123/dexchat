import { Nav, Tab } from "react-bootstrap";
import { Compass, People, PersonLinesFill } from "react-bootstrap-icons"
import "./Tabs.css";
import { useTabsContext } from "../../../contexts/TabsContext";
import { useNavigate } from "react-router";
type SideTabsPropsType = {

}
const SideTabs: React.FC<SideTabsPropsType> = (props) => {
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

    </Tab.Container>
  );
};
export default SideTabs;