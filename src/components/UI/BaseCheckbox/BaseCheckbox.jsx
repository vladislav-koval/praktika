import React from "react";
import "./style.scss";

function BaseCheckbox(props) {
  return (
    <label className="checkbox-proposal">
      <span className="checkbox-proposal__text">{props.text}</span>
      <input className="checkbox-proposal__input" type="checkbox" onChange={props.onChange}/>
    </label>
  )
}

export default BaseCheckbox;