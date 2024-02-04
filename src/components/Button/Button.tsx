import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import styled from "styled-components";
// import { Button } from "react-bootstrap";

const borderColor = "#30c982";
const dangerBorderColor = "#fd5d57";
const variants: Record<string, { borderColor: string }> = {
  primary: {
    borderColor: borderColor,
  },
  danger: {
    borderColor: dangerBorderColor,
  },
};
type StyledButtonProps = {
  borderColor: string;
};
const variantsCss = (props: StyledButtonProps) => {
  if (props === undefined) props = variants.primary;
  return `&:hover {
      background-color: ${props.borderColor};
      color: white;
    }
  background-color : #0000001a;
  border-color : ${props.borderColor};
  color : ${props.borderColor};
  `;
};
type ButtonPropsType = {
  variant?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export const Button: FC<ButtonPropsType> = (props) => {
  return <button {...props} />;
};

export default styled(Button).attrs((props) => {
  if (props.variant === undefined) props.variant = "primary";
  return props;
})`
  border-radius: 0.6rem 0.5rem 0.6rem 0.5rem;
  border-width: 2px;
  padding-inline: 8px;
  padding-block: 4px;
  font-size: 16px;
  ${(props) => {
    if (props.variant === undefined) return;
    return variantsCss(variants[props.variant]);
  }};
`;
// i always feels like i am doing it the wrong way. what's wrong why do i even have to think like this
