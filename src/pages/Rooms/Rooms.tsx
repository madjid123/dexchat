import Rooms from "../../components/UserSpace/Rooms/Rooms"
import Header from "../../components/Header/Header"
import { useSelector } from "react-redux"
import { AuthSelector } from "../../features/user/authSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Rooms.css"
import Footer from "../../components/Footer/Footer"
type RoomsPageProps = {

}
const RoomsPageRouter = (props: any) => {

    const { currentUser, isAuth, isLoading } = useSelector(AuthSelector)
    const navigate = useNavigate()
    // useEffect(() => {
    //     console.log(isAuth)
    //     if (!isAuth) {
    //         console.log(isAuth)
    //         navigate("/login")
    //         return
    //     }
    // }, [currentUser])
    if (!isAuth) {
        navigate("/login")
    }
    return (
        <div className=" d-flex m-2 gap-2 flex-column justify-center align-center">
            < Header show={true} handleShow={() => { }}  ></Header >
            <div className="my-container box-container">

                <Rooms isPage={true}></Rooms>
            </div>
            <div className="mb-3">

                <Footer ></Footer>
            </div>
        </div >
    )
}
export default RoomsPageRouter  