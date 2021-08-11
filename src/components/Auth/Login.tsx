import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, AuthSelector } from "../../features/user/authSlice";

type LoginData = {
  [key: string]: string;
};
const Login = (props: any) => {
  const [data, setData] = useState({ email: "", password: "" } as LoginData);
  const [notEmpty, setNotEmpty] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, isAuth, error } = useSelector(AuthSelector);

  useEffect(() => {
    data.email.length === 0 || data.password.length === 0
      ? setNotEmpty(false)
      : setNotEmpty(true);
  }, [data.email.length, data.password.length]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(login({ email: data.email, password: data.password }));
    if (isAuth) {
      console.log(currentUser);
      //return (
      // <>
      //  <Redirect to="/user"></Redirect>{" "}
      //</>
      //);
    }
  };
  const handleChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let Data = { ...data };
    const target = e.target as HTMLTextAreaElement;
    const { name, value } = target;

    Data[name] = value;
    setData(Data);
  };

  return (
    <div className="form-mad">
      <form id="form" onSubmit={handleSubmit}>
        <h3>Log in</h3>
        {error.message.length > 0 && <hr></hr> && (
          <span className="error text-danger"> {error.message} </span>
        )}
        <hr></hr>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={handleChange}
            value={data.email}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            value={data.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
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
  );
};

export default Login;

