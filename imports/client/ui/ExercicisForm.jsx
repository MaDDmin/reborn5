import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';

export default class ExercicisForm extends Component{
  addExercici(event){
    event.preventDefault();
    let exerciciNom = this.refs.exerciciNom.value.trim(),
      exerciciDescripcio = this.refs.exerciciDescripcio.value.trim();

    if (exerciciNom){
      Meteor.call('exercicis.insert', exerciciNom, exerciciDescripcio, (error, data)=>{
        if (error){
          Bert.alert("Logueja't abans d'introduir dades.", "danger", "fixed-top", "fa-frown-o");
        }else{
          this.refs.exerciciNom.value = "";
          this.refs.exerciciDescripcio.value = "";
        }
      });
    }
  }
  render(){
    return (
      <div id="divExercicisForm">
        <h2>Nou Exercici</h2>
        <form className="nouexercici" onSubmit={this.addExercici.bind(this)}>
          <input
            type="text"
            ref="exerciciNom"
            placeholder="Nom"
          />
          <textarea
            ref="exerciciDescripcio"
            placeholder="Descripció de l'exercici"
          />
          <input
            type="submit"
            ref="exerciciSubmit"
            value="Introduir"
          />
        </form>
      </div>
    );
  }
};
