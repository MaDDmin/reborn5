import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import jQuery from 'meteor/jquery';

export default class ResolutionSingle extends Component{
  toggleChecked(){
    Meteor.call('resolutions.update', this.props.resolution);
  }
  deleteResolution(){
    Meteor.call('resolutions.delete', this.props.resolution);
  }
  render(){
    const resolutionClass = this.props.resolution.completed ? "checked" : "";
    const status = this.props.resolution.completed ? <span className="spnCompleted">Completed</span> : "";

    return (
      <li className={resolutionClass}>
        <input
          className="chkCompletedResolution"
          ref="chkCompletedResolution"
          key={this.props.resolution._id}
          type="checkbox"
          readOnly={true}
          checked={this.props.resolution.completed}
          onClick={this.toggleChecked.bind(this)}
        />
        <a className="aSingleResolution" href={"resolution/"+this.props.resolution._id}>{this.props.resolution.text}</a>
        {status}
        <button
          className="btDeleteResolution"
          onClick={this.deleteResolution.bind(this)}
        >
          &times;
        </button>
      </li>
    );
  }
}
