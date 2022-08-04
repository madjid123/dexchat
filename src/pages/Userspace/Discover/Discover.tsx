import { useState } from "react"
import Input from "../../../components/Input/Input"
import {Link} from "react-router-dom"
export const Discover =()=>{
    const [pattern, setPattern] = useState("")
    const pseudoUsers = ["dxfd", "fkdjf" ,"erwtq","twqrt","trw"]
    const handleChange= (e: React.SyntheticEvent) =>{
                    const target = e.target as HTMLInputElement
                    setPattern(target.value )

                  }
    return <div className= "my-container">
              <div className="flex-row">
                <Input
                  placeholder="Search for new contact"
                //   style={{ width: "90%", fontSize: "12px" }}
                  variant="light"
                  value={pattern}
                  onChange={handleChange}
                />
                <div className=""
                style={{display: "flex", flexDirection: "column"}}>
                  {pseudoUsers.map(pu => (<Link to="#ew"  >{pu}</Link>) )}
                </div>
              </div>
        </div>
}