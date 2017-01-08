import React, {Component} from 'react';
import * as d3 from 'd3';
import './D3Bars3.scss';
import _ from 'lodash';

export default class D3Bars3 extends Component {
  constructor(){
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.barsUpdate = this.barsUpdate.bind(this);
    this.data = [4, 8, 15, 16, 18, 23, 42];
    this.width = 666;
    this.barHeight = 20;
  }

  barsUpdate() {
    let x = d3.scaleLinear()
      .domain([0, d3.max(this.data)])
      .range([0, this.width]);


    var chart = d3.select(".chart")
      .attr("width", this.width)
      .attr("height", this.barHeight * this.data.length);

    // Data join and Enter
    var bar = chart.selectAll("g")
        .data(this.data)
      .enter().append("g")
        .attr("transform", (d, i) => "translate(0," + i * this.barHeight + ")");

    // Update
    bar.append("rect")
        .attr("width", x)
        .attr("height", this.barHeight - 1);

    bar.append("text")
        .attr("x", d => x(d) - 3)
        .attr("y", this.barHeight / 2)
        .attr("dy", ".35em")
        .text(d => d);

    //
    //
    // // Perform the data join
    // let selection = d3.select('.chart')
    //   .selectAll('div')
    //   .data(_.sortBy(this.data));
    //
    // // Remove surplus elements
    // selection.exit()
    //   .remove();
    //
    // // Add new elements
    // selection.enter()
    //   .append('div')
    //   .style("width", d => x(d) +"px")
    //   .text(d => d);
    //
    // // Update existing AND new elements
    // selection
    //   .style("width", d => x(d) +"px")
    //   .text(d => d);
  }

  componentDidMount() {
    //console.log("Iee");
    setTimeout(()=>{
      this.barsUpdate();
    }, 3000);
  }

  handleButtonClick() {
  //  alert(`this.barInput.value: ${this.barInput.value}`);
    this.data.push(Number(this.barInput.value));
    this.barsUpdate();
  //  alert(`this.data: ${JSON.stringify(this.data)}`);
  }

  render() {
    return (
        <div className="D3Bars3">
          <svg className="chart" width="420" height="120">
            {/* <g transform="translate(0,0)">
              <rect width="40" height="19"></rect>
              <text x="37" y="9.5" dy=".35em">4</text>
            </g>
            <g transform="translate(0,20)">
              <rect width="80" height="19"></rect>
              <text x="77" y="9.5" dy=".35em">8</text>
            </g>
            <g transform="translate(0,40)">
              <rect width="150" height="19"></rect>
              <text x="147" y="9.5" dy=".35em">15</text>
            </g>
            <g transform="translate(0,60)">
              <rect width="160" height="19"></rect>
              <text x="157" y="9.5" dy=".35em">16</text>
            </g>
            <g transform="translate(0,80)">
              <rect width="230" height="19"></rect>
              <text x="227" y="9.5" dy=".35em">23</text>
            </g>
            <g transform="translate(0,100)">
              <rect width="420" height="19"></rect>
              <text x="417" y="9.5" dy=".35em">42</text>
            </g> */}
          </svg>

          <div className="addBar">
            <input type="text" ref={input => this.barInput = input}/>
            <button onClick={this.handleButtonClick}>Inclou el valor</button>
          </div>
        </div>
    );
  }
}
