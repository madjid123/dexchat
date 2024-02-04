import { useEffect } from "react";
import { store } from "~/app/store";
import { useAuthSelector } from "~/features/user/authSlice";
import {
  useLazyJoinRejectQuery,
  useLazyJoinAcceptQuery,
  SearchEndPointAPI,
  useLazyGetRequestsQuery,
} from "~/services/searchApi";

export const useHandleRequestClick = ({ pattern }: { pattern: string }) => {
  const [triggerAcceptRequest, AcceptRequestResponse] =
    useLazyJoinAcceptQuery();
  const { currentUser } = useAuthSelector();
  const [triggerRejectRequest] = useLazyJoinRejectQuery();
  const [triggerGetRequests, Requests] = useLazyGetRequestsQuery();
  const handleRequestClick = (index: number, accept: boolean) => {
    let user_id: string;
    if (Requests.data !== undefined) {
      user_id = Requests.data[index].RequesterId._id;
    } else return;
    if (currentUser !== undefined) {
      if (accept === false) {
        triggerRejectRequest({
          user_id: currentUser?._id,
          other_user_id: user_id,
        });
      } else {
        triggerAcceptRequest({
          user_id: currentUser?._id,
          other_user_id: user_id,
        });
      }
      store.dispatch(
        SearchEndPointAPI.util.updateQueryData(
          "getRequests",
          { user_id: currentUser?._id },
          (draftJrReq) => {
            draftJrReq = draftJrReq.filter(
              (jrr, i) => jrr.ReceiverId !== currentUser?._id
            );
            return draftJrReq;
          }
        )
      );
    }
  };
  useEffect(() => {
    if (currentUser !== undefined) {
      triggerGetRequests({ user_id: currentUser._id });
    }
  }, [currentUser, pattern, triggerGetRequests]);
  return {
    Requests,
    triggerGetRequests,
    AcceptRequestResponse,
    handleRequestClick,
  };
};
