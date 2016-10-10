import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import ReactDOM from 'react-dom';
//import Bert from 'meteor/themeteorchef:bert';

export default class ResolutionsForm extends Component{
  addResolution(event){
    event.preventDefault();
    let text = this.refs.resolution.value.trim();
    
    if (text){
      Meteor.call('resolutions.insert', text, (error, data)=>{
        if (error){
          Bert.alert("Logueja't abans d'escriure una resolució.", "danger", "fixed-top", "fa-frown-o");
        }else{
          this.refs.resolution.value = "";
        }
      });
    }
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
