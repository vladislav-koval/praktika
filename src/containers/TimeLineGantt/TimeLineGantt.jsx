import React from "react";
import "./style.scss";
import TimeLine from "react-gantt-timeline";

class TimeLineGantt extends React.Component{
  // let d1 = new Date();
  // let d2 = new Date();
  // d2.setDate(d2.getDate() + 5);
  // let d3 = new Date();
  // d3.setDate(d3.getDate() + 8);
  // let d4 = new Date();
  // d4.setDate(d4.getDate() + 20);
  // const data = [
  //   {
  //     id: 1,
  //     start: d1,
  //     end: d2,
  //     name: "Demo Task 1"
  //   },
  //   {
  //     id: 2,
  //     start: d3,
  //     end: d4,
  //     name: "Demo Task 2",
  //     color: "orange"
  //   }
  // ];
  constructor(props) {
    super(props);
    let d1 = new Date();
    let d2 = new Date();
    d2.setDate(d2.getDate() + 5);
    let d3 = new Date();
    d3.setDate(d3.getDate() + 8);
    let d4 = new Date();
    d4.setDate(d4.getDate() + 20);
    this.data = [
      {
        id: 1,
        start: d1,
        end: d2,
        name: "task 1"
      },
      {
        id: 2,
        start: d3,
        end: d4,
        color: "orange",
        name: "task 2"
      }
    ];
    this.links = [{ id: 1, start: 1, end: 2 }];
  }
  render() {
    return (
      <main>
        <div className="gantt__container">
          <TimeLine data={this.data} links={this.links} nonEditable={true} nonEditableName={true}
          />
        </div>
      </main>
    )
  }


}

export default TimeLineGantt;