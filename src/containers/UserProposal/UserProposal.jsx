import React, { useState } from "react";
import { getProposal, getTypes } from "../../services/UserProposalService";
import { typesDocs } from "../../form/formService";
import { requestFields } from "../../form/formService";
import BaseCheckbox from "../../components/UI/BaseCheckbox/BaseCheckbox";
import Input from "../../components/UI/Input/Input";
import "./style.scss";
import Button from "../../components/UI/Button/Button";

const initialTypes = {
  types: [],
  fields: {},
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


function UserProposal() {
  // getTypes().then((res) => {
  //   console.log("TYPES", res)
  // }).catch((err) => {
  //   console.log(err);
  // })
  //
  // getProposal().then((res) => {
  //   console.log("Proposal", res)
  // }).catch((err) => {
  //   console.log(err);
  // })

  const [types, setTypes] = useState(initialTypes);

  const onChangeTypes = (type, value, category) => {
    setTypes(prevState => {
      if (value) {
        prevState.types.push(type);
      } else {
        prevState.types = prevState.types.filter(item => item !== type);
      }
      return prevState;
    });
  }

  const onChangeFields = (field, value) => {
    setTypes(prevState => {
      prevState.fields[field] = value;
      return prevState;
    });
  }

  const onClickHandler = () => {
    console.log(types);
  }

  return (
    <main>
      <div className="container">
        <div className="user-proposal__inner">
          <div className="user-proposal__inner-fields">
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
                  <input id="costCalculation1" type="radio" name="costCalculation" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="costCalculation2">
                    Для прямого договора
                  </label>
                </td>
                <td>
                  <input id="costCalculation2" type="radio" name="costCalculation" />
                </td>
              </tr>
              </tbody>
            </table>
            {
              Object.keys(typesDocs).map((category, i) => {
                let cat = typesDocs[category].map(field => {
                  return <BaseCheckbox key={field.id} className="checkbox-proposal" text={field.name}
                                       onChange={(e) => onChangeTypes(field.id, e.target.checked, category)} />
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
                              <Input name={field.id} onChange={(e) => onChangeFields(field.id, e.target.value)} />
                            </label>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
            <Button onClick={onClickHandler}>lal</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default UserProposal;