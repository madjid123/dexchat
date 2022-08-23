import React, { useEffect, useRef, useState } from "react"
import Input from "../../../components/Input/Input"
import {
    SearchEndPointAPI,
    useLazyGetAllUsersQuery,
    useLazyJoinAcceptQuery,
    useLazyJoinRejectQuery,
    useLazyGetRequestsQuery,
    User
} from "../../../services/searchApi"
import { store } from "../../../app/store"

import { useSelector } from "react-redux"
import { AuthSelector } from "../../../features/user/authSlice"
import { Nav } from "react-bootstrap"
import { Person, PersonCheckFill, PersonDashFill, PersonPlusFill, PersonXFill } from "react-bootstrap-icons"
import Button from "../../../components/Button/Button"
export const Requests = () => {
    const [pattern, setPattern] = useState("")
    const { currentUser } = useSelector(AuthSelector)
    const [trigger, data,] = useLazyGetRequestsQuery()
    const [triggerAccept, dataAccept,] = useLazyJoinAcceptQuery()
    const [triggerReject, dataReject,] = useLazyJoinRejectQuery()
    const btnRef = useRef(null)
    useEffect(() => {
        if (currentUser !== undefined) {
            trigger({ user_id: currentUser._id })
        }
    }, [currentUser, pattern])
    const handleChange = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const target = e.target as HTMLInputElement
        setPattern(target.value)
    }
    const handleRequestClick = (index: number, accept: boolean) => {
        let user_id: string
        let user: User
        let pendingRequest: boolean
        if (data.data !== undefined) {
            user_id = data.data[index].RequesterId._id

        }
        else
            return
        if (currentUser !== undefined) {
            if (accept === false) {
                triggerReject({ user_id: currentUser?._id, other_user_id: user_id })
            }
            else {
                triggerAccept({ user_id: currentUser?._id, other_user_id: user_id })
            }
            store.dispatch(SearchEndPointAPI.util.updateQueryData("getRequests", { user_id: currentUser?._id }, (draftJrReq) => {
                draftJrReq = draftJrReq.filter((jrr, i) => jrr.ReceiverId !== currentUser?._id)
                return draftJrReq
            }))
        }

    }
    return <div className="my-container">
        <div className="flex-row">
            <Input
                placeholder="Search for new contact"
                style={{ width: "90%", fontSize: "12px" }}
                variant="dark"
                value={pattern}
                onChange={handleChange}
            />
            <div>
                {(dataAccept.isError && <p className="text-danger">{(dataAccept.error as any).data.originalStatus !== 200}</p>)}
                {(dataAccept.isSuccess && <p className="text-success">Request is sent!</p>)}
            </div>
            <div className="p-3"
                style={{ display: "flex", flexDirection: "column" }}>

                {(data.isSuccess) && data.data.map((JrReq, index) => {
                    return <Nav.Item key={index}>
                        <div className="d-flex align-items-center justify-content-between p-2">
                            <div className="d-flex">
                                <div className="mx-1">
                                    <Person />
                                </div>
                                <div>
                                    {JrReq.RequesterId.username}
                                </div>
                            </div>

                            <div className="text-warning mx-2 d-flex justify-content-around gap-2">
                                <Button className={` `} onClick={() => handleRequestClick(index, true)} id={index}
                                    variant={""} >
                                    <PersonCheckFill className="text" />

                                </Button>
                                <Button className={` `} onClick={() => handleRequestClick(index, false)} id={index}
                                    variant="danger" >
                                    <PersonXFill className="text" />
                                </Button>
                            </div>

                        </div>

                    </Nav.Item>
                })}
            </div>
        </div>
    </div>
}