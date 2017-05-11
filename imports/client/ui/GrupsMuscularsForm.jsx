import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';

export default class GrupsMuscularsForm extends Component{
  addGrupMuscular(event){
    event.preventDefault();
    let grupMuscularNom = this.refs.grupMuscularNom.value.trim(),
      grupMuscularDescripcio = this.refs.grupMuscularDescripcio.value.trim();

    if (grupMuscularNom){
      Meteor.call('grups_musculars.insert', grupMuscularNom, grupMuscularDescripcio, (error, data)=>{
        if (error){
          Bert.alert("Logueja't abans d'introduir dades.", "danger", "fixed-top", "fa-frown-o");
        }else{
          this.refs.grupMuscularNom.value = "";
        }
      });
    }
  }
  render(){
    return (
      <div id="divGrupsMuscularsForm">
        <h2>Nou Grup Muscular</h2>
        <form className="nou_grup_muscular" onSubmit={this.addGrupMuscular.bind(this)}>
          <input
            type="text"
            ref="grupMuscularNom"
            placeholder="Nom"
          />
          <textarea
            ref="grupMuscularDescripcio"
            placeholder="Descripció del grup muscular"
          />
          <input
            type="submit"
            ref="grupMuscularSubmit"
            value="Introduir"
          />
        </form>
      </div>
    );
  }
};
