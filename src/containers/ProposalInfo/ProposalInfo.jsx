import React, { useEffect, useState } from "react";
import { getProposal } from "../../services/UserProposalService";
import "./style.scss";

function ProposalInfo() {
  const [data, setData] = useState(null)
  useEffect(() => {
    getProposal().then(res => {
      setData(res.data);
    })
  }, [])
  return (
    <main>
      <div className="container">
        <div className="proposal-info__inner">
          <div className="proposal-info__field">
            <span>ФИО в И.П</span>
            <p>{data?.name}</p>
          </div>
          <div className="proposal-info__field">
            <span>ФИО в Р.П</span>
            <p>{data?.nameGenitive}</p>
          </div>
          <div className="proposal-info__field">
            <span>Название организации</span>
            <p>{data?.orgName}</p>
          </div>
          <div className="proposal-info__field">
            <span>Телефон</span>
            <p>{data?.phone}</p>
          </div>
          <div className="proposal-info__field">
            <span>Электронная почта</span>
            <p>{data?.email}</p>
          </div>
          <div className="proposal-info__field">
            <span>Расчетная стоймость</span>
            <p>{data?.calculationType?.name}</p>
          </div>
          <div className="proposal-info__field">
            <span>Типы документов</span>
            <ul>
              {data?.types.map((type, i) => {
                return <li key={i}>{type}</li>
              })}
            </ul>
          </div>
          <div className="proposal-info__field">
            <span>Данные</span>
            <ul>
              {
                data?.fields ?
                  Object.keys(data.fields).map(key => {
                    return <li key={key}>{key + ": " + data.fields[key]}</li>
                  }) : null
              }
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProposalInfo;