import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import jQuery from 'meteor/jquery';

export default class GrupMuscularSingle extends Component{
  toggleChecked(){
    Meteor.call('grups_musculars.update', this.props.grup_muscular);
  }
  deleteGrupMuscular(){
    Meteor.call('grups_musculars.delete', this.props.grup_muscular);
  }
  render(){
    const grupMuscularClass = this.props.grup_muscular.completed ? "checked" : "";
    //const status = this.props.client.completed ? <span className="spnCompleted">Completed</span> : "";

    return (
      <li className={grupMuscularClass}>
        <a className="aSingleGrupMuscular" href={"grup_muscular/"+this.props.grup_muscular._id}>{this.props.grup_muscular.grupMuscularNom }</a>
        <button
          className="btDeleteGrupMuscular"
          onClick={this.deleteGrupMuscular.bind(this)}
        >
          &times;
        </button>
      </li>
    );
  }
}
