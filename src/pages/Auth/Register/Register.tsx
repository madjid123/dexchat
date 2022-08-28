import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../../URL";
import { Link, Redirect } from "react-router-dom";
import "./Register.css";
import Header from "../../../components/Header/Header";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { Nav } from "react-bootstrap";

// Email Regular expression
const EmailRegEx = RegExp(
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
);

type RegisterState = {
  [key: string]: any;
};
type RegisterError = {
  [key: string]: any;
};
type RegisterProps = any;
const Register = (props: RegisterProps) => {
  // State variablee
  const [state, setState] = useState({} as RegisterState);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    server: [] as any[],
  } as RegisterError);
  const [redirect, setRedirect] = useState(false);
  const [Valid, setValid] = useState(false);

  useEffect(() => {
    isValid();
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = { ...state };

    if (!Valid) return;
    console.log(data);
    axios
      .post(API_URL + "/register", data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.response !== undefined) setRedirect(true);
          else {
          }
        }
      })
      .catch((error) => {
        error.response.data.errors.filter((error: any) => {
          let Errors = { ...errors };
          Errors.server.push(error.msg);
          setErrors(Errors);
          return null;
        });
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
    setErrors((errs) => {
      errs[target.name] = "";
      errs["server"] = [];
      return errs;
    });
    isValid();
  };

  const ValidInput = (target: any) => {
    let Errors = { ...errors };

    switch (target.username) {
      case "username": {
        Errors.username =
          target.value.length < 5 ? "Name must be at least 5 characters !" : "";
        break;
      }
      case "email": {
        Errors.email = EmailRegEx.test(target.value)
          ? ""
          : "Incorrect email foramat !";
        break;
      }
      case "password": {
        Errors.password =
          target.value.length < 6
            ? "Password must be at least 6 characters !"
            : "";
        break;
      }
      default:
        break;
    }
    setErrors(Errors);
    isValid();
  };
  const isValid = () => {
    return errors.username.length === 0 &&
      errors.email.length === 0 &&
      errors.password.length === 0 &&
      errors.server.length === 0
      ? setValid(true)
      : setValid(false);
  };
  const Submit = () => {
    let Errors = { ...errors };
    if (!state.username) Errors.username = "You must provide a username ";

    if (!state.email) Errors.email = "You must provide an email";

    if (!state.password) Errors.password = "You must provide a password";
    setErrors(Errors);
  };

  if (redirect === true) {
    return <Redirect to="/login"></Redirect>;
  }
  return (
    <div className="my-container">
      <Header history={props.history}> </Header>
      <div className="form-mad ">
        <form id="form" onSubmit={handleSubmit} className="d-flex justify-center flex-column gap-2" >
          <h3>Register</h3>
          {errors.server.length > 0 && <hr></hr> && (
            <span className="error text-danger"> {errors.server} </span>
          )}
          <div className="form-group">
            <label>Name</label>
            <Input
              name="username"
              type="text"
              className="form-control"
              placeholder="Name"
              variant="dark"
              onChange={handleChange}
              value={state.username}
              onClick={handleChange}
            />
            {errors.username.length > 0 && (
              <span className="text-danger">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <Input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              variant="dark"
              onChange={handleChange}
              onClick={handleChange}
            />
            {errors.email.length > 0 && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <Input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              variant="dark"
              onChange={handleChange}
              onClick={handleChange}
            />
            {errors.password.length > 0 && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <div className="form-group my-1">
            <Button
              disabled={Valid === false}
              type="submit"
              className="btn btn-block btn-register"
              onClick={Submit}
            >
              Register
            </Button>
            <p className="forgot-password text-right my-1">

              Already registered <Link to="/login">log in?</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
