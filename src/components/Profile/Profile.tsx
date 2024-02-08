import axios from "axios";
import { Camera } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import API_URL from "~/URL";
import { useAuthSelector } from "~/features/user/authSlice";

export const Profile = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { currentUser } = useAuthSelector()
    const formRef = useRef<HTMLFormElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);
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
    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedFile) return; // No file selected, exit early

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        try {
            const response = await axios(`${API_URL}/user/${currentUser?._id}/modify/avatar`, {
                method: 'post',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            console.log(response);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }

            const result = await response.data;
            console.log(result);
            // Handle successful response here, e.g., update UI or show success message
        } catch (error) {
            console.error('Error:', error);
            // Handle error here, e.g., show error message
        }
    };
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-xl">Profile</h1>
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="change-avatar-section">
                    <form onSubmit={handleSubmit} ref={formRef} >

                        <label htmlFor="upload-photo">
                            {currentUser?.image !== undefined ?

                                <img src={selectedFile ? URL.createObjectURL(selectedFile) : `${API_URL}/${currentUser.image}`} className="w-48 h-48" sizes="500px,500px" alt="New Avatar" /> :
                                <Camera size="48" />
                            }
                        </label>
                        <input
                            id="upload-photo"
                            name="avatar"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                        <button type="submit" value={undefined} ref={submitRef} />
                    </form>
                </div>
            </div>
        </div >
    );
}