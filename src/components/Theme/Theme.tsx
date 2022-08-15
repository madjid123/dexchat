import { createGlobalStyle } from "styled-components";
export const lightTheme = {
  body: "#f1f1f1",
  text: "#121620",
};
export const darkTheme = {
  body: "#121620",
  text: "#f1f1f1",
};

export const GlobalStyles = createGlobalStyle<{ theme: typeof lightTheme }>`
    body{
        background: ${({ theme }) => theme.body} !important;
        color: ${({ theme }) => theme.text} !important;
        transition: background 0.2s ease-in, color 0.2s ease-in;
    }
    *{
      color : ${({ theme }) => theme.text}
    }
`;
