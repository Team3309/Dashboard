import React, { Component, PropTypes } from 'react'
import {StyleRoot} from 'radium';
import { connect } from 'react-redux'
import {Link} from 'react-router'
import {Tabs, Tab} from 'material-ui/Tabs'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PIDView from "./PIDView";
import {initWebSocket} from '../robot'
import update from 'react-addons-update';

const styles = {
  leftNav: {
    marginTop: 64
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tables: [],
      navOpen: false,
      navTitle: 'Dashboard',
      value: 'a'
    };
    initWebSocket(this.updateState, this.handleOpen, this.handleClose);
  };

  handleOpen = () => {
    this.setState({socketConnected : true});
  };

  handleClose = () => {
    this.setState({socketConnected : false});
  };

  updateState = (table, key, value) => {
    // console.log("table: " + table, "key: " + key, "value: " + value);
    console.log(this.state.tables);

    var newTables = this.state.tables;

    if (!newTables[table]) {
      newTables[table] = {};
    }

    if (!newTables[table][key]) {
      newTables[table][key] = [];
    }

    newTables[table][key].push(value);

    this.setState({
      tables: newTables
    });
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log(nextProps.location.pathname);
  };

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    d3.selectAll("svg > *").remove();
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      var propsForChild = Object.assign({}, this.props);
      var objects = ["Hello", "PID1", "PID2", "PID3", "PID4", "PID5"];
      return (  <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
        {objects.map(function(object){
          return (<Tab label={object} value={object} key={object}>
            <PIDView chartID={object}/>
          </Tab>);
        })}

        </Tabs>);
    });

    return (
      <MuiThemeProvider>
        <StyleRoot>
          <div style={{width: '100%', height: '100%'}}>
            {this.state.socketConnected ? "Connected" : "Disconnected"}
            {childrenWithProps}
          </div>
        </StyleRoot>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  //TODO: this might be gross, will have to investigate more
  return Object.assign({}, state, {});
}

App.defaultProps = {
  socketConnected: false
};

export default connect(mapStateToProps)(App);
