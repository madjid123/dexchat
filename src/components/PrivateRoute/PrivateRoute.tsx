import { Children, ReactNode, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { CurrentUser , AuthSelector } from "../../features/user/authSlice";
import { useSelector } from "react-redux";
type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = (props: PrivateRouteProps) => {
  const { isAuth } = useSelector(AuthSelector);
  const [user] = useState({} as CurrentUser | undefined);
  useEffect(() => {}, [user]);
  return !isAuth ? (
    <div>
      <Navigate to="/login" />
    </div>
  ) : (
    props.children
  );
};
export default PrivateRoute;
