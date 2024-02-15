export interface AvatarProfile {
  avatar: File;
}
export interface UserInfo {
  _id: string;
  username: string;
  email?: string;
  oldpassword: string;
  newpassword?: string;
}
export interface ProfileInfo {
  userInfo: UserInfo;
  avatarFormData: FormData;
  loading: boolean;
  error: string[] | null;
}
