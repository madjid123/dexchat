import React, { useEffect, useRef, useState } from "react"
import Input from "../../../components/Input/Input"
import { useLazyGetAllUsersQuery, useLazyJoinRequestQuery, User } from "../../../services/searchApi"
import { useSelector } from "react-redux"
import { AuthSelector } from "../../../features/user/authSlice"
import { Nav } from "react-bootstrap"
import { Person, PersonPlusFill } from "react-bootstrap-icons"
import Button from "../../../components/Button/Button"
export const Discover = () => {
  const [pattern, setPattern] = useState("")
  const { currentUser } = useSelector(AuthSelector)
  const [trigger, data,] = useLazyGetAllUsersQuery()
  const [triggerjoinRequest, dataJoinRequest,] = useLazyJoinRequestQuery()
  const btnRef = useRef(null)
  useEffect(() => {
    if (currentUser !== undefined) {
      trigger({ pattern: pattern, user_id: currentUser._id, friend: "" })
    }
  }, [currentUser, pattern])
  const handleChange = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as HTMLInputElement
    setPattern(target.value)
  }
  const handleRequestClick = (user_id: string) => {
    console.log(user_id)
    if (currentUser !== undefined)
      triggerjoinRequest({ user_id: currentUser?._id, other_user_id: user_id })
  }
  console.log(dataJoinRequest.error)
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
        {(dataJoinRequest.isError && <p className="text-danger">{(dataJoinRequest.error as any).data}</p>)}
        {(dataJoinRequest.isSuccess && <p className="text-success">Request is sent!</p>)}
      </div>
      <div className="p-3"
        style={{ display: "flex", flexDirection: "column" }}>

        {(data.isSuccess) && data.data.map((user: User, index) => {
          return <Nav.Item key={index}>
            <div className="d-flex align-items-center justify-content-between p-2">
              <div className="d-flex">
                <div className="mx-1">
                  <Person />
                </div>
                <div>
                  {user.username}
                </div>
              </div>

              <div className="text-warning mx-2">
                {console.log(user.pendingRequest)}
                <Button className={`btn-warning ${user.pendingRequest ? "disabled" : ""}`} onClick={() => handleRequestClick(user._id)} id={index} disable={user.pendingRequest} >
                  <PersonPlusFill className="text-success" />
                </Button>
              </div>

            </div>

          </Nav.Item>
        })}
      </div>
    </div>
  </div>
}