import React, {Component} from 'react';
import * as d3 from 'd3';

export default class D3Bars1 extends Component {
  componentDidMount() {
    //console.log("Iee");
    setTimeout(()=>{
      import './D3Bars1.scss';
    }, 3000);
  }
  render() {
    return (
        <div className="D3Bars1">
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
