import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';

export default class RutinesForm extends Component{
  addRutina(event){
    event.preventDefault();
    let rutinaNom = this.refs.rutinaNom.value.trim(),
      rutinaDescripcio = this.refs.rutinaDescripcio.value.trim();

    if (rutinaNom){
      Meteor.call('rutines.insert', rutinaNom, rutinaDescripcio, (error, data)=>{
        if (error){
          Bert.alert("Logueja't abans d'introduir dades.", "danger", "fixed-top", "fa-frown-o");
        }else{
          this.refs.rutinaNom.value = "";
          this.refs.rutinaDescripcio.value = "";
        }
      });
    }
  }
  render(){
    return (
      <div id="divRutinesForm">
        <h2>Nova Rutina</h2>
        <form className="novarutina" onSubmit={this.addRutina.bind(this)}>
          <input
            type="text"
            ref="rutinaNom"
            placeholder="Nom"
          />
          <textarea
            ref="rutinaDescripcio"
            placeholder="Descripció de la rutina"
          />
          <input
            type="submit"
            ref="rutinaSubmit"
            value="Introduir"
          />
        </form>
      </div>
    );
  }
};
