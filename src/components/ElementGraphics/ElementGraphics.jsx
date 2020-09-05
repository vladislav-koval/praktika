import React, { useEffect, useState } from "react";
import './style.scss'
import Input from "../UI/Input/Input";

const ElementGraphics = ({ name, responsible, startDate, endDate, onChange, index, disabled }) => {
  const [state, setState] = useState({ min: null, max: null });

  const changeStart = (value) => {
    //TODO: fix (07 + 1 === 8): need (07+1 === 08)
    let min = null;
    if (value) {
      value = value.split("-");
      value[2] = +value[2] + 1;
      min = value.join("-");
    }
    setState((prev) => {
      return { ...prev, min: min }
    });
  }

  const changeEnd = (value) => {
    let max = null;
    if (value) {
      value = value.split("-");
      value[2] = +value[2] - 1;
      max = value.join("-");
    }
    setState((prev) => {
      return { ...prev, max: max }
    });
  }

  useEffect(() => {
    changeStart(startDate);
  }, [startDate]);

  useEffect(() => {
    changeEnd(endDate);
  }, [endDate]);

  return (
    <tr className="graphic-row">
      <td className="name">{name}</td>
      <td className="responsible">{responsible}</td>
      <td className="startTime">
        <Input className="input" value={startDate ?? ""} type="date"
               disabled={disabled}
               max={state.max}
               onChange={(event) => {
                 onChange(event.target.value, 'startDate', index);
               }} />
      </td>
      <td className="endTime">
        <Input value={endDate ?? ""} type="date" min={state.min}
               disabled={disabled}
               onChange={(event) => {
                 onChange(event.target.value, 'endDate', index);
               }} />
      </td>
    </tr>
  )
};
ElementGraphics.displayName = "ElementGraphics";
export default ElementGraphics;