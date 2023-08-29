import React, { useEffect, useRef, useState } from "react"
import Input from "../../../components/Input/Input"
import {
  SearchEndPointAPI,
  useLazyGetAllUsersQuery,
  useLazyJoinRequestQuery,
  useLazyJoinRemoveQuery,
  User
} from "../../../services/searchApi"
import { store } from "../../../app/store"
import "./Discover.css"
import { useSelector } from "react-redux"
import { AuthSelector } from "../../../features/user/authSlice"
import { Nav } from "react-bootstrap"
import { Person, PersonDashFill, PersonPlusFill } from "react-bootstrap-icons"
import Button from "../../../components/Button/Button"
export const Discover = () => {
  const [pattern, setPattern] = useState("")
  const { currentUser } = useSelector(AuthSelector)
  const [trigger, data,] = useLazyGetAllUsersQuery()
  const [triggerjoinRequest, dataJoinRequest,] = useLazyJoinRequestQuery()
  const [triggerRemoveRequest, dataRemoveRequest,] = useLazyJoinRemoveQuery()
  const btnRef = useRef(null)
  useEffect(() => {
    if (currentUser !== undefined) {
      trigger({ pattern: pattern, user_id: currentUser._id, requests: "" })
    }
  }, [currentUser, pattern])
  const handleChange = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as HTMLInputElement
    setPattern(target.value)
  }
  const handleRequestClick = (index: number) => {
    var user_id: string
    var user: User
    var pendingRequest: boolean
    if (data.data !== undefined) {
      user = data?.data[index]
      user_id = user._id

    }
    else
      return
    if (currentUser !== undefined) {
      if (user.pendingRequest === false) {
        triggerjoinRequest({ user_id: currentUser?._id, other_user_id: user_id })
        pendingRequest = true
      }
      else {
        triggerRemoveRequest({ user_id: currentUser?._id, other_user_id: user_id })
        pendingRequest = false
      }
      store.dispatch(SearchEndPointAPI.util.updateQueryData("getAllUsers", {
        user_id: currentUser._id, pattern: "", requests: ""
      }, (draftUsers) => {
        console.log("this is a draft")
        draftUsers[index].pendingRequest = pendingRequest
        return draftUsers
      }))
    }

  }
  return (
    <div className="my-container">
      <h4>Discover new users</h4>
      <div className="flex-row">
        <Input
          placeholder="Search for new contact"
          style={{ width: "90%", fontSize: "12px", outline: "none" }}
          variant="dark"
          value={pattern}
          onChange={handleChange}
        />
        <div>
          {(dataJoinRequest.isError && <p className="text-danger">{(dataJoinRequest.error as any).data.originalStatus !== 200}</p>)}
          {(dataJoinRequest.isSuccess && <p className="text-success">Request is sent!</p>)}
        </div>
        <div className="px-3"
          style={{
            display: "flex",
            flexDirection: "column",
            // overflow: "hidden",
            // overflowY: "scroll",
            height: "fit-content"
          }}>

          {(data.isSuccess) && data.data.map((user: User, index) => {
            return <Nav.Item key={index} className="nav-item-dex" >
              <div className="d-flex align-items-center justify-content-between  p-2">
                <div className="d-flex">
                  <div className="mx-1">
                    <Person />
                  </div>
                  <div>
                    {user.username}
                  </div>
                </div>

                <div className="text-warning mx-2">
                  {(!user.to) &&
                    <Button className={` `} onClick={() => handleRequestClick(index)} id={index}
                      variant={`${user.pendingRequest ? "danger" : ""}`} >
                      {(!user.pendingRequest) ? <PersonPlusFill className="text" /> :
                        <PersonDashFill className="text" onClick={() => console.log("person")} />
                      }
                    </Button>
                  }{
                    user.to && <p className="text-warning">has a request for You</p>
                  }
                </div>

              </div>

            </Nav.Item>
          })}
        </div>
      </div>
    </div>
  )
}