import { ChangeEvent, useEffect, useRef } from 'react';
import { useAppDispatch } from '~/app/hooks';
import { useAuthSelector } from '~/features/user/authSlice';
import { setUserInfo, updateUserInfo } from '~/features/user/profileSlice';
import { ProfileInfo, UserInfo } from '~/features/user/profileSlice.types';

export const useFormSubmit = ({ userInfo }: { userInfo: UserInfo | null }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const { currentUser } = useAuthSelector();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (currentUser === undefined) return;
    dispatch(setUserInfo({ ...currentUser, newPassword: null }));
  }, [currentUser]);

  const handleChangeInfoSubmit = async (
    event: ChangeEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (formRef.current === null) return;
    dispatch(updateUserInfo(userInfo!));
  };
  const handleInfoChanges = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setUserInfo({
        ...userInfo,
        [event.target.name]: event.target.value,
      } as ProfileInfo),
    );
  };

  return { formRef, handleChangeInfoSubmit, handleInfoChanges };
};
