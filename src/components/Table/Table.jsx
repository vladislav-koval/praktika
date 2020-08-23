import React from "react";
import ElementGraphics from "../ElementGraphics/ElementGraphics";
import '../ElementGraphics/style.scss'

const Table = ({ stageControls, onChangeHandler, isPlanned, disabled }) => {
  stageControls.sort((a, b) => a.order - b.order);
  return (
    <table className="table-graphic">
      <tbody>
      <tr className="graphic-row head">
        <th className="name">Наименование этапа</th>
        <th className="responsible">Ответственный</th>
        <th className="startTime">Начало этапа</th>
        <th className="endTime">Конец этапа</th>
      </tr>
      {
        stageControls.map((stageControl, i) => {
          let startDate = stageControl.fact.startDate;
          let endDate = stageControl.fact.endDate;

          if (isPlanned) {
            startDate = stageControl.planned.startDate;
            endDate = stageControl.planned.endDate;
          }
          return <ElementGraphics key={i} name={stageControl.name} responsible={stageControl.responsible}
                                  startDate={startDate} endDate={endDate} onChange={onChangeHandler} index={i} disabled={disabled} />
        })
      }
      </tbody>
    </table>
  )
}

export default Table;