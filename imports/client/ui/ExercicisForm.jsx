import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';

//import GrupMuscularOpt from './GrupMuscularOpt.jsx';

//import '../../api/collections/GrupsMusculars.js';

export default class ExercicisForm extends Component{
  addExercici(event){
    event.preventDefault();
    let exerciciNom = this.refs.exerciciNom.value.trim(),
      exerciciGrupMuscular = this.refs.selGrupMuscular.selectedOptions[0].value,
      exerciciDescripcio = this.refs.exerciciDescripcio.value.trim(),
      exerciciSeriesDefault = this.refs.exerciciSeriesDefault.value.trim(),
      exerciciRepeticionsDefault = this.refs.exerciciRepeticionsDefault.value.trim(),
      exerciciDescansDefault = this.refs.exerciciDescansDefault.value.trim(),
      exerciciMinutsDefault = this.refs.exerciciMinutsDefault.value.trim();

    if (exerciciNom){
      Meteor.call('exercicis.insert', exerciciNom, exerciciGrupMuscular, exerciciDescripcio, exerciciSeriesDefault, exerciciRepeticionsDefault, exerciciDescansDefault, exerciciMinutsDefault, (error, data)=>{
        if (error){
          Bert.alert("Logueja't abans d'introduir dades.", "danger", "fixed-top", "fa-frown-o");
        }else{
          this.refs.exerciciNom.value = "";
          this.refs.exerciciDescripcio.value = "";
          this.refs.exerciciSeriesDefault.value = "";
          this.refs.exerciciRepeticionsDefault.value = "";
          this.refs.exerciciDescansDefault.value = "";
          this.refs.exerciciMinutsDefault.value = "";
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
          <select ref="selGrupMuscular">
            {
              this.props.grups_musculars.map(grup_muscular=>
                <option key={grup_muscular.grupMuscularNom} value={grup_muscular._id}>
                  { grup_muscular.grupMuscularNom }
                </option>
              )
            }
          </select>
          <fieldset>
            <legend>Valors per defecte: </legend>
            <input
              type="text"
              ref="exerciciSeriesDefault"
              placeholder="Sèries"
            />
            <input
              type="text"
              ref="exerciciRepeticionsDefault"
              placeholder="Repeticions"
            />
            <input
              type="text"
              ref="exerciciDescansDefault"
              placeholder="Descans"
            />
            <input
              type="text"
              ref="exerciciMinutsDefault"
              placeholder="Minuts"
            />
          </fieldset>
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
