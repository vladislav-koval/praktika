import React, { useEffect, useState } from "react";
import { getProposal, getProposalDoc } from "../../services/UserProposalService";
import ProposalInfo from "../ProposalInfo/ProposalInfo";
import { useHistory, Link } from "react-router-dom";
import FileDownload from 'js-file-download';
import "./style.scss";

function ProposalInfoUser() {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([])
  const history = useHistory();

  useEffect(() => {
    getProposal().then(res => {
      setData(res.data);
      setCategories(res.data.categories);
    }).catch(() => {
      history.push("/account/proposal")
    })
  }, [])

  const onClickLink = () => {
    getProposalDoc().then(response => {
      FileDownload(response.data, 'Коммерческое предложение.pdf');
    }).catch(err => {
      alert(err.message)
    })

  }

  return (
    <>
      <main>
        <div className="container">
          <div className="user-proposal__buttons __proposal-info-margin">
            <Link className="personal-area__link" to={"/account"}>
              Таблицы
            </Link>
            <Link className="personal-area__link" to={"/account/gantt"}>
              График
            </Link>
            <Link className="personal-area__link __new-proposal" to={"/account/proposal"}>
              Создать новое предложение
            </Link>
          </div>
          <ProposalInfo data={data} categories={categories} />
          {data?.status === "PROPOSAL_MADE" ?
            <div className="proposal-made">
              <p className="proposal-made__message __success">Коммерческое предложение готово: </p>
              <a className="proposal-made__link" onClick={onClickLink}>Скачать</a>
            </div>
            :
            <div className="proposal-made">
              <p className="proposal-made__message ">Коммерческое предложение рассматривается администратором</p>
            </div>
          }

        </div>
      </main>
    </>
  )
}

export default ProposalInfoUser;