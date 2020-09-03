import React from "react";
import "./style.scss";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Button from "../../components/UI/Button/Button";

function Notification(props) {

  return (
    <>
      <div className="notification">
        <h2 className="notification__header">{props.header}</h2>
        <p className="notification__message">{props.message}</p>
        <Button onClick={props.onClose}>ОК</Button>
      </div>
      <Backdrop onClick={props.onClose} />
    </>
  )

}

export default Notification;