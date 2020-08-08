import React from "react";
import ElementGraphics from "../ElementGraphics/ElementGraphics";
import '../ElementGraphics/style.scss'

const Table = ({stageControls, onChangeHandler}) => {
    return (
        <table className="table-graphic">
            <tr className="graphic-row head">
                <th className="name">Наименование этапа</th>
                <th className="responsible">Ответственный</th>
                <th className="startTime">Начало этапа</th>
                <th className="endTime">Конец этапа</th>
            </tr>
            {
                stageControls.map((stageControl, i) => (
                    <ElementGraphics stageControl={stageControl} key={i} onChange={onChangeHandler} index={i}/>
                ))
            }
        </table>
    )
}

export default Table;