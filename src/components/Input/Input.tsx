import "./Input.css";
import styled, { ThemedStyledProps } from "styled-components";
const theme = { borderColor: "#30c982" };
type InputPropsType = {
  variant: "light" | "dark";
};
type StyledInputProps = ThemedStyledProps<InputPropsType, any>;
export default styled.input.attrs((props: StyledInputProps) => props)`
  && {
    &:focus {
      border-color: none;
      outline: none;
      border-style: solid;
      width: 100%;
      color: ${(props) => (props.variant === "light" ? "#222" : "#ccc")};
      box-shadow: none;
      border-width: 2px !important;

      /* border-color: ${theme.borderColor} !important ; */
      border-radius: 8px 0px 8px 0px !important;
      background-color: ${(props) =>
        props.variant === "light" ? "#FFFFFFE7" : "#60606031"} !important;
    }
    color: white !important;
  }
  width: 100%;
  color: ${(props) =>
    props.variant === "light" ? "#222 !important" : "#fff !important"};
  margin: 0.25rem;
  border-style: solid;
  border-radius: 8px;
  padding-block: 0.5rem;
  border-width: 2px;
  /* border-color: ${theme.borderColor}; */
  /* @apply bg-secondary-500; */
  padding-inline: 0.75rem;
  background-color: ${(props) =>
    props.variant === "light" ? "#FFFFFFE7" : "#00000031"} !important;
`;
