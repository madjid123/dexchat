import { useState } from "react";
import { Offcanvas, Tab, Tabs } from "react-bootstrap";
import { Discover } from "../Discover/Discover";
import Rooms from "../Rooms/Rooms";
import "./Tabs.css";
const SideTabs = (props: any) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  return (
    <div className="sidetabs">

      <Tabs
        defaultActiveKey="rooms"
        id="uncontrolled-tab-example"
        className="m-3 tabs"
        variant="pills"
      >
        <Tab eventKey="rooms" title="Rooms" className="tab">
          <Rooms />
        </Tab>
        <Tab eventKey="discover" title="Discover" className="tab">
          <Discover></Discover>
        </Tab>
        <Tab eventKey="requests" title="Requests" className="tab">
        </Tab>


      </Tabs>
    </div >
  );
};
export default SideTabs;
