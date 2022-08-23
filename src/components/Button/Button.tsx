import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const borderColor = "#30c982";
const danger = "#fd5d57"
const variants = {
  primary: `
    &:hover {
      background-color: ${borderColor};
      color: white;
    }
  background-color : #0000001a;
  border-color : ${borderColor};
  color : ${borderColor};
  `,
  danger: `{
   &:hover {
      background-color: ${danger};
      color: white;
    }
  background-color: #0000001a;
  border-color : ${danger};
  color : ${danger};
    }
  `,
};

export default styled(Button)`
  border-radius: 1rem 0.5rem 1rem 0.5rem;
  border-width : 2px;
    ${(props) =>
    props.variant === "danger" ? variants.danger : variants.primary}
  
`;
// i always feels like i am doing it the wrong way. what's wrong why do i even have to think like this
