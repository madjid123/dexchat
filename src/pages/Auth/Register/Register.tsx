import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../../URL";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";
import Header from "../../../components/Header/Header";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

// Email Regular expression
const EmailRegEx = RegExp(
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
);

type RegisterState = {
  [key: string]: string;
  username: string
  email: string;
  password: string;

};
type RegisterError = {
  [key: string]: string | Array<string>;
  username: string;
  email: string;
  password: string;
  server: Array<string>
};
type RegisterProps = any;

const Register = (props: RegisterProps) => {
  const [state, setState] = useState({} as RegisterState);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    server: []
  } as RegisterError);
  // const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate()
  const [Valid, setValid] = useState(false);
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    isValid();
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = { ...state };

    if (!Valid) return;
    axios
      .post(API_URL + "/register", data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.response !== undefined) {
            navigate("/login")
          }
          else {
          }
        }
      })
      .catch((error) => {
        error.response.data.errors.filter((error: any) => {
          let Errors = { ...errors };
          Errors.server.push(error.msg as string);
          setErrors(Errors);
          return null;
        });
      });
  };
  const handleChange = (e: React.SyntheticEvent) => {
    var fields = { ...state };
    fields = { ...fields };

    const target = e.target as HTMLTextAreaElement;
    fields[target.name] = target.value;
    setState(fields);

    const { name, value } = target;

    setErrors((errs) => {
      errs[target.name] = "";
      errs.server = [];
      return errs;
    });
    ValidInput({ name, value });
    isValid()
  };
  useEffect(() => {
    setErrors({ ...errors, server: [] } as RegisterError)
  }, [state])

  const ValidInput = (target: any) => {
    let Errors = { ...errors };

    switch (target.name) {
      case "username": {
        Errors.username =
          target.value.length < 3 ? "Name must be at least 3 characters !" : "";
        break;
      }
      case "email": {
        Errors.email = EmailRegEx.test(target.value)
          ? ""
          : "Incorrect email format !";
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
    console.log(Errors)
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

  // if (redirect === true) {
  //   return <Navigate to="/login"></Navigate>;
  // }
  return (
    <div className="d-flex flex-column justify-content-between align-items-center w-100 h-100 p-2 gap-2  w-100 ">
      <Header show={true} handleShow={() => { }} />
      <div id="register" className="d-flex justify-content-center align-items-center h-100  w-100 row">
        <form id="form" onSubmit={handleSubmit} className="col-12 col-lg-6 d-flex justify-content-center align-items-center  flex-column gap-3" >
          <h3 className="display-6">Register</h3>
          {
            errors.server.length > 0 && <hr></hr> && (
              <span className="error text-danger"> {errors.server.map((err) => (<><span>{err}</span><br></br></>))} </span>
            )}
          <div className="form-group">
            <label className="px-3">Name</label>
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
            <label className="px-3">Email</label>
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
            <label className="px-3">Password</label>
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
          <div className="form-group my-1 d-flex gap-4  flex-column  ">
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
        <img src="/back_items/9.png" className=" z-0 img-fluid  " style={{ zIndex: "-1", position: "fixed", bottom: "0", right: "0", width: "200px" }} />
      </div>
    </div>
  );
};

export default Register;
