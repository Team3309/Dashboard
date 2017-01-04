import React, { Component, PropTypes } from 'react'
import {StyleRoot} from 'radium';
import { connect } from 'react-redux'
import {Link} from 'react-router'
import {Tabs, Tab} from 'material-ui/Tabs';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import ThemeManager from 'material-ui/lib/styles/theme-manager';
// import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
// import CustomTheme from '../theme';

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
      return (  <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="Drive" value="a" >
            <div>
              <h2 style={styles.headline}>Drive</h2>
              <p>
                PID IS FUN
              </p>
            </div>
          </Tab>
          <Tab label="Intake" value="b">
            <div>
              <h2 style={styles.headline}>Intake</h2>
              <p>
                PID LAWL
              </p>
            </div>
          </Tab>
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

App.defaultProps = {gameMode: 'Auto'};

export default connect(mapStateToProps)(App);
