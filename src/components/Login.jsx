import React from 'react';

function Login(props) {


    const handleSubmit = (e) => {
        e.preventDefault();

    }
    const handleChange = (e) => {
        e.preventDefault();

    }
    return (
        <form >

            <h3>Log in</h3>

            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter email" onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" required onChange={handleChange} />
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