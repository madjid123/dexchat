import { useEffect } from "react";
import { store } from "~/app/store";
import { useAuthSelector } from "~/features/user/authSlice";
import {
  SearchEndPointAPI,
  User,
  useLazyGetAllUsersQuery,
  useLazyJoinRemoveQuery,
  useLazyJoinRequestQuery,
} from "~/services/searchApi";

export const useHandleRequest = ({ pattern }: { pattern: string }) => {
  const { currentUser } = useAuthSelector();
  const [triggerjoinRequest, dataJoinRequest] = useLazyJoinRequestQuery();
  const [triggerRemoveRequest] = useLazyJoinRemoveQuery();
  const [trigger, discoverRooms] = useLazyGetAllUsersQuery();
  useEffect(() => {
    if (currentUser !== undefined) {
      trigger({ pattern: pattern, user_id: currentUser._id, requests: "" });
    }
  }, [currentUser, pattern, trigger]);
  const handleRequestClick = (index: number) => {
    var user_id: string;
    var user: User;
    var pendingRequest: boolean;
    if (discoverRooms.data === undefined) return;
    user = discoverRooms.data[index];
    user_id = user._id;
    if (currentUser !== undefined) {
      if (user.pendingRequest === false) {
        triggerjoinRequest({
          user_id: currentUser?._id,
          other_user_id: user_id,
        });
        pendingRequest = true;
      } else {
        triggerRemoveRequest({
          user_id: currentUser?._id,
          other_user_id: user_id,
        });
        pendingRequest = false;
      }
      store.dispatch(
        SearchEndPointAPI.util.updateQueryData(
          "getAllUsers",
          {
            user_id: currentUser._id,
            pattern: "",
            requests: "",
          },
          (draftUsers) => {
            draftUsers[index].pendingRequest = pendingRequest;
            return draftUsers;
          }
        )
      );
    }
  };
  return { dataJoinRequest, discoverRooms, handleRequestClick };
};
