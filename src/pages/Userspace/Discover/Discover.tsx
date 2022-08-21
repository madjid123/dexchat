import { useEffect, useState } from "react"
import Input from "../../../components/Input/Input"
import { useLazyGetAllUsersQuery, User } from "../../../services/searchApi"
import { useSelector } from "react-redux"
import { AuthSelector } from "../../../features/user/authSlice"
import { Nav } from "react-bootstrap"
import { Person, PersonPlusFill } from "react-bootstrap-icons"
import Button from "../../../components/Button/Button"
export const Discover = () => {
  const [pattern, setPattern] = useState("")
  const { currentUser } = useSelector(AuthSelector)
  const [trigger, data, error,] = useLazyGetAllUsersQuery()
  useEffect(() => {
    if (currentUser !== undefined) {
      trigger({ pattern: pattern, user_id: currentUser._id, friend: "" })
    }
  }, [currentUser, pattern])
  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    setPattern(target.value)
    // if (currentUser !== undefined)
    // trigger({ pattern: pattern, user_id: currentUser._id })

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
      <div className="p-3"
        style={{ display: "flex", flexDirection: "column" }}>

        {(data.isSuccess) && data.data.map((user: User) => {
          return <Nav.Item>
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
                <Button className="btn-warning">
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