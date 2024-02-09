import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Header from "~/components/Header/Header";
import { login, AuthSelector } from "~/features/user/authSlice";
// import "./Login.css";
import Input from "~/components/Input/Input";
import { useNavigate } from "react-router";
import { useAppDispatch } from "~/app/hooks";
import Button from "~/components/Button/Button";
import { Layout } from "~/components/Layout/Layout";
type LoginData = {
  [key: string]: string | any;
};
const Login = (props: any) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  } as LoginData);
  const [notEmpty, setNotEmpty] = useState(false);
  const [isformChanged, setIsFormChanged] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, error } = useSelector(AuthSelector);
  const [useDemo, setUseDemo] = useState(false);
  useEffect(() => {
    if (useDemo) {
      setData({ username: "test", password: "mcqzqr" });
      setIsFormChanged(true);
    } else {
      setData({ username: "", password: "" });
      setIsFormChanged(false);
    }
  }, [useDemo]);
  const isFormValid = useCallback((): boolean => {
    if (data.username.length > 0 && data.password.length > 0) {
      return true;
    }

    return false;
  }, [data]);
  useEffect(() => {
    isFormValid() === true && isformChanged
      ? setNotEmpty(true)
      : setNotEmpty(false);
  }, [isFormValid, isformChanged]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(login({ username: data.username, password: data.password }));
    if (isAuth) {
      navigate("/rooms");
    }
    setIsFormChanged(false);
    setNotEmpty(false);
  };
  const handleChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let Data = { ...data };
    const target = e.target as HTMLTextAreaElement;
    const { name, value } = target;

    Data[name] = value;
    setData(Data);
    setIsFormChanged(true);
  };

  return (
    // <div className="flex flex-col items-center justify-start w-full h-full gap-2 p-2 text-white">
    //   <Header show={show} handleShow={handleShow}></Header>
    <Layout className="items-center justify-center h-full text-white ">
      <div className="flex items-center justify-center w-full h-full p-4 text-white row lg:w-fit lg:h-full">
        <form
          className="flex flex-col items-center justify-center w-full  gap-5 p-4    md:p-8 lg:p-32 lg:py-16 h-full lg:h-fit shadow-primary-500/40 hover:shadow-primary-500 shadow-[0px_0px_10px_0px] rounded-xl"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl p-2 ">Login</h3>
          {error.messages.length > 0 && <hr></hr> &&
            error.messages.map((error) => {
              return (
                <>
                  <span className="error text-danger"> {error} </span> <br></br>
                </>
              );
            })}
          <div className="flex flex-row justify-between items-center gap-1 form-group ">
            <label className="px-3">Use test user</label>
            <input
              type="checkbox"
              name="useDemo"
              onChange={() => setUseDemo(!useDemo)}
              className=" rounded-md checked:bg-primary-500 bg-neutral-800 p-2 h-4 w-4 focus:bg-neutral-400 no-underline focus:outline-none"

            />
          </div>
          <div className="flex flex-col gap-1 form-group">
            <label className="px-3">Username</label>
            <Input
              name="username"
              type="text"
              className="w-full"
              placeholder="Enter username"
              onChange={handleChange}
              value={data.username}
              variant="dark"
              required
            />
          </div>

          <div className="flex flex-col gap-1 form-group ">
            <label className="px-3">Password</label>
            <Input
              name="password"
              type="password"
              className="w-full"
              placeholder="Enter password"
              required
              value={data.password}
              onChange={handleChange}
              variant="dark"
            />
          </div>

          <Button
            disabled={notEmpty === false}
            type="submit"
            className="btn btn-secondary btn-lg btn-block"
          >
            Sign in
          </Button>
          {/* <p className="text-right forgot-password">Forgot password?</p> */}
        </form>
      </div>
      {/* </div> */}
    </Layout>
  );
};

export default Login;
