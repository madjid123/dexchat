import "./Home.css"
import Header from "../../components/Header/Header"
import { AuthSelector } from "../../features/user/authSlice"
import { useSelector } from "react-redux"
import { Navigate } from "react-router"
export const Home = () => {
    const { isAuth } = useSelector(AuthSelector)
    if (isAuth)
        return <Navigate to="/user" />
    return <div className="my-container"> <Header></Header> </div>
}