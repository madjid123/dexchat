import { Offcanvas } from "react-bootstrap"
import Button from "../../../components/Button/Button"
import Tabs from "../Tabs/Tabs"


export const OffCanvas = (props: any) => {
  return (
    <Offcanvas show={props.show} onHide={props.handleClose} backdrop="static" responsive="sm" className="offcanvas-dex" >
      <Offcanvas.Header >
        <Button
          onClick={props.handleClose}
        >X</Button>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Tabs></Tabs>
      </Offcanvas.Body>
    </Offcanvas>
  )
}