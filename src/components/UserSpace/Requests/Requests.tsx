import React, { useState } from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { useHandleRequestClick } from '~/hooks/UserSpace/Requests/useHandleRequestClick';
import { UserCheck, UserCheck2, UserCircle, UserX } from 'lucide-react';
import ImageWithFallbackOnError from '~/components/imageWithFallbackOnError';
const API_URL = import.meta.env.VITE_API_URL;
export const Requests = () => {
  const [pattern, setPattern] = useState('');

  const { Requests, handleRequestClick, AcceptRequestResponse } =
    useHandleRequestClick({ pattern });
  const handlePatternChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setPattern(target.value);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="font-bold text">Requests</h3>
      <div className="flex flex-col items-center justify-start w-full gap-1 ">
        <Input
          placeholder="Search in incoming requests"
          style={{ width: '90%', fontSize: '12px' }}
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
        <div className="flex flex-col items-center justify-center w-full ">
          {Requests.isSuccess &&
            Requests.data.map((JrReq, index) => {
              return (
                <div key={index} className="w-full">
                  <div className="flex justify-between gap-4 p-3  items-around hover:bg-primary-500 rounded-md ">
                    <div className="flex items-center justify-start p-1 gap-2">
                      <ImageWithFallbackOnError
                        src={`${API_URL}/${JrReq.RequesterId.image}`}
                        alt={`${JrReq.RequesterId.username}'s avatar`}
                        width={500}
                        height={500}
                        value={JrReq.RequesterId.username}
                        className="w-8 h-8 border rounded-md border-neutral-700"
                      />
                      <span>{JrReq.RequesterId.username}</span>
                    </div>
                    <div className="flex items-center justify-around gap-2  text-warning">
                      <Button
                        className={` `}
                        onClick={() => handleRequestClick(index, true)}
                        variant={''}
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
