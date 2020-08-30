import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import { getStageControls } from "../../form/formService";
import './style.scss';
import Table from "../../components/Table/Table";
import { getStages, setStages } from "../../services/StagesService";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { ADMIN, ROLE } from "../../services/ApiConstants";

class PersonalArea extends Component {

  state = {
    stageControls: [...getStageControls()],
    isPlanned: true,
    header: "Плановая таблица",
    isUser: true,
  }

  dataHandler = () => {
    setStages(this.state.stageControls).then(res => {
      alert("success");
    }).catch(err => {
      alert("error");
    })
  }

  componentDidMount() {
    if (Cookies.get(ROLE) === ADMIN) {
      this.setState({ isUser: false });
    } else {
      getStages().then(res => {
        if (res.data.length > 0)
          this.setState({ stageControls: res.data });
      }).catch(err => {
        alert(err.message);
      });
    }
  }

  setPlanned = () => {
    this.setState({ isPlanned: true, header: "Плановая таблица" })
  }

  setFact = () => {
    this.setState({ isPlanned: false, header: "Фактическая таблица" })
  }

  onChangeHandler = (value, type, index) => {
    const stages = [...this.state.stageControls];
    const typeOfTable = this.state.isPlanned ? 'planned' : 'fact';
    stages[index][typeOfTable][type] = value;
    this.setState({ stageControls: stages });
  }

  render() {
    return (
      <>
        <main>
          <div className="personal-area__container">
            <nav className="personal-area__nav">
              <Button type='primary' onClick={this.setPlanned}>Плановая таблица</Button>
              <Button type='primary' onClick={this.setFact}>Фактическая таблица</Button>
              <Link className="personal-area__link" to={"/account/gantt"}>
                График
              </Link>
              <Link className="personal-area__link" to={"/account/proposal"}>
                Коммерческое предложение
              </Link>
            </nav>
            <h2 className="graphic-header">{this.state.header}</h2>
            <div className="personal-area__table-container">
              <Table stageControls={this.state.stageControls} onChangeHandler={this.onChangeHandler}
                     isPlanned={this.state.isPlanned} />
            </div>
            {this.state.isUser && (
              <div className="save-btn__container">
                <Button onClick={this.dataHandler} disabled={false}>Сохранить</Button>
              </div>
            )}

          </div>
        </main>
      </>
    );
  }
}

export default PersonalArea;