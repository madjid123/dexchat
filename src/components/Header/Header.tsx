import { Navbar, NavDropdown } from "react-bootstrap";
import Button from "../Button/Button";
import { useNavigate } from "react-router";
import { logout, AuthSelector } from "../../features/user/authSlice";
import { useSelector } from "react-redux";
import "./Header.css";

import "./DropMenu.css";
import {
  ArrowBarDown,
  ArrowDown,
  MenuDown,
  PersonCircle,
} from "react-bootstrap-icons";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import DexLogo from "../../public/dexplanet.png";
import { useAppDispatch } from "../../app/hooks";
import { Menu } from "lucide-react";
import { useTabsContext } from "~/contexts/TabsContext";
import { useSetCurrentMember } from "~/hooks/UserSpace/Conversation/useSetCurrentMemberName";
import { setAllRooms } from "~/features/user/RoomsSlice";
import {
  clearAllMessages,
  setRoom,
} from "~/features/Conversation/MessagesSlice";
type HeaderProps = {
  show: boolean;
  handleShow: () => void;
};
const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { currentUser, isAuth } = useSelector(AuthSelector);
  const { member, setMember } = useSetCurrentMember();
  const { showSidebar, setShowSidebar } = useTabsContext();
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(logout());
    setMember(null);
    dispatch(setAllRooms([]));
    dispatch(clearAllMessages({}));
    dispatch(setRoom(null));
    const newPath = "/login";
    navigate(newPath);
  };
  let buttons = <> </>;

  if (!isAuth)
    buttons = (
      <div className="flex flex-wrap justify-center items-center text-xs md:text-base gap-2">
        <Button className=" ">
          <a href="/login">Login</a>
        </Button>
        <Button className="">
          <a href="/register">Register</a>
        </Button>
      </div>
    );

  return (
    <div
      className=" sticky top-0  w-full p-4 rounded-xl  items-center  flex justify-between  shadow-[0_2px_10px_0px] shadow-primary-500/50 active:shadow-primary-500/50      backdrop-blur-md z-[1000] "
      onFocus={(e) => {
        // e.preventDefault();
        console.log("header received focus event");
        e.stopPropagation();
      }}
      onBlur={(e) => {
        console.log("header received blur event");
        e.stopPropagation();
      }}
    >
      <div className="logo flex items-center gap-3 ">
        {isAuth && (
          <div className="md:hidden">
            <Menu
              className="fill-white text-white hover:text-slate-500"
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>
        )}
        <img
          src={DexLogo}
          width="24"
          height="28"
          alt="dexlogo"
          onClick={() => {
            navigate("/");
          }}
        />
        <span className="text-white">DexChat</span>
      </div>
      <div className="menu flex ">
        {currentUser !== undefined && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
              <div className="flex justify-center items-center hover:bg-white/30 p-2 rounded-xl ">
                <PersonCircle className="fill-white" />
                <span className="text-white text-center no-underline  mx-2 justify-between">
                  {currentUser.username}
                </span>
                <ArrowDown className="fill-white font-bold" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" backdrop-blur-md z-[1001] text-zinc-300 border-0 rounded-xl">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <a href="#Profile">Profile</a>
              </DropdownMenuItem>
              <DropdownMenuItem>Setting</DropdownMenuItem>
              <DropdownMenuItem onClick={Logout} className="text-red-400">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {buttons}
      </div>
    </div>
  );
};
export default Header;
