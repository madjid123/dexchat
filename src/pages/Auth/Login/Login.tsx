import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Header from "../../../components/Header/Header";
import { login, AuthSelector } from "../../../features/user/authSlice";
import "./Login.css";
import Input from "../../../components/Input/Input";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../app/hooks";
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
    <div className="my-container">
      <Header show={show} handleShow={handleShow} ></Header>

      <div className="form-mad">
        <form id="form" onSubmit={handleSubmit}>
          <h3>Log in</h3>
          {error.messages.length > 0 && <hr></hr> &&
            error.messages.map((error) => {
              return (
                <>
                  <span className="error text-danger"> {error} </span> <br></br>
                </>
              );
            })}
          <hr></hr>
          <div className="form-group">
            <label>Username</label>
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

          <div className="form-group">
            <label>Password</label>
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

          <div className="form-group">
            <div className="control checkbox">
              <input
                type="checkbox"
                // className="f"
                id="customCheck1"
                // variant="dark"
                required
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <button
            disabled={notEmpty === false}
            type="submit"
            className="btn btn-dark btn-lg btn-block"
          >
            Sign in
          </button>
          <p className="forgot-password text-right">Forgot password?</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
