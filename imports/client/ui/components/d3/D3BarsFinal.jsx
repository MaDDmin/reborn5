import React, {Component} from 'react';
import * as d3 from 'd3';
import './D3BarsFinal.scss';
import _ from 'lodash';

export default class D3BarsFinal extends Component {
  constructor(){
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.barsUpdate = this.barsUpdate.bind(this);

    this.margin = {top: 20, right: 30, bottom: 30, left: 40};
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  barsUpdate() {
    let x = d3.scaleBand()
      .rangeRound([0, this.width])
      .padding(.1);

    let y = d3.scaleLinear()
      .range([this.height, 0]);

    let xAxis = d3.axisBottom()
      .scale(x);

    let yAxis = d3.axisLeft()
      .scale(y)
      .ticks(10, "%");

    let chart = d3.select(".chart")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    function type(d) {
      d.value = Number(d.value); // coerce to number
      return d;
    }

    d3.tsv("D3BarsFinal.tsv", type,
      (error, data) => {
        x.domain(data.map(d => d.name));
        y.domain([0, d3.max(data, d => d.value)]);

        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(xAxis);

        chart.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");


        chart.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.value))
            .attr("height", d => this.height - y(d.value))
            .attr("width", x.bandwidth());



        // var bar = chart.selectAll("g")
        //     .data(data)
        //   .enter().append("g")
        //     .attr("transform", d => "translate(" + x(d.name) + ",0)");
        //
        // bar.append("rect")
        //     .attr("y", d => y(d.value))
        //     .attr("height", d => this.height - y(d.value))
        //     .attr("width", x.bandwidth());
        //
        // bar.append("text")
        //     .attr("x", x.bandwidth() / 2)
        //     .attr("y", d => y(d.value) + 3)
        //     .attr("dy", ".75em")
        //     .text(d => d.value);
        });
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
          <svg className="chart"></svg>

          <div className="addBar">
            <input type="text" ref={input => this.barInput = input}/>
            <button onClick={this.handleButtonClick}>Inclou el valor</button>
          </div>
        </div>
    );
  }
}
