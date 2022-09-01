import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router"
import { AuthSelector, CheckisAuth, CurrentUser } from "../../features/user/authSlice"
import { useAuthContext } from "../../contexts/authentication/AuthContext"
type PrivateRouteProps = {

}



const PrivateRoute = () => {

    // const { isAuth, currentUser } = useSelector(AuthSelector)
    const { initialState } = useAuthContext()
    const { isAuth } = initialState
    const [user, setUser] = useState({} as CurrentUser | undefined)
    useEffect(() => {
        if (!isAuth) {
            let userString = localStorage.getItem("currentUser")
            console.log(userString)
            if (userString !== null)
                setUser(JSON.parse(userString) as CurrentUser)
        }
    }, [user]);
    return (
        (user === undefined) ?
            <div><Navigate to="/login" /></div>
            : <Outlet />
    )

}
export default PrivateRoute