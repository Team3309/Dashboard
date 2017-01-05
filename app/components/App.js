import React, { Component, PropTypes } from 'react'
import {StyleRoot} from 'radium';
import { connect } from 'react-redux'
import {Link} from 'react-router'
import {Tabs, Tab} from 'material-ui/Tabs'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PIDView from "./PIDView";
import {initWebSocket} from '../robot'

const styles = {
  leftNav: {
    marginTop: 64
  }
};

// @ThemeDecorator(ThemeManager.getMuiTheme(CustomTheme))
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navOpen: false,
      navTitle: 'Dashboard',
      value: 'a',
    }
    initWebSocket(this.props);
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log(nextProps.location.pathname);
    nextState.inScoutMode = nextProps.location.pathname.indexOf('scout') > -1;
  };

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      var propsForChild = Object.assign({}, this.props);
      var objects = ["Hello", "PID1", "PID2", "PID3"];
      return (  <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
        {objects.map(function(object){
          return (<Tab label={object} value={object} key={object}>
            <PIDView/>
          </Tab>);
        })}

        </Tabs>);
    });

    return (
      <MuiThemeProvider>
        <StyleRoot>
          <div style={{width: '100%', height: '100%'}}>
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

App.defaultProps = {tables: []};

export default connect(mapStateToProps)(App);
