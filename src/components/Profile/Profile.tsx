import axios from "axios";
import { Camera, Image } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import API_URL from "~/URL";
import { useAppDispatch } from "~/app/hooks";
import { useAuthSelector } from "~/features/user/authSlice";
import { setAvatarFormData, setUserInfo, updateProfileAvatar, updateUserInfo, useProfileSelector } from "~/features/user/profileSlice";
import ImageWithFallbackOnError from "../imageWithFallbackOnError";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { ProfileInfo } from "~/features/user/profileSlice.types";

export const Profile = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { currentUser } = useAuthSelector()
    const formRef = useRef<HTMLFormElement>(null);
    const uploadPhotoRef = useRef<HTMLInputElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);
    const dispatch = useAppDispatch()
    const { loading, error, userInfo } = useProfileSelector()
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };
    useEffect(() => {
        if (selectedFile === null) return
        if (submitRef.current === null) return
        console.log(submitRef.current)
        submitRef.current.click();
    }, [selectedFile, submitRef])
    useEffect(() => {
        if (currentUser === undefined) return
        dispatch(setUserInfo({ ...currentUser, newPassword: null }))
    }, [currentUser])
    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFile) return; // No file selected, exit early

        const formData = new FormData();
        formData.append('avatar', selectedFile);
        const d = dispatch(updateProfileAvatar({ avatarFormData: formData, userId: currentUser?._id as string }))
        console.log(d)

    };
    const handleChangeInfoSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formRef.current === null) return
        dispatch(updateUserInfo(userInfo!))
    }
    const handleInfoChanges = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setUserInfo({ ...userInfo, [event.target.name]: event.target.value } as ProfileInfo))
    }
    return (
        <div className="flex flex-col items-center justify-center w-full h-full max-h-full gap-5">
            <h1 className="text-xl">Profile</h1>
            <div className="flex flex-col items-start justify-start w-full h-screen gap-5">
                <div className="flex flex-col items-center justify-start w-full overflow-scroll !h-[75%] change-avatar-section">
                    {error !== null && <span className="text-sm text-red-400">{error}</span>}
                    {loading && <span className="text-sm text-yellow-400">Loading...</span>}
                    <form onSubmit={handleSubmit} ref={formRef} className="flex-col items-center justify-center w-full gap-5" >
                        {/* < className="text-center w-full">click on photo to change the avatar</span> */}

                        <label className="relative flex items-center justify-center w-full p-4 fill-slate-500">

                            {currentUser?.image && <Camera className="absolute w-12 h-12 rounded-md " onClick={(e) => {

                                if (uploadPhotoRef.current !== null) uploadPhotoRef.current.click()
                            }} />}
                            <ImageWithFallbackOnError

                                htmlFor="upload-photo"
                                src={selectedFile !== null ?
                                    URL.createObjectURL(selectedFile) :
                                    `${API_URL}/${currentUser?.image}`}
                                className=" w-32 h-32 rounded-md  hover:bg-primary-500/50 hover:shadow-[0_0px_10px_0px] hover:shadow-primary-500/50" alt="New Avatar"
                                fallback={<Image className="font-thin rounded-md hover:bg-primary-500/50 hover:shadow-[0_0px_10px_0px] hover:shadow-primary-500/50 text-neutral-300" strokeWidth={1} size="128" />}
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
                            onChange={handleImageChange}
                        />
                        <button type="submit" value={undefined} ref={submitRef} />
                    </form>
                    <div className="flex items-start justify-center gap-2 ">
                        <form className="flex flex-col items-center justify-start gap-2 " onSubmit={handleChangeInfoSubmit}>
                            <label>Change username</label>
                            <Input type="text"
                                name="username"
                                value={userInfo?.username}
                                placeholder="New Username"
                                variant="light"
                                onChange={handleInfoChanges}
                                autoComplete="off"
                                autoSave="off"
                                required
                            />
                            <label>Change email</label>
                            <Input type="email"
                                name="email"
                                placeholder="New Email"
                                variant="light"
                                value={userInfo?.email}
                                onChange={handleInfoChanges}
                            />
                            <label>Change password</label>
                            <Input type="password" name="oldpassword"
                                value={userInfo?.oldpassword} placeholder="Old Password" variant="light"
                                onChange={handleInfoChanges}
                                required />
                            <Input type="password" name="newpassword" placeholder="New Password" variant="light"
                                value={userInfo?.newpassword}
                                onChange={handleInfoChanges} />
                            <Button type="submit">Submit </Button>
                        </form>

                    </div>
                </div>
            </div>
        </div >
    );
}