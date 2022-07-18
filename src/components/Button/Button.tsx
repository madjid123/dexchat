import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const borderColor = "#30c982";
const variants = {
  primary: `
    &:hover {
      background-color: ${borderColor};
      color: white;
    }
  background-color : #0000001a;
  color : ${borderColor};
  `,
  danger: `{
  background-color : #fd5d57";
  color : #fff;
   &:hover {
      background-color: ${borderColor};
      color: white;
    }
    }
  `,
};

export default styled(Button)`
  && {
    ${(props) =>
      props.variant === "me-danger" ? variants.danger : variants.primary}
    border-radius: 1rem 0.5rem 1rem 0.5rem;
    border: 1px solid;
  }
`;
// i always feels like i am doing it the wrong way. what's wrong why do i even have to think like this
