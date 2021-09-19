import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, AuthSelector, clearErrors } from "../../features/user/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
type LoginData = {
  [key: string]: string | any,
};
const Login = (props: any) => {
  const [data, setData] = useState({ email: "", password: "" } as LoginData);
  const [notEmpty, setNotEmpty] = useState(false);
  const [isformChanged, setIsFormChanged] = useState(false)
  const dispatch = useDispatch();
  const AppDispatch = useAppDispatch()
  const { currentUser, isAuth, error } = useSelector(AuthSelector);

  const isFormValid = useCallback((): boolean => {
    if (data.email.length > 0 && data.password.length > 0) {
      return true
    }

    return false

  }, [data.email.length, data.password.length])
  useEffect(() => {
    isFormValid() === true && isformChanged
      ? setNotEmpty(true)
      : setNotEmpty(false);

  }, [isFormValid, isformChanged]);


  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(login({ email: data.email, password: data.password }));
    setIsFormChanged(false)
    setNotEmpty(false)

  };
  const handleChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let Data = { ...data };
    const target = e.target as HTMLTextAreaElement;
    const { name, value } = target;

    Data[name] = value;
    setData(Data);
    setIsFormChanged(true)
  };

  return (
    <div className="form-mad">
      <form id="form" onSubmit={handleSubmit}>
        <h3>Log in</h3>
        {error.messages.length > 0 && <hr></hr> && (
          error.messages.map((error) => {
            return (<><span className="error text-danger"> {error} </span> <br></br></>)
          })
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

