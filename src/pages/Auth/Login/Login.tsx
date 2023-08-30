import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Header from "../../../components/Header/Header";
import { login, AuthSelector } from "../../../features/user/authSlice";
import "./Login.css";
import Input from "../../../components/Input/Input";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../app/hooks";
import Button from "../../../components/Button/Button";
type LoginData = {
  [key: string]: string | any;
};
const Login = (props: any) => {
  const [data, setData] = useState({ username: "", password: "" } as LoginData);
  const [notEmpty, setNotEmpty] = useState(false);
  const [isformChanged, setIsFormChanged] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, error } = useSelector(AuthSelector);

  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
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
      navigate("/rooms")
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
    <div className="d-flex flex-column justify-content-between align-items-center w-100 h-100 p-2 gap-2  ">
      <Header show={show} handleShow={handleShow} ></Header>

      <div className="form-mad row h-100  w-100 d-flex justify-content-center align-items-center  ">
        <form id="form" className="col-sm-12 col-lg-6  h-75 d-flex flex-column justify-content-center justify-content-lg-start gap-4  align-items-center   " onSubmit={handleSubmit}>
          <h3 className="display-6">Login</h3>
          {error.messages.length > 0 && <hr></hr> &&
            error.messages.map((error) => {
              return (
                <>
                  <span className="error text-danger"> {error} </span> <br></br>
                </>
              );
            })}
          <div className="form-group d-flex flex-column gap-1">
            <label className="px-3">Username</label>
            <Input
              name="username"
              type="text"
              className="form-control"
              placeholder="Enter username"
              onChange={handleChange}
              value={data.username}
              variant="dark"
              required
            />
          </div>

          <div className="form-group d-flex flex-column gap-1 ">
            <label className="px-3">Password</label>
            <Input
              name="password"
              type="password"
              className="form-control"
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
    </div>
  );
};

export default Login;
