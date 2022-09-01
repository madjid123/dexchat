import { createContext, useContext } from "react"
import { AuthState, initialState } from "../../features/user/authSlice"
export type AuthContext = {
    initialState: AuthState
    setAuth: (value: AuthState) => void
}


export const MyAuthContext = createContext<AuthContext>({
    initialState, setAuth: (value: AuthState) => { }
} as AuthContext)
export const useAuthContext = () => useContext(MyAuthContext)