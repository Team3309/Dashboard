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

  render() {
    return (

        <div>
          <h2 style={styles.headline}>Drive</h2>
          <p>
            <PIDLineChart/>
          </p>
        </div>

    );
  }
}
