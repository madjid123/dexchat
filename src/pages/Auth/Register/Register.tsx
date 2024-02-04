import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../../URL";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";
import Header from "../../../components/Header/Header";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Layout from "~/components/Layout/Layout";

// Email Regular expression
const EmailRegEx = RegExp(
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
);

type RegisterState = {
  [key: string]: string;
  username: string;
  email: string;
  password: string;
};
type RegisterError = {
  [key: string]: string | Array<string>;
  username: string;
  email: string;
  password: string;
  server: Array<string>;
};
type RegisterProps = any;

const Register = (props: RegisterProps) => {
  const [state, setState] = useState({} as RegisterState);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    server: [],
  } as RegisterError);
  // const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const [Valid, setValid] = useState(false);

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
            navigate("/login");
          } else {
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
    isValid();
  };
  useEffect(() => {
    setErrors({ ...errors, server: [] } as RegisterError);
  }, [state]);

  const ValidInput = (target: { name: string; value: string }) => {
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
    // <div className="flex flex-col justify-between items-center p-2 gap-2  w-100 ">
    //   <Header show={true} handleShow={() => {}} />
    <Layout className="h-full">
      <div
        // id="register"
        className="flex justify-center items-center h-full  w-full p-4 text-white"
      >
        <form
          id="form"
          onSubmit={handleSubmit}
          className=" flex justify-center items-center  w-full lg:w-1/3  flex-col gap-3 p-4"
        >
          <h3 className="text-2xl">Register</h3>
          {errors.server.length > 0 && <hr></hr> && (
            <span className="error text-danger">
              {" "}
              {errors.server.map((err) => (
                <>
                  <span>{err}</span>
                  <br></br>
                </>
              ))}{" "}
            </span>
          )}
          <div className="flex flex-col gap-2 items-start justify-center">
            <label className="px-4">Name</label>
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
              <span className="text-red-400 px-2 text-sm text-center">
                {errors.username}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 items-start justify-center">
            <label className="px-4">Email</label>
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
              <span className="text-red-400 px-2 text-sm text-center">
                {errors.email}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 items-start justify-center">
            <label className="px-4">Password</label>
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
              <span className="text-red-400 px-2 text-sm text-center">
                {errors.password}
              </span>
            )}
          </div>
          <div className="my-1 flex gap-4  flex-col  ">
            <Button
              disabled={Valid === false}
              type="submit"
              className="btn btn-block btn-register"
              onClick={Submit}
            >
              Register
            </Button>
            <p className="forgot-password text-center text-xs text-gray-500">
              Already registered ? go to{" "}
              <Link className=" text-emerald-500 hover:text-white" to="/login">
                login
              </Link>
            </p>
          </div>
        </form>
        <img
          alt=""
          src="/back_items/9.png"
          className=" z-0 img-fluid  "
          style={{
            zIndex: "-1",
            position: "fixed",
            bottom: "0",
            right: "0",
            width: "200px",
          }}
        />
      </div>
    </Layout>
    // </div>
  );
};

export default Register;
