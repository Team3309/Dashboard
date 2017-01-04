import React, { Component, PropTypes } from 'react'
import {StyleRoot} from 'radium';
import { connect } from 'react-redux'
import {Link} from 'react-router'

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
    }
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log(nextProps.location.pathname);
    nextState.inScoutMode = nextProps.location.pathname.indexOf('scout') > -1;
  };

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      var propsForChild = Object.assign({}, this.props);
      return React.cloneElement(child, propsForChild);
    });

    return (
      <StyleRoot>
        <div style={{width: '100%', height: '100%'}}>
          {childrenWithProps}
        </div>
      </StyleRoot>
    );
  }
}

function mapStateToProps(state) {
  //TODO: this might be gross, will have to investigate more
  return Object.assign({}, state, {});
}

App.defaultProps = {gameMode: 'Auto'};

export default connect(mapStateToProps)(App);