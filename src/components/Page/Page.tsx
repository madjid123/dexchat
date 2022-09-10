import Header from "../Header/Header";
import SideTabs from "../UserSpace/Tabs/Tabs";

export const Page: React.FC = (props) => {
    return (
        <div className="d-flex flex-column justify-content-around mx-2 gap-1" style={{ height: "100vh" }}>
            <Header show={true} handleShow={() => { }}></Header>
            <div className="main-box" style={{ flexGrow: 0.8 }}>
                {props.children}
            </div>

            <div style={{ position: "sticky" }}>
                <SideTabs />
            </div>

        </div>


    );
}