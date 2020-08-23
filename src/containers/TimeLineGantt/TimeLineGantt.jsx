import React, { useEffect, useState } from "react";
import "./style.scss";
import { getStages } from "../../services/StagesService";
import { Link } from "react-router-dom";
import TimeLine from "react-gantt-timeline";

function TimeLineGantt() {
  const [mode, setMode] = useState("month")
  const [data, setData] = useState([]);

  useEffect(() => {
    getStages().then(res => {
      let id = 1;
      if (res.data.length > 0) {
        const tempData = res.data.map((item) => {
          const plan = {
            id: id++,
            name: item.name,
            start: item.planned.startDate,
            end: item.planned.endDate,
            color: "#397532"
          }
          const fact = { id: id++, start: item.fact.startDate, end: item.fact.endDate, color: "#264e8a" }
          return [plan, fact]
        }).flat()
        setData(tempData);
      }
    }).catch(err => {
      alert(err.message);
    })
  }, [])

  return (
    <main>
      <div className="gantt__container">
        <div className="gantt__buttons">
          <Link className={"personal-area__link"} to={"/account"}>Таблицы</Link>
        </div>
        <div className={"mode-container " + mode}>
          <div className="mode-container-item __month" onClick={() => setMode("month")}>Месяц</div>
          <div className="mode-container-item __year" onClick={() => setMode("year")}>Год</div>
        </div>
        <TimeLine mode={mode} data={data} nonEditableName={true} />
      </div>
    </main>
  )
}

export default TimeLineGantt;