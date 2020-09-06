import React, { useEffect, useState } from "react";
import { getProposal, getProposalDoc } from "../../services/UserProposalService";
import ProposalInfo from "../ProposalInfo/ProposalInfo";
import { useHistory, Link } from "react-router-dom";

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
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();
    }).catch(err => {
      console.log(err)
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
          {data?.status === "PROPOSAL_MADE" &&
            <p onClick={onClickLink} className="proposal-made">Коммерческое предложение готово</p>
          // <a download="foo.pdf" href={API_URL+"/proposal-doc"}>download</a>
          }

        </div>
      </main>
    </>
  )
}

export default ProposalInfoUser;