import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';
import PujaArxius from './PujaArxius.jsx';

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
            autoFocus={true}
            style={{
                display: "inline-block",
                width: "40%"
            }}
          />
          <textarea
            ref="grupMuscularDescripcio"
            placeholder="Descripció del grup muscular"
            style={{
                display: "inline-block",
                width: "40%"
            }}
          />

          {/*// Introduir arxius i imatges. Cal fer un bon component que puga ser reutilitzat.*/}
          <PujaArxius />

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
