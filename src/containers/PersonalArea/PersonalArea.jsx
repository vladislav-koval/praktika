import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import { getStageControls } from "../../form/formService";
import './style.scss';
import Table from "../../components/Table/Table";

class PersonalArea extends Component {

  state = {
    stageControls: [...getStageControls()],
    isPlanned: true,
    header: "Плановая таблица",
  }

  dataHandler = () => {
    console.log(this.state.stageControls)
  }

  componentDidMount() {
    console.log(this.state.stageControls)
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
          <h2 className="graphic-header">{this.state.header}</h2>
          <Table stageControls={this.state.stageControls} onChangeHandler={this.onChangeHandler}
                 isPlanned={this.state.isPlanned} />

          <Button onClick={this.dataHandler} disabled={false}>click</Button>
        </main>
      </>
    );
  }
}

export default PersonalArea;