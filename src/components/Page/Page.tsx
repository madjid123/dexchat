import { PropsWithChildren } from "react";
import Header from "../Header/Header";
import SideTabs from "../UserSpace/Tabs/Tabs";

export const Page: React.FC<PropsWithChildren> = (props) => {
    return (
        <div className="d-flex flex-column justify-content-between p-2 gap-2 " style={{ height: "100vh" }}>
            <Header show={false} handleShow={() => { }}></Header>
            <div className="main-box box-container d-flex justify-content-center" style={{ height: "100%" }}>
                {props.children}
            </div>
            <SideTabs />

        </div>


    );
}