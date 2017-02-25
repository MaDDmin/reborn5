import React, {Component} from 'react';
import * as d3 from 'd3';
import './D3BarsFinal.scss';
import _ from 'lodash';

export default class D3Circles extends Component {
  constructor(){
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.barsUpdate = this.barsUpdate.bind(this);

    this.margin = {top: 20, right: 30, bottom: 30, left: 40};

  }

  barsUpdate() {
    let svg = d3.select("svg"),
      circle = svg.selectAll("circle")
          //.attr("r", 30)
    //circle.attr("cx", () => Math.random() * 720);
          .data([32, 57, 112, 293]),
      circleEnter = circle.enter()
        .append("circle")
          .style("fill", "steelblue")
          .attr("cy", 60)
          .attr("cx", (d, i) => i * 100 + 30)
          .attr("r", d => Math.sqrt(d))
          .data([32, 57, 293], d => d)
          .exit().remove();
  }

  componentDidMount() {
    //console.log("Iee");
    setTimeout(()=>{
      this.barsUpdate();
    }, 300);
  }

  handleButtonClick() {
  //  alert(`this.barInput.value: ${this.barInput.value}`);
    this.data.push(Number(this.barInput.value));
    this.barsUpdate();
  //  alert(`this.data: ${JSON.stringify(this.data)}`);
  }

  render() {
    return (
        <div className="D3Circles">
          <svg width="720" height="120"></svg>
        </div>
    );
  }
}
