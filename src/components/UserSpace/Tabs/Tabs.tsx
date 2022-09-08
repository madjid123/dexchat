import { useState } from "react";
import { Col, Container, Nav, Offcanvas, Row, Tab, Tabs } from "react-bootstrap";
import { Discover } from "../Discover/Discover";
import { Requests } from "../Requests/Requests";
import { Compass, People, PersonLinesFill } from "react-bootstrap-icons"
import Rooms from "../Rooms/Rooms";
import "./Tabs.css";
import Button from "../../Button/Button";
const SideTabs = (props: any) => {

  return (
    // <div className="sidetabs">

    //   <Tabs
    //     defaultActiveKey="rooms"
    //     id="tabs"
    //     className="m-3 tabs"
    //     variant="pills"
    //   >
    //     <Tab eventKey="rooms" title="Rooms" className="tab" >
    //       <Rooms isPage={false} />
    //     </Tab>
    //     <Tab eventKey="discover" title="Discover" className="tab">
    //       <Discover></Discover>
    //     </Tab>
    //     <Tab eventKey="requests" title="Requests" className="tab"  >
    //       <Requests></Requests>
    //     </Tab>


    //   </Tabs>
    // </div >
    <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
      <Container className="d-flex flex-column justify-content-between main-box gap-2 sidetabs" >
        <div className="ox-container" >
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
        </div>
        <div>
          <Nav variant="pills" className="flex-row justify-content-center box-container tabs">
            <Nav.Item >
              <Nav.Link eventKey="rooms" className="tab"><People /></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="discover"><Compass /></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="requests"><PersonLinesFill /></Nav.Link>
            </Nav.Item>
          </Nav>

        </div>
      </Container>

    </Tab.Container>
  );
};
export default SideTabs;
