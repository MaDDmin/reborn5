import React, {Component} from 'react';
import * as d3 from 'd3';
import './D3Bars2.scss';

export default class D3Bars2 extends Component {
  constructor(){
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.barsUpdate = this.barsUpdate.bind(this);
    this.data = [4, 8, 15, 16, 18, 23, 42];
  }

  barsUpdate() {
    // Perform the data join
    var selection = d3.select('.chart')
      .selectAll('div')
      .data(this.data);

    // Remove surplus elements
    selection.exit()
      .remove();

    // Add new elements
    selection.enter()
      .append('div')
      .style("width", d => d * 10 + "px")
      .text(d => d);

    // Update existing AND new elements
    selection
      .style("width", d => d * 10 + "px")
      .text(d => d);
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
        <div className="D3Bars2">
          <div className="chart">
          </div>
          <div className="addBar">
            <input type="text" ref={input => this.barInput = input}/>
            <button onClick={this.handleButtonClick}>Inclou el valor</button>
          </div>
        </div>
    );
  }
}
