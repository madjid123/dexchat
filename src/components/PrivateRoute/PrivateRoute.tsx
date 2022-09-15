import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router"
import { CurrentUser } from "../../features/user/authSlice"
import { useAuthContext } from "../../contexts/authentication/AuthContext"
type PrivateRouteProps = {

}

const PrivateRoute = () => {

    const { authState } = useAuthContext()
    const { isAuth } = authState
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