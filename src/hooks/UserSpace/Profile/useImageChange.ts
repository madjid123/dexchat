import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '~/app/hooks';
import { useAuthSelector } from '~/features/user/authSlice';
import { updateProfileAvatar } from '~/features/user/profileSlice';

export const useImageChange = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const uploadPhotoRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const { currentUser } = useAuthSelector();
  useEffect(() => {
    if (selectedFile === null) return;
    if (submitRef.current === null) return;
    submitRef.current.click();
  }, [selectedFile, submitRef]);
  const handleImgSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return; // No file selected, exit early

    const formData = new FormData();
    formData.append('avatar', selectedFile);
    const d = await dispatch(
      updateProfileAvatar({
        avatarFormData: formData,
        userId: currentUser?._id as string,
      }),
    );
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return {
    selectedFile,
    uploadPhotoRef,
    submitRef,
    handleImageChange,
    handleImgSubmit,
  };
};
