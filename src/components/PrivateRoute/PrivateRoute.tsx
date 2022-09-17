import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router"
import { CurrentUser } from "../../features/user/authSlice"
import { AuthSelector } from "../../features/user/authSlice"
import { useSelector } from "react-redux"
type PrivateRouteProps = {

}

const PrivateRoute = () => {

    const { isAuth } = useSelector(AuthSelector)
    const [user, setUser] = useState({} as CurrentUser | undefined)
    useEffect(() => {

    }, [user]);
    return (
        (!isAuth) ?
            <div><Navigate to="/login" /></div>
            : <Outlet />
    )

}
export default PrivateRoute