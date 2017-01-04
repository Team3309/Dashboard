import React, {Component, PropTypes} from 'react'

const styles = {
  root: {
    height: "calc(100vh - 180px)"
  },
  header: {
    height: 16,
    marginLeft: 16
  }
};

class Dash extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div style={styles.root}>
        <h3 style={styles.header}>Dashboard</h3>
      </div>
    );
  }
}

export default Dash;