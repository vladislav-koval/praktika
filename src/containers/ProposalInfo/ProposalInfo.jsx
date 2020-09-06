import React from "react";
import "./style.scss";

function ProposalInfo({data, categories}) {
  // const [data, setData] = useState(null);
  // const [categories, setCategories] = useState([])
  // const history = useHistory();

  // useEffect(() => {
  //   getProposal().then(res => {
  //     console.log("res", res)
  //     setData(res.data);
  //     setCategories(res.data.categories);
  //   }).catch(err => {
  //     history.push("/account/proposal")
  //   })
  // }, [])
  return (
    <main>
      <div className="container">
        {/*<div className="user-proposal__buttons __proposal-info-margin">*/}
        {/*  <Link className="personal-area__link" to={"/account"}>*/}
        {/*    Таблицы*/}
        {/*  </Link>*/}
        {/*  <Link className="personal-area__link" to={"/account/gantt"}>*/}
        {/*    График*/}
        {/*  </Link>*/}
        {/*  <Link className="personal-area__link __new-proposal" to={"/account/proposal"}>*/}
        {/*    Создать новое предложение*/}
        {/*  </Link>*/}
        {/*</div>*/}
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
          {
            categories.map((category, i) => {
              return (
                <div className="proposal-info__field __border" key={i}>
                  <span>Типы документов</span>
                  <ul>
                    {
                      category.types.map((type, i) => {
                        return <li key={i}>{type}</li>
                      })
                    }
                  </ul>

                  <span>Данные</span>
                  <ul>
                    {
                      Object.keys(category.fields).map(key => {
                        return <li key={key}>{key + ": " + category.fields[key]}</li>
                      })
                    }
                  </ul>
                </div>
              )
            })
          }
        </div>
      </div>
    </main>
  )
}

export default ProposalInfo;