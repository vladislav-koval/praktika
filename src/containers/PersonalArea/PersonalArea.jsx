import React, {Component} from "react";
import Button from "../../components/UI/Button/Button";
import {getStageControls} from "../../form/formService";
import ElementGraphics from "../../components/ElementGraphics/ElementGraphics";
import Table from "../../components/Table/Table";

class PersonalArea extends Component {

    state = {
        stageControls: [...getStageControls()],
    }

    dataHandler = () => {
        console.log(this.state.stageControls)
    }

    componentDidMount() {
        console.log(this.state.stageControls)
    }

    onChangeHandler = (value, type, index) => {
        const stages = [...this.state.stageControls];
        stages[index][type].value = value;
        this.setState({stageControls: stages});
    }

    render() {
        return (
            <>
                <main>
                    <Table stageControls={this.state.stageControls} onChangeHandler={this.onChangeHandler}/>

                    <Button onClick={this.dataHandler} disabled={false}>click</Button>
                </main>
            </>
        );
    }
}

export default PersonalArea;