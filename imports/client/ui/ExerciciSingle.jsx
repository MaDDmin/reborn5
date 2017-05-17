import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import jQuery from 'meteor/jquery';

export default class ExerciciSingle extends Component{
  toggleChecked(){
    Meteor.call('exercicis.update', this.props.exercici);
  }
  deleteExercici(){
    Meteor.call('exercicis.delete', this.props.exercici);
  }
  render(){
    const exerciciClass = this.props.exercici.completed ? "checked" : "";
    //const status = this.props.client.completed ? <span className="spnCompleted">Completed</span> : "";

    return (
      <li className={exerciciClass}>
        <a className="aSingleExercici" href={"exercici/"+this.props.exercici._id}>{this.props.exercici.exerciciNom }</a>
        <button
          className="btDeleteExercici"
          onClick={this.deleteExercici.bind(this)}
        >
          &times;
        </button>
      </li>
    );
  }
}
