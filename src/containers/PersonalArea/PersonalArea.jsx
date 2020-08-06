import React, {Component} from "react";
import Button from "../../components/UI/Button/Button";
import {getStageControls} from "../../form/formService";

class PersonalArea extends Component {

    state = {
        stageControls: {...getStageControls()},
    }

    dataHandler = () => {
        console.log(this.state.stageControls)

        alert('asdf: ' + this.state.value)
    }

    componentDidMount() {
        console.log(this.state.stageControls)
    }

    render() {
        return (
            <>
                <main>

                    <Button onClick={this.dataHandler} disabled={false}>click</Button>
                </main>
            </>
        );
    }
}

export default PersonalArea;