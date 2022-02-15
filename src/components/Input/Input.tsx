import "./Input.css";
import styled from "styled-components";
const Input = (props: any) => {
  return (
    <input className="footer-input " {...props}>
      {props.children}
    </input>
  );
};
export default styled(Input)`
  && {
    margin: 0.25rem;
    border-radius: 1.5rem;
    padding-block: 0.25rem;
    /* background-color: rgba(0, 0, 0, 0.323); */
    padding-inline: 0.5rem;
    border-color: #0000;
    &:focus{
 border-color: none;
  outline: none;
  width: 100%;
    }
    color: ${(props) => (props.variant === "light" ? "#222" : "#ddd")};
  }
    background-color: ${(props) =>
      props.variant === "light" ? "#ffffff30" : "#00000031"};
  }
`;
