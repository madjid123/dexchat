import Rooms from "../Userspace/Rooms/Rooms"
import Header from "../../components/Header/Header"
import { useSelector } from "react-redux"
import { History } from "history"
import { AuthSelector } from "../../features/user/authSlice"
import { FC, useEffect } from "react"
type RoomsPageProps = {

}
const RoomsPageRouter = (props: any) => {

    const { currentUser, isAuth } = useSelector(AuthSelector)
    useEffect(() => {
        console.log(isAuth)
        if (currentUser === undefined) {
            props.history.push("/login")
            return
        }
    }, [isAuth])
    return (
        <div className="my-container">
            < Header history={props.history} ></Header >
            <Rooms></Rooms>
        </div >
    )
}
export default RoomsPageRouter  