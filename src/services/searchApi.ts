import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { store } from "../app/store"
import { Room, setAllRooms } from "../features/user/RoomsSlice"
import URL from "../URL"

export type User = {
    _id: string,
    username: string,
    email: string,
    pendingRequest: boolean
}

export const SearchEndPointAPI = createApi({
    reducerPath: "SearchEndPointAPI",
    baseQuery: fetchBaseQuery({ baseUrl: URL, credentials: "include" }),
    tagTypes: ["Search"],
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], { user_id: string, pattern: string, friend: string }>({
            query: (args) => ({
                url: `search/${args.user_id}/getallusers?pattern=${args.pattern}${(args.friend === "true") ? "&friend=true" : ""}`,
            }),
            transformResponse: ({ users }: { users: User[] }, meta) => {
                return users
            },
        }),
        getRooms: builder.query<Room[], { pattern: string, user_id: string }>({
            query: (args) => ({
                url: `user/${args.user_id}/rooms?pattern=${args.pattern}`,
            }),
            transformResponse: (rawResult: any, meta) => {
                return rawResult.Rooms as Room[]
            },
            onQueryStarted: async (arg, api) => {
                try {
                    const { data } = await api.queryFulfilled
                    store.dispatch(setAllRooms(data))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        joinRequest: builder.query<any, { user_id: string, other_user_id: string }>({
            query: (args) => ({
                url: `join_room/${args.user_id}/request/${args.other_user_id}`
            })
        }),
        joinReject: builder.query<any, { user_id: string, other_user_id: string }>({
            query: (args) => ({
                url: `join_room/${args.user_id}/reject/${args.other_user_id}`
            })
        }),
        joinAccept: builder.query<any, { user_id: string, other_user_id: string }>({
            query: (args) => ({
                url: `join_room/${args.user_id}/accept/${args.other_user_id}`
            })
        }),
        joinRemove: builder.query<any, { user_id: string, other_user_id: string }>({
            query: (args) => ({
                url: `join_room/${args.user_id}/remove/${args.other_user_id}`,
                method: "DELETE"
            })
        }),
    })

})
export const {
    useGetAllUsersQuery,
    useLazyGetAllUsersQuery,
    useLazyGetRoomsQuery,
    useLazyJoinAcceptQuery,
    useLazyJoinRejectQuery,
    useLazyJoinRequestQuery,
    useLazyJoinRemoveQuery,
} = SearchEndPointAPI
