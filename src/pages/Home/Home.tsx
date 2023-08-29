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
        <div className="home-container container-fluid " style={{ color: "white" }}>
            <div className="intro m-0 px-4 px-md-1  flex flex-md-row flex-column justify-content-md-center align-items-md-center     ">
                <div className="intro-text m-sm-0 gap-2   p-sm-0 ">
                    <h1 className=" display-4 gradient-text">Your Ultimate Real-Time Chat website </h1>
                    <h3>Communicate, Share and interact</h3>
                    <p>Welcome to DexChat, the cutting-edge solution that revolutionizes the way you communicate and collaborate online. With ConnectChat, real-time communication has never been easier, more interactive, and more efficient. Say goodbye to delayed responses and hello to instant, seamless conversations.</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button onClick={() => { navigate("/register") }} className="landing-button"> Join Us Now!</button>
                    </div>
                </div>
                <img src="/landing/illust1.png" width={256} height={256} className="  d-flex  justify-content-center align-items-center ratio-1x1 img-fluid   " style={{ maxWidth: "70vw", minWidth: "50%" }} />

            </div>
        </div>
    </div>
}