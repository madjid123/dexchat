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
        <div className=" d-flex flex-column justify-center align-center" style={{ height: "100%" }}>

            <Rooms isPage={true}></Rooms>

        </div >
    )
}
export default RoomsPageRouter  