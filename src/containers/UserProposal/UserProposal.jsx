import React from "react";
import { getTypes } from "../../services/UserProposalService";
import { typesDocs } from "../../form/formService";
import { requestFields } from "../../form/formService";
import BaseCheckbox from "../../components/UI/BaseCheckbox/BaseCheckbox";
import Input from "../../components/UI/Input/Input";
import "./style.scss";

function UserProposal() {
  getTypes().then((res) => {
    console.log("TYPES", res)
  }).catch((err) => {
    console.log(err);
  })


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
                  return <BaseCheckbox key={field.id} className="checkbox-proposal" text={field.name} />
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
                              <Input name={field.id} />
                            </label>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default UserProposal;