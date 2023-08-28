import "./Home.css"
import Header from "../../components/Header/Header"
import { AuthSelector } from "../../features/user/authSlice"
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router"
import { useState } from "react"
import Button from "../../components/Button/Button"
export const Home = () => {
    const { isAuth } = useSelector(AuthSelector)
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const navigate = useNavigate()
    if (isAuth)
        return <Navigate to="/rooms" />
    return <div className="my-container">
        <Header show={show} handleShow={handleShow}></Header>
        <div className="home-container" style={{ color: "white" }}>
            <div className="intro col-md-2">
                <div className="intro-text">
                    <h1>Your Ultimate Real-Time Chat website </h1>
                    <h3>Communicate, Share and interact</h3>
                    <p>Welcome to ConnectChat, the cutting-edge solution that revolutionizes the way you communicate and collaborate online. With ConnectChat, real-time communication has never been easier, more interactive, and more efficient. Say goodbye to delayed responses and hello to instant, seamless conversations.DexChat provide a unique chat experience.  </p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button onClick={() => { navigate("/register") }} className="landing-button"> Join Us Now!</button>
                    </div>
                </div>
                <img src="/landing/illust1.png" width={512} height={512} className=" w-auto " />

            </div>
        </div>
    </div>
}