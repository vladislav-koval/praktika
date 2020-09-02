import React, { useEffect, useState } from "react";
import { getProposal, getTypes, setProposal } from "../../services/UserProposalService";
import { typesDocs } from "../../form/formService";
import { requestFields } from "../../form/formService";
import BaseCheckbox from "../../components/UI/BaseCheckbox/BaseCheckbox";
import Input from "../../components/UI/Input/Input";
import "./style.scss";
import Button from "../../components/UI/Button/Button";

const initialTypes = {
  types: [],
  fields: {},
  calculationTypes: "",
  name: "fdsa",
  nameGenitive: "",
}

const initialCategories = {
  category1: 0,
  category2: 0,
  category3: 0,
}

const initialCategoryStyle = {
  category1: { display: "none" },
  category2: { display: "none" },
  category3: { display: "none" },
}


class UserProposal extends React.Component {
  // getTypes().then((res) => {
  //   console.log("TYPES", res)
  // }).catch((err) => {
  //   console.log(err);
  // })

  // getProposal().then((res) => {
  //   console.log("Proposal", res)
  // }).catch((err) => {
  //   console.log(err);
  // })
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      fields: {},
      name: "",
      nameGenitive: "",
      orgName: "",
      phone: "",
      email: "",
      calculationType: "",
    }
  }
  componentDidMount() {
    getProposal().then((res) => {
      console.log("Proposal", res)
    }).catch((err) => {
      console.log(err);
    })
  }

  onChangeTypes = (type, value, category) => {
    this.setState(prevState => {
      if (value) {
        prevState.types.push(type);
      } else {
        prevState.types = prevState.types.filter(item => item !== type);
      }
      return prevState;
    });
  }

  onChangeFields = (field, value) => {
    this.setState(prevState => {
      prevState.fields[field] = value;
      return prevState;
    });
  }

  onChangeCalculationTypes = (value) => {
    this.setState(prevState => {
      prevState.calculationType = value;
      return prevState;
    });
  }

  onChangeInput = (field, value) => {
    this.setState(prevState => {
      prevState[field] = value;
      return prevState;
    })
  }

  onClickHandler = () => {
    setProposal(this.state).then(res => {
      console.log("RES", res)
    }).catch(err => {
      console.log("ERR", err);
    })
    console.log("t", this.state)
  }

  render() {
    return (
      <main>
        <div className="container">
          <div className="user-proposal__inner">
            <div className="user-proposal__inner-fields">
              <Input label="ФИО в И.П." value={this.state.name}
                     onChange={(e) => this.onChangeInput("name", e.target.value)} />
              <Input label="ФИО в р.п." value={this.state.nameGenitive}
                     onChange={(e) => this.onChangeInput("nameGenitive", e.target.value)} />
              <Input label="Название организации" value={this.state.orgName}
                     onChange={(e) => this.onChangeInput("orgName", e.target.value)} />
              <Input label="Телефон" value={this.state.phone}
                     onChange={(e) => this.onChangeInput("phone", e.target.value)} />
              <Input label="Электронная почта" value={this.state.email}
                     onChange={(e) => this.onChangeInput("email", e.target.value)} />

              <table className="cost-calculation">
                <thead>
                <tr>
                  <td>
                    <h3>Расчет стоймости</h3>
                  </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                    <label htmlFor="costCalculation1">
                      Для определения начальной цены контракта (для торгов)
                    </label>
                  </td>
                  <td>
                    <input id="DIRECT_PRICE" type="radio" name="costCalculation"
                           onChange={() => this.onChangeCalculationTypes("DIRECT_PRICE")} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="costCalculation2">
                      Для прямого договора
                    </label>
                  </td>
                  <td>
                    <input id="AUCTION" type="radio" name="costCalculation"
                           onChange={() => this.onChangeCalculationTypes("AUCTION")} />
                  </td>
                </tr>
                </tbody>
              </table>
              {
                Object.keys(typesDocs).map((category, i) => {
                  let cat = typesDocs[category].map(field => {
                    return <BaseCheckbox key={field.id} className="checkbox-proposal" text={field.name}
                                         onChange={(e) => this.onChangeTypes(field.id, e.target.checked, category)} />
                  })

                  return (
                    <div key={i} className="proposal-list">
                      {cat}
                      <div className="request-fields">
                        {
                          requestFields[category].map(field => {
                            return (
                              <label key={field.id}>
                                {field.name}
                                <Input name={field.id}
                                       onChange={(e) => this.onChangeFields(field.id, e.target.value)} />
                              </label>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
              <Button onClick={this.onClickHandler}>lal</Button>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default UserProposal;