import React, { useState } from "react";
import Input from "../../../components/Input/Input";
import { Nav } from "react-bootstrap";
import { Person, PersonCheckFill, PersonXFill } from "react-bootstrap-icons";
import Button from "../../../components/Button/Button";
import { useHandleRequestClick } from "~/hooks/UserSpace/Requests/useHandleRequestClick";
import { UserCheck, UserCheck2, UserCircle, UserX } from "lucide-react";
export const Requests = () => {
  const [pattern, setPattern] = useState("");

  const { Requests, handleRequestClick, AcceptRequestResponse } =
    useHandleRequestClick({ pattern });
  const handlePatternChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setPattern(target.value);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text font-bold">Requests</h3>
      <div className="flex-col flex justify-start items-center gap-1 ">
        <Input
          placeholder="Search in incoming requests"
          style={{ width: "90%", fontSize: "12px" }}
          variant="dark"
          value={pattern}
          onChange={handlePatternChange}
        />
        <div>
          {AcceptRequestResponse.isError && (
            <p className="text-danger">
              {(AcceptRequestResponse.error as any).data.originalStatus !== 200}
            </p>
          )}
          {AcceptRequestResponse.isSuccess && (
            <p className="text-success">Request is sent!</p>
          )}
        </div>
        <div className=" flex flex-col justify-center items-center w-full">
          {Requests.isSuccess &&
            Requests.data.map((JrReq, index) => {
              return (
                <div key={index} className="w-full">
                  <div className="flex items-around justify-between gap-4 p-2">
                    <div className="flex gap-2 items-center justify-center text-lg">
                      <UserCircle />
                      <div>{JrReq.RequesterId.username}</div>
                    </div>

                    <div className="text-warning mx-2 flex items-center  justify-around gap-2">
                      <Button
                        className={` `}
                        onClick={() => handleRequestClick(index, true)}
                        variant={""}
                      >
                        <UserCheck className="text" size={16} />
                      </Button>
                      <Button
                        className={` `}
                        onClick={() => handleRequestClick(index, false)}
                        variant="danger"
                      >
                        <UserX className="text" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          {Requests.isSuccess && Requests.data.length === 0 && (
            <div className="text-xs text-gray-400">
              You don't have requests right now
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
