import React, { useEffect, useState } from "react";
import "./style.scss";
import { getUser } from "../../services/AdminService";
import Table from "../../components/Table/Table";
import TimeLine from "react-gantt-timeline";
import Button from "../../components/UI/Button/Button";
import { Link } from "react-router-dom";


function AdminUserArea(props) {
  const [stageControls, setStageControls] = useState([]);
  const [timeLineData, setTimeLineData] = useState([]);
  const [isTables, setIsTables] = useState(true);
  const [isPlanned, setIsPlanned] = useState(true);
  const [mode, setMode] = useState("month");

  const toTimeLineData = (data) => {
    let id = 1;
    const tempData = data.map((item) => {
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
    setTimeLineData(tempData);
  }

  useEffect(() => {
    const login = props.match.params.name;
    getUser(login).then(res => {
      setStageControls(res.data);
      toTimeLineData(res.data);
    }).catch(err => {
      alert(err.message);
    })
  }, []);

  return (
    <main>
      <div className="container admin-user-area">
        <div className="admin-user-area__buttons">
          <Button type='primary' onClick={() => {
            setIsTables(true);
            setIsPlanned(true);
          }}>Плановая таблица</Button>
          <Button type='primary' onClick={() => {
            setIsTables(true);
            setIsPlanned(false);
          }}>Фактическая таблица</Button>
          <Button type='primary' onClick={() => {
            setIsTables(false);
          }}>График</Button>
          <Link className={"admin-link"} to="/admin/users">Список Пользователей</Link>
        </div>
        {
          isTables ? (<Table stageControls={stageControls} isPlanned={isPlanned} disabled={true} />)
            : (
              <>
                <div className={"mode-container " + mode}>
                  <div className="mode-container-item __month" onClick={() => setMode("month")}>Месяц</div>
                  <div className="mode-container-item __year" onClick={() => setMode("year")}>Год</div>
                </div>
                <TimeLine mode={mode} data={timeLineData} nonEditableName={true} />
              </>
            )
        }
      </div>
    </main>
  )
}

export default AdminUserArea;