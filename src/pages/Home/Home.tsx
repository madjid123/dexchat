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
        <div id="landing-container" className=" d-flex flex-column gap-5 justify-content-center  align-items-center ">
            <div className="home-container container-fluid  h-100 vh-100 " style={{ color: "white" }}>
                <div className="intro m-0 px-4 px-md-1  flex flex-md-row flex-column justify-content-md-center align-items-md-center     ">
                    <div className="intro-text m-sm-0 gap-2   p-sm-0 ">
                        <h1 className=" display-4 gradient-text">Your Ultimate Real-Time Chat website </h1>
                        <h3>Communicate, Share and interact</h3>
                        <p>Welcome to DexChat, the cutting-edge solution that revolutionizes the way you communicate and collaborate online. With DexChat, real-time communication has never been easier, more interactive, and more efficient. Say goodbye to delayed responses and hello to instant, seamless conversations.</p>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button onClick={() => { navigate("/register") }} className="landing-button"> Join Us Now!</button>
                        </div>
                    </div>
                    <img src="/landing/illust1.png" width={256} height={256} className="  d-flex  justify-content-center align-items-center ratio-1x1 img-fluid   " style={{ maxWidth: "70vw", minWidth: "50%" }} />

                </div>

            </div>
            <div className=" px-5  px-md-2 text-white vh-100 d-flex justify-content-center align-items-center  flex-column   ">
                <h3 className="display-6">Features that Set DexChat Apart</h3>
                <div className="px-5 d-flex flex-md-row flex-column  justify-content-md-center align-items-md-center   " >
                    <img src="/landing/illust5.png" width={256} height={256} className="  d-flex  justify-content-center align-items-center ratio-1x1 img-fluid   " style={{ maxWidth: "50vw", minWidth: "40%" }} />
                    <ul className="features-list gap-5" style={{ fontSize: "16px" }}>
                        <li><b>Instant Messaging:</b> Experience lightning-fast conversations with friends, colleagues, or clients. DexChat's real-time messaging ensures that your messages are delivered and received in the blink of an eye.</li>
                        <li><b>User-Friendly Interface:</b> Our intuitive and user-friendly interface makes navigating DexChat a breeze, even for first-time users. Say goodbye to complicated menus and hello to straightforward communication.</li>
                        <li><b>Multi-device Sync:</b> Stay connected no matter where you are. DexChat syncs seamlessly across all your devices, ensuring that you're always in the loop and able to pick up your conversations right where you left off.</li>
                        <li><b>Read Receipts:</b> Know when your messages have been read with read receipts. No more guessing whether your message reached its recipient – DexChat keeps you informed.</li>
                        <li><b>Secure and Private:</b> Your privacy is our top priority. DexChat employs state-of-the-art security measures to ensure that your conversations are confidential and secure.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
}