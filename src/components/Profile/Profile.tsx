import { Camera, Image } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL;
import { useAuthSelector } from '~/features/user/authSlice';
import { useProfileSelector } from '~/features/user/profileSlice';
import ImageWithFallbackOnError from '../imageWithFallbackOnError';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useImageChange } from '~/hooks/UserSpace/Profile/useImageChange';
import { useFormSubmit } from '~/hooks/UserSpace/Profile/useUserInfoFormSubmit';

export const Profile = () => {
  const { loading, error, userInfo } = useProfileSelector();
  const {
    selectedFile,
    uploadPhotoRef,
    submitRef,
    handleImageChange,
    handleImgSubmit,
  } = useImageChange();
  const { formRef, handleChangeInfoSubmit, handleInfoChanges } = useFormSubmit({
    userInfo,
  });
  const { currentUser } = useAuthSelector();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-h-full gap-5">
      <h1 className="text-xl">Profile</h1>
      <div className="flex flex-col items-start justify-start w-full h-screen gap-5">
        <div className="flex flex-col items-center justify-start w-full overflow-y-scroll !h-[75%] change-avatar-section">
          {error !== null && (
            error.map(err=> 
            <span key={err} className="text-sm text-red-400">{err}</span>
            )
          )}
          {loading && (
            <span className="text-sm text-yellow-400">Loading...</span>
          )}
          <form
            onSubmit={handleImgSubmit}
            ref={formRef}
            className="flex-col items-center justify-center w-full gap-5"
          >
            {/* < className="text-center w-full">click on photo to change the avatar</span> */}

            <label className="relative flex items-center justify-center  p-4 fill-slate-500 group ">
              {currentUser?.image && (
                <div className="absolute w-full inset-0 flex items-center justify-center  opacity-0 group-hover:opacity-100 duration-300  h-full ">
                  <Camera
                    className="w-12 h-12 rounded-md flex justify-center "
                    onClick={(e) => {
                      if (uploadPhotoRef.current !== null)
                        uploadPhotoRef.current.click();
                    }}
                  />
                </div>
              )}
              <ImageWithFallbackOnError
                htmlFor="upload-photo"
                src={
                  selectedFile !== null
                    ? URL.createObjectURL(selectedFile)
                    : `${API_URL}/${currentUser?.image}`
                }
                className=" w-32 h-32 rounded-md    group-hover:bg-primary-500/50 group-hover:shadow-[0_0px_10px_0px] group-hover:shadow-primary-700/50"
                alt="New Avatar"
                fallback={
                  <Image
                    className="font-thin rounded-md group-hover:bg-primary-500/50 group-hover:shadow-[0_0px_10px_0px] group-hover:shadow-primary-700/50 text-neutral-300"
                    strokeWidth={1}
                    size="128"
                  />
                }
                value="madjid"
                height={1000}
                width={1000}
              />
            </label>
            <input
              ref={uploadPhotoRef}
              id="upload-photo"
              name="avatar"
              type="file"
              accept="image/*"
              hidden
              className="hover:bg-primary-500"
              onChange={handleImageChange}
            />
            <button type="submit" value={undefined} ref={submitRef} />
          </form>
          <div className="flex items-start justify-center gap-2 ">
            <form
              className="flex flex-col items-center justify-start gap-2 "
              onSubmit={handleChangeInfoSubmit}
            >
              <label>Change username</label>
              <Input
                type="text"
                name="username"
                value={userInfo.username}
                placeholder="New Username"
                variant="light"
                onChange={handleInfoChanges}
                autoComplete="off"
                autoSave="off"
                required
              />
              <label>Change email</label>
              <Input
                type="email"
                name="email"
                placeholder="New Email"
                variant="light"
                value={userInfo.email}
                onChange={handleInfoChanges}
              />
              <label>Change password</label>
              <Input
                type="password"
                name="oldpassword"
                value={userInfo.oldpassword}
                placeholder="Old Password"
                variant="light"
                onChange={handleInfoChanges}
                required
              />
              <Input
                type="password"
                name="newpassword"
                placeholder="New Password"
                variant="light"
                value={userInfo.newpassword}
                onChange={handleInfoChanges}
              />
              <Button type="submit">Submit </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
