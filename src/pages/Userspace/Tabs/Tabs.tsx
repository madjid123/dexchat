import { Tab, Tabs } from "react-bootstrap";
import Rooms from "../Rooms/Rooms";
import "./Tabs.css";
const SideTabs = () => {
  return (
    <div className="sidetabs">
      <Tabs
        defaultActiveKey="rooms"
        id="uncontrolled-tab-example"
        className="m-3 tabs "
        // variant="pills"
      >
        <Tab eventKey="rooms" title="Rooms" className="tab">
          <Rooms />
        </Tab>
        <Tab eventKey="discover" title="Discover" className="tab">
          <div>Hello</div>
        </Tab>
      </Tabs>
    </div>
  );
};
export default SideTabs;
