import React from "react";
import {
  getProposal,
  getProposalDoc,
  setProposal,
  validateProposalPostRequest
} from "../../services/UserProposalService";
import { typesDocs } from "../../form/formService";
import { requestFields } from "../../form/formService";
import BaseCheckbox from "../../components/UI/BaseCheckbox/BaseCheckbox";
import Input from "../../components/UI/Input/Input";
import "./style.scss";
import Button from "../../components/UI/Button/Button";
import Notification from "../Notification/Notification";
import { Link } from "react-router-dom";

class UserProposal extends React.Component {
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

      initialCategories: {
        category1: 0,
        category2: 0,
        category3: 0,
      },

      notification: {
        show: false,
        header: "",
        message: "",
      }
    }
  }

  componentDidMount() {
    getProposal().then((res) => {
      const data = res.data;
      this.setState({
        name: data.name,
        nameGenitive: data.nameGenitive,
        orgName: data.orgName,
        phone: data.phone,
        email: data.email,
        calculationType: data.calculationType.id,
      })
    }).catch((err) => {
      this.setState({ notification: { show: true, header: "Ошибка", message: err } });
    })
  }

  onChangeTypes = (type, value, category) => {
    const temp = { ...this.state };
    if (value) {
      temp.types.push(type);
      temp.initialCategories[category]++;
    } else {
      temp.types = temp.types.filter(item => item !== type);
      temp.initialCategories[category]--;
    }
    this.setState(temp);
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
    const err = validateProposalPostRequest(this.state);
    if (err) {
      this.setState({ notification: { show: true, header: "Ошибка", message: err } });
    } else {
      setProposal(this.state).then(() => {
        this.setState({ notification: { show: true, header: "Успех", message: "Данные успешно отправленны" } });
      }).catch(err => {
        this.setState({ notification: { show: true, header: "Ошибка", message: err.message } });
      })
    }
  }

  onCloseNotification = () => {
    this.setState({ notification: { show: false } });
  }

  render() {
    return (
      <main>
        <div className="container">
          <div className="user-proposal__buttons">
            <Link className="personal-area__link" to={"/account"}>
              Таблицы
            </Link>
            <Link className="personal-area__link" to={"/account/gantt"}>
              График
            </Link>
          </div>
          <div className="user-proposal__help">
            {"Поля обозначеные звездочкой обязательные. Так-же нужно выбрать хотябы один тип документа"}
          </div>
          <div className="user-proposal__inner">
            <div className="user-proposal__inner-fields">
              <Input label="ФИО в И.П." value={this.state.name}
                     onChange={(e) => this.onChangeInput("name", e.target.value)} required={true} />
              <Input label="ФИО в р.п." value={this.state.nameGenitive}
                     onChange={(e) => this.onChangeInput("nameGenitive", e.target.value)} required={true} />
              <Input label="Название организации" value={this.state.orgName}
                     onChange={(e) => this.onChangeInput("orgName", e.target.value)} required={true} />
              <Input label="Телефон" value={this.state.phone}
                     onChange={(e) => this.onChangeInput("phone", e.target.value)} required={true} />
              <Input label="Электронная почта" value={this.state.email}
                     onChange={(e) => this.onChangeInput("email", e.target.value)} required={true} />

              <table className="cost-calculation">
                <thead>
                <tr>
                  <td>
                    <h3>Расчет стоймости<span className="cost-calculation__required">*</span></h3>
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
                    <input id="AUCTION" type="radio" name="costCalculation"
                           checked={this.state?.calculationType === "AUCTION"}
                           onChange={() => this.onChangeCalculationTypes("AUCTION")} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="costCalculation2">
                      Для прямого договора
                    </label>
                  </td>
                  <td>
                    <input id="DIRECT_PRICE" type="radio" name="costCalculation"
                           checked={this.state?.calculationType === "DIRECT_PRICE"}
                           onChange={() => this.onChangeCalculationTypes("DIRECT_PRICE")} />
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
                      {this.state.initialCategories[category] > 0 &&
                      <div className="request-fields">
                        {
                          requestFields[category].map(field => {
                            return (
                              <label key={field.id}>
                                {field.name} <span className="request-fields__required">*</span>
                                <Input name={field.id}
                                       onChange={(e) => this.onChangeFields(field.id, e.target.value)} />
                              </label>
                            )
                          })
                        }
                      </div>
                      }
                    </div>
                  )
                })
              }
              <Button onClick={this.onClickHandler}>Отправить</Button>
            </div>
          </div>
        </div>
        {this.state.notification.show &&
        <Notification header={this.state.notification.header} message={this.state.notification.message}
                      onClose={this.onCloseNotification} />
        }
      </main>
    )
  }
}

export default UserProposal;