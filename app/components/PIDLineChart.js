import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Grid, Row, Col} from 'react-flexbox-grid/lib';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};



export default class PIDLineChart extends React.Component {
  curX = 2;
  lineData = {x:0, y:1};
  constructor(props, lineData) {
    super(props);
    // console.log(this.props);
    this.lineData = lineData;
    this.state = {
      value: 'a',
    };

  }

  handleChange = (value) => {
    console.log("LOL");
  };

  render() {
    this.curX++;


    var vis = d3.select('#'+this.props.chartID),
    WIDTH = 300,
    HEIGHT = 150,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },
    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(this.lineData, function(d) {
      return d.x;
    }), d3.max(this.lineData, function(d) {
      return d.x;
    })]),
    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(this.lineData, function(d) {
      return d.y;
    }), d3.max(this.lineData, function(d) {
      return d.y;
    })]),

    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),
    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient('left')
      .tickSubdivide(true);

      vis.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
      .call(xAxis);

      vis.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
      .call(yAxis);

      var lineFunc = d3.svg.line()
  .x(function(d) {
    return xRange(d.x);
  })
  .y(function(d) {
    return yRange(d.y);
  })
  .interpolate('linear');

  vis.append('svg:path')
  .attr('d', lineFunc(this.lineData))
  .attr('stroke', 'blue')
  .attr('stroke-width', 2)
  .attr('fill', 'none');


    return (
        <svg id={this.props.chartID} width="300" height="150"></svg>
    );
  }
}
