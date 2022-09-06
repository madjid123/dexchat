import Header from "../../components/Header/Header"
import { Requests } from "../../components/UserSpace/Requests/Requests"
const DiscoverPage = () => {

    return (<div className="box">
        <Header show={false} handleShow={() => { }} />
        <Requests />
    </div>

    )
}