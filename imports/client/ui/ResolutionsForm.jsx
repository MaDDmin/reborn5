import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import ReactDOM from 'react-dom';

export default class ResolutionsForm extends Component{
  addResolution(event){
    event.preventDefault();
    let text = this.refs.resolution.value.trim();

    Meteor.call('resolutions.insert', text, ()=>{
      this.refs.resolution.value = "";
    });
  }
  render(){
    return (
      <div id="divResolutionsForm">
        <h2>My Resolutions</h2>
        <form className="new-resolution" onSubmit={this.addResolution.bind(this)}>
          <input
            type="text"
            ref="resolution"
            placeholder="Nova resolució"
          />
        </form>
      </div>
    );
  }
};
