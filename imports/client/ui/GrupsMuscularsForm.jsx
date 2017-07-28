import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';

export default class GrupsMuscularsForm extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }

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
          this.refs.grupMuscularDescripcio.value = "";
        }
      });
    }
  }

  render() {
    if (!this.props.active){
      return null;
    }
    return (
      <div id="divGrupsMuscularsForm">
        <h2>Nou Grup Muscular</h2>
        <form className="nougrupmuscular" onSubmit={this.addGrupMuscular.bind(this)}>
          <input
            type="text"
            ref="grupMuscularNom"
            placeholder="Nom"
            autoFocus
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
