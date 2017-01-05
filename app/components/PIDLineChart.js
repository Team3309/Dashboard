import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class PIDView extends React.Component {
  lineData = [{
    x: 1,
    y: 5
  }];
  curX = 2;
  constructor(props) {
    super(props);

    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {

  };

  render() {
    this.curX++;
    this.lineData.push({
      x: this.curX,
      y: 6
    });
    d3.selectAll("svg > *").remove();
    var vis = d3.select('#visualisation'),
    WIDTH = 1000,
    HEIGHT = 500,
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
      <svg id="visualisation" width="1000" height="500"></svg>

    );
  }
}