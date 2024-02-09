import React, { useState } from "react";
import Input from "../../../components/Input/Input";
import {
  User as UserType
} from "../../../services/searchApi";
import "./Discover.css";
import Button from "../../../components/Button/Button";
import { useHandleRequest } from "~/hooks/UserSpace/Discover/useHandleRequest";
import { Loader, User, UserPlus, UserX } from "lucide-react";
import { useTabsContext } from "~/contexts/TabsContext";
import ImageWithFallbackOnError from "~/components/imageWithFallbackOnError";
import API_URL from "~/URL";
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
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-row gap-4">
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
        <div className="flex flex-col justify-start px- h-fit">
          {discoverRooms.isSuccess &&
            discoverRooms.data.map((user: UserType, index) => {
              return (
                <div key={index} className="nav-item-dex">
                  <div className="flex items-center justify-between p-2 hover:bg-primary-500 rounded-md ">
                    <div className="flex items-center justify-start p-1 gap-2 w-full ">

                      <ImageWithFallbackOnError
                        src={`${API_URL}/${user.image}`}
                        alt={`${user.username}'s avatar`}
                        width={500} height={500}
                        value={user.username}
                        className="w-8 h-8 border rounded-md border-neutral-700"
                      />
                      <span>{user.username}</span>
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
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
