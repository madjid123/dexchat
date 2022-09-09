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
        <div className=" box-container d-flex flex-column justify-center align-center" style={{ height: "100%" }}>
            {/* < Header show={true} handleShow={() => { }}  ></Header > */}

            <Rooms isPage={true}></Rooms>
            {/* <div className="mb-3">

                <Footer ></Footer>
            </div> */}
        </div >
    )
}
export default RoomsPageRouter  