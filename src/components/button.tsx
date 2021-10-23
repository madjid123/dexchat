import styled from "@emotion/styled";
import MuiButton, { ButtonProps } from "@mui/material/Button"

// export const Button: React.FC<ButtonProps> = (props) => {
//     const borderColor = "#30C982"

//     return (<MuiButton {...props} sx={{ border: "1px solid", borderColor: borderColor, borderRadius: "1.5rem", color: "white", ":hover": { backgroundColor: borderColor } }} />);

// }


export const Button = styled(MuiButton)`
color : #243545
`;