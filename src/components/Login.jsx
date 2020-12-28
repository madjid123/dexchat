import axios from 'axios';
import React, { useState } from 'react';
import Url from '../URL'
function Login(props) {

    const [data, setData] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({ server: "" })
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(Url.API_URL + '/login', data).then((res) => {
            console.log(res);
            if (res.status === 200) {
                if (res.data.err !== false) { props.changeUser(res.data.name) }
                else {
                    let Errors = { ...errors }
                    Errors.server = res.data.msg
                    setErrors(Errors)
                }
            }
        })
    }
    const handleChange = (e) => {
        e.preventDefault();
        let Data = { ...data }
        const { name, value } = e.target
        Data[name] = value
        setData(Data)
    }
    console.log(errors)
    return (

        <form className="form" onSubmit={handleSubmit} >

            <h3>Log in</h3>
            { errors.server.length > 0 && <hr></hr> && <span className="error text-danger"> {errors.server} </span>}
            <hr></hr>
            <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" className="form-control" placeholder="Enter email" onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input name='password' type="password" className="form-control" placeholder="Enter password" required onChange={handleChange} />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" required />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    )
}

export default Login;