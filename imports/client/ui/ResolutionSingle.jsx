import React, {Component} from 'react';

export default class ResolutionSingle extends Component{
  render(){
    return (
      <li>{this.props.resolution.text}-{this.props.resolution.completed}</li>
    );
  }
}
