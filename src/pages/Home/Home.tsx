import "./Home.css"
import Header from "../../components/Header/Header"
import { AuthSelector } from "../../features/user/authSlice"
import { useSelector } from "react-redux"
import { Navigate } from "react-router"
import { useState } from "react"
export const Home = () => {
    const { isAuth } = useSelector(AuthSelector)
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    if (isAuth)
        return <Navigate to="/rooms" />
    return <div className="my-container"> <Header show={show} handleShow={handleShow}></Header> </div>
}