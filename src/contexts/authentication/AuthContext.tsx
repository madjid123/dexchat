import { createContext, useContext } from "react"
import { AuthState, initialState } from "../../features/user/authSlice"
export type AuthContext = {
    authState: AuthState
    setAuth: (value: AuthState) => void
}


export const MyAuthContext = createContext<AuthContext>({
    authState: initialState, setAuth: (value: AuthState) => { }
} as AuthContext)
export const useAuthContext = () => useContext(MyAuthContext)