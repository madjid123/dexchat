import axios from 'axios';
import React, { useState } from 'react';
import Url from '../URL'
import { Redirect } from 'react-router-dom'

function Register(props) {

    const [state, setState] = useState({})
    const [errors, setErrors] = useState({ name: "", email: "", password: "", server: "", exist: true })
    const [redirect, setRedirect] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...state }

        axios.post(Url.API_URL + '/register', data)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    if (response.data.err === false) setRedirect(true)
                    else {
                        let Errors = { ...errors }
                        Errors.server = response.data.msg
                        setErrors(Errors)
                    }
                }


            })
            .catch((error) => { console.log(error) })

    }
    const handleChange = (e) => {
        var fields = { ...state };
        fields = { ...fields }
        fields[e.target.name] = e.target.value
        setState(fields);

        const { name, value } = e.target
        console.log(name, value)
        ValidInput({ name, value })

    }
    const Regex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

    const ValidInput = (target) => {
        let Errors = { ...errors }
        switch (target.name) {
            case "name": {
                Errors.name = target.value.length < 5 ? "Name must be at least 5 characters !" : "";
                break
            }
            case "email": {
                Errors.email = Regex.test(target.value) ? "" : "Incorrect email foramat !";
                break
            } case "password": {
                Errors.password = target.value.length < 6 ? "Password must be atleast 6 characters !" : "";
                break;
            }
            default: break
        }
        if (Errors.name.length !== 0 || Errors.password.length !== 0 || Errors.email.length !== 0)
            Errors.exist = true;
        else {
            Errors.exist = false;
        }
        setErrors(Errors)

    }
    console.log(errors)
    if (redirect === true) { return <Redirect to='/login'></Redirect> }
    return (


        <div className='form-mad'>
            <form id='form' onSubmit={handleSubmit}>

                <h3>Register</h3>
                {errors.server.length > 0 && <hr></hr> && <span className="error text-danger"> {errors.server} </span>}
                <hr></hr>
                <div className="form-group">
                    <label>Name</label>
                    <input name="name" type="text" className="form-control" placeholder="Name" onChange={handleChange} required value={state.name} />
                    {errors.name.length > 0 && <span className="text-danger">{errors.name}</span>}
                </div>



                <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="email" className="form-control" placeholder="Enter email" onChange={handleChange} required />
                    {errors.email.length > 0 && <span className="text-danger">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control" placeholder="Enter password" onChange={handleChange} required />
                    {errors.password.length > 0 && <span className="text-danger">{errors.password}</span>}
                </div>

                <button disabled={errors.exist} type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">log in?</a>
                </p>

            </form>
        </div>
    )

}

export default Register;