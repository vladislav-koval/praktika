import React from "react";
import './style.scss'
import Input from "../UI/Input/Input";
import {CUSTOMER, PERFORMER} from "../../form/formService";

const ElementGraphics = ({stageControl, onChange, index}) => {
    let responsible = '';
    if (stageControl.responsible === PERFORMER) {
        responsible = "Исполнитель"
    } else if (stageControl.responsible === CUSTOMER) {
        responsible = "Заказчик"
    } else {
        responsible = "Заказчик, Исполнитель"
    }
    return (
        <tr className="graphic-row">
            <td className="name">{stageControl.name}</td>
            <td className="responsible">{responsible}</td>
            <td className="startTime">
                <Input className="input" value={stageControl.startDate.value} type={stageControl.startDate.type}
                       onChange={(event) => onChange(event.target.value, 'startDate', index)}/>
            </td>
            <td className="endTime">
                <Input value={stageControl.endDate.value} type={stageControl.endDate.type}
                       onChange={(event) => onChange(event.target.value, 'endDate', index)}/>
            </td>
        </tr>
    )
};
ElementGraphics.displayName = "ElementGraphics";
export default ElementGraphics;