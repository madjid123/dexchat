import Button from '../Button/Button';
import { useNavigate } from 'react-router';
import { logout, AuthSelector } from '../../features/user/authSlice';
import { useSelector } from 'react-redux';
import './Header.css';
const API_URL = import.meta.env.VITE_API_URL;
import './DropMenu.css';
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '../ui/dropdown-menu';
import DexLogo from '../../public/dexplanet.png';
import Avatar from 'avvvatars-react';
import { useAppDispatch } from '../../app/hooks';
import { ArrowDown, Menu } from 'lucide-react';
import { useTabsContext } from '~/contexts/TabsContext';
import { useSetCurrentMember } from '~/hooks/UserSpace/Conversation/useSetCurrentMemberName';
import { setAllRooms } from '~/features/user/RoomsSlice';
import {
  clearAllMessages,
  setRoom,
} from '~/features/Conversation/MessagesSlice';
import { useState } from 'react';
import ImageWithFallbackOnError from '../imageWithFallbackOnError';
type HeaderProps = {
  show: boolean;
  handleShow: () => void;
};
const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { currentUser, isAuth } = useSelector(AuthSelector);
  const { member, setMember } = useSetCurrentMember();
  const [showIcon, setShowIcon] = useState(false);
  const { showSidebar, setShowSidebar } = useTabsContext();
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(logout());
    setMember(null);
    dispatch(setAllRooms([]));
    dispatch(clearAllMessages({}));
    dispatch(setRoom(null));
    const newPath = '/login';
    navigate(newPath);
  };
  let buttons = <> </>;

  if (!isAuth)
    buttons = (
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-base ">
        <Button className="">
          <a href="/login">Login</a>
        </Button>
        <Button className="">
          <a href="/register">Register</a>
        </Button>
      </div>
    );

  return (
    <div className="w-full p-2">
      <div className=" sticky top-0  w-full p-4 rounded-xl  items-center  flex justify-between  shadow-[0_0px_10px_0px] shadow-primary-700/50 hover:shadow-primary-700/90 active:shadow-primary-700/50 hover:shadow-primary-700/90     backdrop-blur-md z-[1000] ">
        <div className="flex items-center gap-3 logo ">
          {isAuth && (
            <div className="md:hidden">
              <Menu
                className="text-white fill-white hover:text-slate-500"
                onClick={() => setShowSidebar(!showSidebar)}
              />
            </div>
          )}
          <img
            src={DexLogo}
            width="24"
            height="28"
            alt="dexlogo"
            className='hover:fill-white'
            onClick={() => {
              navigate('/');
            }}
          />
          <span className="text-white">DexChat</span>
        </div>
        <div className="flex menu ">
          {currentUser !== undefined && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="">
                <div className="flex items-center justify-center p-2 hover:bg-white/30 rounded-xl ">
                  {
                    <ImageWithFallbackOnError
                      value={currentUser.username}
                      src={`${API_URL}/${currentUser.image}`}
                      alt="avatar"
                      height={20}
                      width={20}
                      className="w-5 h-5 border rounded-md border-neutral-700"
                      fallback={
                        <Avatar
                          value={currentUser.username}
                          style="shape"
                          size={20}
                          radius={4}
                        />
                      }
                    />
                  }
                  <span className="justify-between mx-2 text-center text-white no-underline">
                    {currentUser.username}
                  </span>
                  <ArrowDown className="w-5 font-bold text-white" />
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
    </div>
  );
};
export default Header;
