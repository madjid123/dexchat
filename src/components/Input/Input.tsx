import "./Input.css";
import styled from "styled-components";
const theme = { borderColor: "#30c982" }
const Input = (props: any) => {
  return (
    <input className="footer-input " {...props}>
      {props.children}
    </input>
  );
};
export default styled(Input)`
  && {
    &:focus{
    border-color: none;
    outline: none;
    border-style : solid;
    width: 100%;
    color: ${(props) => (props.variant === "light" ? "#222" : "#ccc")};
    box-shadow:none;
    border-width : 2px !important;
    
    border-color : ${theme.borderColor} !important ;
    border-radius : 1.5rem 0.75rem 1.5rem 0.75rem !important;
    background-color: ${(props) =>
    props.variant === "light" ? "#FFFFFFE7" : "#60606031"} !important;
    }
  }
    color: ${(props) => (props.variant === "light" ? "#222" : "#fff")};
    margin: 0.25rem;
    border-style: solid;
    border-radius: 1.5rem;
    padding-block: 0.5rem;
    border-width : 2px;
    border-color : ${theme.borderColor};
    padding-inline: 0.75rem;
    background-color: ${(props) =>
    props.variant === "light" ? "#FFFFFFE7" : "#00000031"} !important;
  }
`;
