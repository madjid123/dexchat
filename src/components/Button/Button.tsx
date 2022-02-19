import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
// import MuiButton, { ButtonProps } from "@mui/material/Button"

const borderColor = "#30c982";
// export const Button: React.FC<ButtonProps> = (props) => {

//     return (<MuiButton {...props} sx={{ border: "1px solid", borderColor: borderColor, borderRadius: "1.5rem", color: "white", ":hover": { backgroundColor: borderColor } }} />);

// }

//i am not sure if this is a dumb way to acheive styles but i don't care
// i am sick and tired from finding the right way.. XD
const DangerButton = styled()``;

export default styled(Button)`
  && {
    &:hover {
      //I case for the future.
      background-color: ${(props) =>
        props.variant === "primary" ? "" : borderColor};
      color: white;
      /* border: solid #00000000; */
    }
    color: ${borderColor};
    background-color: ${(props) =>
      props.variant === "danger" ? "#fd5d57" : "#0000000E"};

    border-radius: 1rem 0.5rem 1rem 0.5rem;
    border: 1px solid;
  }
`;

// i always feels like i am doing it the wrong way. what's wrong why do i even have to think like this
