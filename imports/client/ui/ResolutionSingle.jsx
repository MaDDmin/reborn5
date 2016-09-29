import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';

export default class ResolutionSingle extends Component{
  toggleChecked(){
    Meteor.call('resolutions.update', this.props.resolution._id, this.props.resolution.completed);
  }
  deleteResolution(){
    Meteor.call('resolutions.delete', this.props.resolution._id);
  }
  render(){
    return (
      <li>
        <input
          className="chkCompletedResolution"
          ref="chkCompletedResolution"
          key={this.props.resolution._id}
          type="checkbox"
          readOnly={true}
          checked={this.props.resolution.completed}
          onClick={this.toggleChecked.bind(this)}
        />
        {this.props.resolution.text}
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
