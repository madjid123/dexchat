import React, { useState, setValue } from 'react';

function Register(props) {
    const [state, setState] = useState({ feilds: {}, errors: {} })




    const handleValidation = () => {
        let fields = state.feilds;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["name"] = "Only letters";
            }
        }

        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        setState({ errors: errors });
        return formIsValid;
    }

    const contactSubmit = (e) => {
        e.preventDefault();

        if (handleValidation()) {

            alert("Form submitted");
        } else {
            alert("Form has errors.")
        }

    }

    const handleChange = (field, e) => {
        let fields = state.feilds;
        fields[field] = e.target.value;
        setState({ fields, errors: state.errors });
    }
    return (
        
    )
}

export default Register;