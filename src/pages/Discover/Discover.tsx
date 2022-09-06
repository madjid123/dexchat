import Header from "../../components/Header/Header"
import { Discover } from "../../components/UserSpace/Discover/Discover"
const DiscoverPage = () => {

    return (<div className="box">
        <Header show={false} handleShow={() => { }} />
        <Discover />
    </div>

    )
}