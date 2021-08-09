import axios from "axios";
import React, { useEffect, useState } from "react";
import Url from "../../URL";
import { Redirect } from "react-router-dom";

type RegisterState = {
  [key: string]: any;
};
type RegisterProps = any
const Register = (props: RegisterProps) =>{
  // State variable.
  const [state, setState] = useState({} as RegisterState);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    server: "",
  });
  const [redirect, setRedirect] = useState(false);
  const [Valid, setValid] = useState(false);

  useEffect(() => {
    isValid();
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = { ...state };

    if (!Valid) return;
    axios
      .post(Url + "/register", data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.err === false) setRedirect(true);
          else {
            let Errors = { ...errors };
            Errors.server = response.data.msg;
            setErrors(Errors);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (e: React.SyntheticEvent) => {
    var fields = { ...state };
    fields = { ...fields };
    const target = e.target as HTMLTextAreaElement;
    fields[target.name] = target.value;
    setState(fields);

    const { name, value } = target;

    ValidInput({ name, value });
  };
  const Regex = RegExp(
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  );

  const ValidInput = (target: any) => {
    let Errors = { ...errors };

    switch (target.name) {
      case "name": {
        Errors.name =
          target.value.length < 5 ? "Name must be at least 5 characters !" : "";
        break;
      }
      case "email": {
        Errors.email = Regex.test(target.value)
          ? ""
          : "Incorrect email foramat !";
        break;
      }
      case "password": {
        Errors.password =
          target.value.length < 6
            ? "Password must be atleast 6 characters !"
            : "";
        break;
      }
      default:
        break;
    }

    setErrors(Errors);
  };
  const isValid = () => {
    return errors.name.length === 0 &&
      errors.email.length === 0 &&
      errors.password.length === 0
      ? setValid(true)
      : setValid(false);
  };
  const Submit = () => {
    let Errors = { ...errors };
    if (!state.name) Errors.name = "You must provide a name ";

    if (!state.email) Errors.email = "You must provide an email";

    if (!state.password) Errors.password = "You must provide a password";
    setErrors(Errors);
  };

  if (redirect === true) {
    return <Redirect to="/login"></Redirect>;
  }
  return (
    <div className="form-mad">
      <form id="form" onSubmit={handleSubmit}>
        <h3>Register</h3>
        {errors.server.length > 0 && <hr></hr> && (
          <span className="error text-danger"> {errors.server} </span>
        )}
        <hr></hr>
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={handleChange}
            value={state.name}
            onClick={handleChange}
          />
          {errors.name.length > 0 && (
            <span className="text-danger">{errors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={handleChange}
            onClick={handleChange}
          />
          {errors.email.length > 0 && (
            <span className="text-danger">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
            onClick={handleChange}
          />
          {errors.password.length > 0 && (
            <span className="text-danger">{errors.password}</span>
          )}
        </div>

        <button
          disabled={Valid === false}
          type="submit"
          className="btn btn-dark btn-lg btn-block"
          onClick={Submit}
        >
          Register
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="/login">log in?</a>
        </p>
      </form>
    </div>
  );
}

export default Register;

