import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetMessagesByRoomIdQuery } from "../services/MessageApi";

export const useFetchMessages = (room_id: string, Page: number) => {
	const [page, setPage] = useState(Page)
	const { data, isLoading, isError, isFetching, isSuccess, error } = useGetMessagesByRoomIdQuery({ room_id: room_id, page: page })

	return { data, isLoading, isError, isFetching, isSuccess }

}