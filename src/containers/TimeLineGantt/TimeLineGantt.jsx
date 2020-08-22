import React, { useEffect, useState } from "react";
import "./style.scss";
import { getStages } from "../../services/StagesService";
import { Link } from "react-router-dom";
import TimeLine from "react-gantt-timeline";

function TimeLineGantt() {
  const config = {
    taskList: {
      title: {
        label: "Этапы",
      }
    }
  }

  const [mode, setMode] = useState("month")
  const [data, setData] = useState([]);

  useEffect(() => {
    getStages().then(res => {
      let id = 1;
      if (res.data.length > 0) {
        const tempData = res.data.map((item) => {
          const plan = { id: id++, name: item.name, start: item.planned.startDate, end: item.planned.endDate }
          const fact = { id: id++, start: item.fact.startDate, end: item.fact.endDate, }
          return [plan, fact]
        }).flat()
        setData(tempData);
      }
    }).catch(err => {
      alert(err.message);
    })
  }, [])

  // let d1 = new Date();
  // let d2 = new Date();
  // d2.setDate(d2.getDate() + 5);
  // let d3 = new Date();
  // d3.setDate(d3.getDate() + 8);
  // let d4 = new Date();
  // d4.setDate(d4.getDate() + 20);
  // const data = [
  //   {
  //     id: 1,
  //     start: d1,
  //     end: d2,
  //     name: "Demo Task 1"
  //   },
  //   {
  //     id: 0,
  //     start: d3,
  //     end: d4,
  //     color: "orange"
  //   }
  // ];

  return (
    <main>
      <div>
        <Link to={"/account"}>Таблицы</Link>
      </div>
      <div className="gantt__container">
        <div className={"mode-container " + mode}>
          <div className="mode-container-item __month" onClick={() => setMode("month")}>Месяц</div>
          <div className="mode-container-item __year" onClick={() => setMode("year")}>Год</div>
        </div>
        <TimeLine mode={mode} config={config} data={data} nonEditableName={true} />
      </div>
    </main>
  )

}

export default TimeLineGantt;