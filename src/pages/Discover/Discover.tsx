import Header from "../../components/Header/Header"
import { Discover } from "../../components/UserSpace/Discover/Discover"
export const DiscoverPage = () => {

    return (<div className="box">
        <Header show={false} handleShow={() => { }} />
        <Discover />
    </div>

    )
}
export default DiscoverPage