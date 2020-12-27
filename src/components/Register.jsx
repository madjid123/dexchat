import axios from 'axios';
import React, { useState } from 'react';
import Url from '../URL'


function Register(props) {

    const [state, setState] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...state }
        console.log(data)
        console.log(Url.API_URL)
        axios.post("http://localhost:5000" + '/register', data)
            .then((response) => { console.log(response.data) })
            .catch((error) => { console.log(error) })

    }
    const handleChange = (e) => {
        var fields = { ...state };
        fields = { ...fields }
        console.log(fields)
        fields[e.target.name] = e.target.value

        setState(fields);
    }
    console.log(state)
    return (
        <form onSubmit={handleSubmit}>
            <h3>Register</h3>

            <div className="form-group">
                <label>Name</label>
                <input name="name" type="text" className="form-control" placeholder="Name" onChange={handleChange} />
            </div>



            <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" className="form-control" placeholder="Enter email" onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input name="password" type="password" className="form-control" placeholder="Enter password" onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
            <p className="forgot-password text-right">
                Already registered <a href="#">log in?</a>
            </p>

        </form>
    )

}

export default Register;