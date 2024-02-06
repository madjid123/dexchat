import React, { useEffect, useState } from "react";
import Input from "../../../components/Input/Input";
import {
  SearchEndPointAPI,
  useLazyGetAllUsersQuery,
  useLazyJoinRequestQuery,
  useLazyJoinRemoveQuery,
  User as UserType,
} from "../../../services/searchApi";
import { store } from "../../../app/store";
import "./Discover.css";
import { useSelector } from "react-redux";
import { AuthSelector } from "../../../features/user/authSlice";
import { Nav } from "react-bootstrap";
import { Person, PersonDashFill, PersonPlusFill } from "react-bootstrap-icons";
import Button from "../../../components/Button/Button";
import { useHandleRequest } from "~/hooks/UserSpace/Discover/useHandleRequest";
import { Loader, User, UserPlus, UserPlusIcon, UserX } from "lucide-react";
import { Navigate } from "react-router";
import { useTabsContext } from "~/contexts/TabsContext";
export const Discover = () => {
  const [pattern, setPattern] = useState("");
  const { setEventKey } = useTabsContext();
  const handleChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setPattern(target.value);
  };
  const { discoverRooms, dataJoinRequest, handleRequestClick } =
    useHandleRequest({
      pattern,
    });
  return (
    <div className="flex flex-col items-center gap-2">
      <h3>Discover</h3>
      <div className="flex flex-col  gap-2">
        <div className="flex-row gap-4 flex">
          <Input
            placeholder="Search for new contact"
            variant="dark"
            value={pattern}
            onChange={handleChange}
          />
          <div>
            {dataJoinRequest.isError === true && (
              <p className="text-danger">
                {(dataJoinRequest.error as any).data.originalStatus !== 200}
              </p>
            )}
            {dataJoinRequest.isSuccess && (
              <p className="text-success">Request is sent!</p>
            )}
          </div>
        </div>
        <div className="px- flex flex-col justify-start h-fit">
          {discoverRooms.isSuccess &&
            discoverRooms.data.map((user: UserType, index) => {
              return (
                <Nav.Item key={index} className="nav-item-dex">
                  <div className="flex items-center justify-between  p-2">
                    <div className="flex jusifiy-center items-center gap-1">
                      <div className="">
                        <User />
                      </div>
                      <div>{user.username}</div>
                    </div>

                    <div className="!text-yellow-500 mx-2">
                      {!user.to && (
                        <Button
                          className={` `}
                          onClick={() => handleRequestClick(index)}
                          variant={`${user.pendingRequest ? "danger" : ""}`}
                        >
                          {!user.pendingRequest ? (
                            <UserPlus className="text" size={16} />
                          ) : (
                            <UserX className="text" size={16} />
                          )}
                        </Button>
                      )}
                      {user.to && (
                        <Button
                          className="!text-yellow-500 border-2 !border-yellow-500 rounded-md p-1 hover:!bg-yellow-500 hover:!text-white"
                          onClick={() => {
                            setEventKey("requests");
                          }}
                        >
                          <Loader size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                </Nav.Item>
              );
            })}
        </div>
      </div>
    </div>
  );
};
