import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import { getStageControls } from "../../form/formService";
import './style.scss';
import Table from "../../components/Table/Table";
import { getStages, setStages } from "../../services/StagesService";

class PersonalArea extends Component {

  state = {
    stageControls: [...getStageControls()],
    isPlanned: true,
    header: "Плановая таблица",
  }

  dataHandler = () => {
    setStages(this.state.stageControls).then(res => {
      alert("success");
    }).catch(err => {
      alert("error");
    })
  }

  componentDidMount() {
    getStages().then(res => {
      this.setState({ stageControls: res.data });
    }).catch(err => {
      alert(err.message);
    })
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
            </nav>
            <h2 className="graphic-header">{this.state.header}</h2>
            <Table stageControls={this.state.stageControls} onChangeHandler={this.onChangeHandler}
                   isPlanned={this.state.isPlanned} />

            <Button onClick={this.dataHandler} disabled={false}>Сохранить</Button>
          </div>
        </main>
      </>
    );
  }
}

export default PersonalArea;