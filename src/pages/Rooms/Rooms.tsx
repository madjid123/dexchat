import Rooms from "../../components/UserSpace/Rooms/Rooms";
import { useSelector } from "react-redux";
import { AuthSelector } from "../../features/user/authSlice";
import { useNavigate } from "react-router-dom";
import "./Rooms.css";
type RoomsPageProps = {};
const RoomsPageRouter = (props: RoomsPageProps) => {
  const { isAuth } = useSelector(AuthSelector);
  const navigate = useNavigate();

  if (!isAuth) {
    navigate("/login");
  }
  return (
    <div
      className=" flex flex-col justify-center items-center"
      style={{ height: "100%" }}
    >
      <Rooms isPage={true}></Rooms>
    </div>
  );
};
export default RoomsPageRouter;
