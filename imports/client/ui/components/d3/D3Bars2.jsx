import React, {Component} from 'react';
import * as d3 from 'd3';
import './D3Bars2.scss';

export default class D3Bars2 extends Component {
  componentDidMount() {
    //console.log("Iee");
    setTimeout(()=>{
      d3.select(".chart")
        .selectAll("div")
          .data(data)
        .enter().append("div")
          .style("width", d => d * 10 + "px")
          .text(d);
    }, 3000);
  }
  render() {
    return (
        <div className="D3Bars2">
          <div className="chart">
            <div style={{width: "40px"}}>4</div>
            <div style={{width: "80px"}}>8</div>
            <div style={{width: "150px"}}>15</div>
            <div style={{width: "160px"}}>16</div>
            <div style={{width: "230px"}}>23</div>
            <div style={{width: "420px"}}>42</div>
          </div>
        </div>
    );
  }
}
