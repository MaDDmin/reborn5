import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import jQuery from 'meteor/jquery';

export default class RutinaSingle extends Component{
  toggleChecked(){
    Meteor.call('rutines.update', this.props.rutina);
  }
  deleteRutina(){
    Meteor.call('rutines.delete', this.props.rutina);
  }
  render(){
    const rutinaClass = this.props.rutina.completed ? "checked" : "";
    //const status = this.props.client.completed ? <span className="spnCompleted">Completed</span> : "";

    return (
      <li className={rutinaClass}>
        <a className="aSingleRutina" href={"rutina/"+this.props.rutina._id}>{this.props.rutina.rutinaNom }</a>
        <button
          className="btDeleteRutina"
          onClick={this.deleteRutina.bind(this)}
        >
          &times;
        </button>
      </li>
    );
  }
}
