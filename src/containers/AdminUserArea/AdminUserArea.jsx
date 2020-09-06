import React, { useEffect, useState } from "react";
import "./style.scss";
import { getAdminProposal, getUser, makeAdminProposal } from "../../services/AdminService";
import Table from "../../components/Table/Table";
import TimeLine from "react-gantt-timeline";
import Button from "../../components/UI/Button/Button";
import { Link } from "react-router-dom";
import ProposalInfo from "../ProposalInfo/ProposalInfo";
import Input from "../../components/UI/Input/Input";


function AdminUserArea(props) {
  const [stageControls, setStageControls] = useState([]);
  const [timeLineData, setTimeLineData] = useState([]);
  // 1 - table, 2 - graphic, 3 - proposal
  const [isTables, setIsTables] = useState(1);
  const [isPlanned, setIsPlanned] = useState(true);
  const [mode, setMode] = useState("month");

  const [dataProposal, setDataProposal] = useState(null)
  const [categoriesProposal, setCategoriesProposal] = useState([]);

  const [cost, setCost] = useState("");

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

  const makeProposal = () => {
    const login = props.match.params.name;
    makeAdminProposal(login, cost).then(res => {
      console.log("RES", res)
    }).catch(err => {
      console.log("ERR", err)
    })
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

  useEffect(() => {
    const login = props.match.params.name;
    getAdminProposal(login).then(res => {
      setDataProposal(res.data);
      setCategoriesProposal(res.data.categories);
    }).catch(err => {
      console.log(err);
    })
  }, []);


  const renderFunc = () => {
    if (isTables === 1) {
      return <Table stageControls={stageControls} isPlanned={isPlanned} disabled={true} />
    } else if (isTables === 2) {
      return (
        <>
          <div className={"mode-container " + mode}>
            <div className="mode-container-item __month" onClick={() => setMode("month")}>Месяц</div>
            <div className="mode-container-item __year" onClick={() => setMode("year")}>Год</div>
          </div>
          <TimeLine mode={mode} data={timeLineData} nonEditableName={true} />
        </>
      )
    } else if (isTables === 3) {
      return (
        <>
          <ProposalInfo data={dataProposal} categories={categoriesProposal} />
          <div className="set-cost">
            <Input value={cost} onChange={(e) => setCost(e.target.value)} label={"Цена"} type="number"/>
            <Button onClick={makeProposal}>Отправить предложение</Button>
          </div>
        </>
      )
    }
  }

  return (
    <main>
      <div className="container admin-user-area">
        <div className="admin-user-area__buttons">
          <Button type='primary' onClick={() => {
            setIsTables(1);
            setIsPlanned(true);
          }}>Плановая таблица</Button>
          <Button type='primary' onClick={() => {
            setIsTables(1);
            setIsPlanned(false);
          }}>Фактическая таблица</Button>
          <Button type='primary' onClick={() => {
            setIsTables(2);
          }}>График</Button>
          <Button type='primary' onClick={() => {
            setIsTables(3);
          }}>Коммерческое предложение</Button>
          <Link className={"admin-link"} to="/admin/users">Список Пользователей</Link>
        </div>
        {
          isTables === 1 && (isPlanned ? <h2>Плановая таблица</h2>
            : <h2>Фактическая таблица</h2>)
        }
        {
          renderFunc()
        }
      </div>
    </main>
  )
}

export default AdminUserArea;