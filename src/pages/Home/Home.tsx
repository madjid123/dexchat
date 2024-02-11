import './Home.css';
import { AuthSelector } from '../../features/user/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { useState } from 'react';
import Layout from '~/components/Layout/Layout';
export const Home = () => {
  const { isAuth } = useSelector(AuthSelector);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  if (isAuth) return <Navigate to="/user" />;
  return (
    <Layout className="h-fit">
      <div className="flex flex-col justify-center items-center gap-0 h-full py-16 md:py-0">
        <div
          className="h-fit md:h-screen text-neutral-300 "
          // style={{ color: "white" }}
        >
          <div className="m-0 px-4 md:px-1  flex  md:flex-row flex-col  md:items-center md:justify-center  h-full    ">
            <div className="intro-text sm:m-0 gap-2   sm:p-0  md:w-1/2">
              <h1 className=" text-5xl  gradient-text">
                Your Ultimate Real-Time Chat website{' '}
              </h1>
              <h3 className="text-2xl">Communicate, Share and interact</h3>
              <p className="text-base text-wrap">
                Welcome to DexChat, the cutting-edge solution that
                revolutionizes the way you communicate and collaborate online.
                With DexChat, real-time communication has never been easier,
                more interactive, and more efficient. Say goodbye to delayed
                responses and hello to instant, seamless conversations.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={() => {
                    navigate('/register');
                  }}
                  className="landing-button"
                >
                  {' '}
                  Join Us Now!
                </button>
              </div>
            </div>
            <img
              alt=""
              src="/landing/illust1.png"
              width={512}
              height={512}
              className="  flex  justify-center items-center aspect-square   "
              // style={{ maxWidth: "70vw", minWidth: "50%" }}
            />
          </div>
        </div>
        <div className=" h-fit px-5  py-16 md:py-4  text-white  flex justify-start items-center flex-col   ">
          <h3 className="text-2xl">Features that Set DexChat Apart</h3>
          <div className="px-5 flex md:flex-row  flex-col-reverse   md:items-center md:justify-center  ">
            <img
              alt=""
              src="/landing/illust5.png"
              width={256}
              height={256}
              className="  flex  justify-center items-center aspect-square w-full h-full md:w-[512px]  "
              // style={{ maxWidth: "50vw", minWidth: "40%" }}
            />
            <ul className="features-list gap-5" style={{ fontSize: '16px' }}>
              <li>
                <b>Instant Messaging:</b> Experience lightning-fast
                conversations with friends, colleagues, or clients. DexChat's
                real-time messaging ensures that your messages are delivered and
                received in the blink of an eye.
              </li>
              <li>
                <b>User-Friendly Interface:</b> Our intuitive and user-friendly
                interface makes navigating DexChat a breeze, even for first-time
                users. Say goodbye to complicated menus and hello to
                straightforward communication.
              </li>
              <li>
                <b>Multi-device Sync:</b> Stay connected no matter where you
                are. DexChat syncs seamlessly across all your devices, ensuring
                that you're always in the loop and able to pick up your
                conversations right where you left off.
              </li>
              <li>
                <b>Read Receipts:</b> Know when your messages have been read
                with read receipts. No more guessing whether your message
                reached its recipient – DexChat keeps you informed.
              </li>
              <li>
                <b>Secure and Private:</b> Your privacy is our top priority.
                DexChat employs state-of-the-art security measures to ensure
                that your conversations are confidential and secure.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};
