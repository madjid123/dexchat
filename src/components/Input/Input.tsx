import "./Input.css";
export const Input = (props: any) => {
  return (
    <input className="footer-input " {...props}>
      {props.children}
    </input>
  );
};
