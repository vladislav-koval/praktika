import React from "react";
import './style.scss'
import Input from "../UI/Input/Input";

const ElementGraphics = ({name,responsible, startDate, endDate, onChange, index}) => {

    return (
        <tr className="graphic-row">
            <td className="name">{name}</td>
            <td className="responsible">{responsible}</td>
            <td className="startTime">
                <Input className="input" value={startDate?? ""} type="date"
                       onChange={(event) => onChange(event.target.value, 'startDate', index)}/>
            </td>
            <td className="endTime">
                <Input value={endDate?? ""} type="date"
                       onChange={(event) => onChange(event.target.value, 'endDate', index)}/>
            </td>
        </tr>
    )
};
ElementGraphics.displayName = "ElementGraphics";
export default ElementGraphics;