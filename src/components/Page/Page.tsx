import { useState } from "react";
import Header from "../Header/Header";
import SideTabs from "../UserSpace/Tabs/Tabs";

export const Page: React.FC = (props) => {
    return (
        <div className="d-flex flex-column justify-content-evenly mx-2" style={{ height: "100vh" }}>
            <Header show={true} handleShow={() => { }}></Header>
            <div className="main-box box-container d-flex justify-content-center" style={{ height: "78%" }}>
                {props.children}
            </div>
            <SideTabs />

        </div>


    );
}