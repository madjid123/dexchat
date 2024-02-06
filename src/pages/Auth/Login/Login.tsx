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

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const isFormValid = useCallback((): boolean => {
    if (data.username.length > 0 && data.password.length > 0) {
      return true;
    }

    return false;
  }, [data.username.length, data.password.length]);
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
    // <div className="flex flex-col justify-start items-center w-full h-full p-2 gap-2  text-white">
    //   <Header show={show} handleShow={handleShow}></Header>
    <Layout className="h-full text-white justify-center items-center ">
      <div className="row h-full p-4 w-full  lg:w-1/2 flex justify-center items-center text-white">
        <form
          className=" w-full p-4 md:p-8 lg:p-8 h-4/5 flex flex-col justify-center  gap-4  items-center shadow-lg border-2 border-gray-700 shadow-gray-600/50 rounded-xl"
          onSubmit={handleSubmit}
        >
          <h3 className=" text-2xl">Login</h3>
          {error.messages.length > 0 && <hr></hr> &&
            error.messages.map((error) => {
              return (
                <>
                  <span className="error text-danger"> {error} </span> <br></br>
                </>
              );
            })}
          <div className="form-group flex flex-col gap-1">
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

          <div className="form-group flex flex-col gap-1 ">
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
            className="btn btn-secondary   btn-lg btn-block"
          >
            Sign in
          </Button>
          {/* <p className="forgot-password text-right">Forgot password?</p> */}
        </form>
      </div>
      {/* </div> */}
    </Layout>
  );
};

export default Login;
