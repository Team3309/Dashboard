import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs'
import PIDLineChart from "./PIDLineChart"
import * as d3 from "d3";
;


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};



export default class PIDView extends Tab {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {

    this.setState({
      value: value,
    });
  };

  clearChart() {
    this.setState({lineData:[]});
  }

  render() {
    return (
        <div onChange={this.handleChange}>
          <h2 style={styles.headline}>Drive</h2>
          <PIDLineChart chartID={this.props.chartID + "-P"} />
          <PIDLineChart chartID={this.props.chartID + "-I"} />
          <PIDLineChart chartID={this.props.chartID + "-D"} />
          <PIDLineChart chartID={this.props.chartID + "-err"} />
          kP<input type="text" id={this.props.chartID + "-kP"} value="0.0"></input>
          kI<input type="text" id={this.props.chartID + "-kI"} value="0.0"></input>
          kD<input type="text" id={this.props.chartID + "-kD"} value="0.0"></input>
          <button onClick={this.clearChart.bind(this)} >Click me</button>
        </div>

    );
  }



}
