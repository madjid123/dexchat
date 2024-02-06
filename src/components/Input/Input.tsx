import { FC } from "react";
import "./Input.css";
import styled, {
  StyledComponentProps,
  ThemedStyledProps,
} from "styled-components";
import { cn } from "~/lib/utils";
const theme = { borderColor: "#30c982" };
type InputPropsType = {
  variant: "light" | "dark";
};
type StyledInputProps = ThemedStyledProps<InputPropsType, any>;
const StyledInput = styled.input.attrs((props: StyledInputProps) => props)`
  && {
    &:focus {
      border-color: none;
      outline: none;
      border-style: solid;
      width: 100%;
      box-shadow: none;
      border-width: 2px;
      border-radius: 8px 0px 8px 0px !important;
    }
    color: white !important;
  }
  width: 100%;
  margin: 0.25rem;
  border-style: solid;
  border-radius: 8px;
  padding-block: 0.5rem;
  border-width: 2px;
  padding-inline: 0.75rem;
`;
type InputProps = StyledComponentProps<"input", any, InputPropsType, never>;
const Input: FC<InputProps> = (props) => {
  return (
    <StyledInput
      {...props}
      className={cn(
        "border-2 focus:border-secondary-500 border-neutral-700 w-4/5 bg-black/10 ",

        props.className
      )}

      // variant={props.variant}
      // placeholder={props.placeholder}
      // onChange={props.onChange}
    />
  );
};
export default Input;
