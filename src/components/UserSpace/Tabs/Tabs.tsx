import { useState } from "react";
import { Col, Container, Nav, Offcanvas, Row, Tab, Tabs } from "react-bootstrap";
import { Discover } from "../Discover/Discover";
import { Requests } from "../Requests/Requests";
import Rooms from "../Rooms/Rooms";
import "./Tabs.css";
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
      <Container className="d-flex flex-column justify-content-between sidetabs  gap-2" >
        <Row sm={10} md={12} className="box-container" >
          <Tab.Content className="d-flex justify-content-center ">
            <Tab.Pane eventKey="first" className="" style={{ height: "100%" }}>
              <Rooms isPage={false} />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <Discover />
            </Tab.Pane>
          </Tab.Content>
        </Row>
        <Row sm={10} md={13} >
          <Nav variant="pills" className="flex-row justify-content-center box-container">
            <Nav.Item>
              <Nav.Link eventKey="first">Tab 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Tab 2</Nav.Link>
            </Nav.Item>
          </Nav>

        </Row>
      </Container>

    </Tab.Container>
  );
};
export default SideTabs;
