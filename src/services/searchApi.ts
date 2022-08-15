import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import URL from "../URL"

export const SearchEndPointAPI = createApi({
    reducerPath: "SearchEndPointAPI",
    baseQuery: fetchBaseQuery({ baseUrl: URL, credentials: "include" }),
    tagTypes: ["Search"],
    endpoints: (builder) => ({
        getAllUsers: builder.query<any, { user_id: string }>({
            query: (args) => ({
                url: `search/${args.user_id}/getallusers`
            }),
            transformResponse: (rawResult, meta) => {
                console.log(rawResult)
                return rawResult
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
    })

})
export const { useGetAllUsersQuery, useLazyGetAllUsersQuery } = SearchEndPointAPI