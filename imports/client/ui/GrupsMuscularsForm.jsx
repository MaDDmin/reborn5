import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';
import PujaArxiusAmbSendButton from './PujaArxiusAmbSendButton.jsx';

export default class GrupsMuscularsForm extends Component{
  constructor(props){
    super(props);

    this.state = {
        arrImatgesPujades: []
    };

    this.addGrupMuscular = this.addGrupMuscular.bind(this);
    this.handleImatgesPujades = this.handleImatgesPujades.bind(this);
  }

    addGrupMuscular(event) {
        event.preventDefault();
        let
            that = this;
            grupMuscularNom = this.grupMuscularNom.value.trim(),
            grupMuscularDescripcio = this.grupMuscularDescripcio.value.trim();

        if (grupMuscularNom) {
            Meteor.call('grups_musculars.insert',
                grupMuscularNom,
                grupMuscularDescripcio,
                that.state.arrImatgesPujades,
                (error, data) => {
                    if (error) {
                      Bert.alert("Logueja't abans d'introduir dades.", "danger", "fixed-top", "fa-frown-o");
                    } else {
                    //   this.refs.grupMuscularNom.value = "";
                    //   this.refs.grupMuscularDescripcio.value = "";

                    }
                }
            );
        }
    }

  handleImatgesPujades(arrImatgesPujades) {
      this.setState({
          arrImatgesPujades
      });
      alert(`handleImatgesPujades`);
  }

  render() {
    if (!this.props.active){
      return null;
    }
    return (
      <div id="divGrupsMuscularsForm">
        <h2>Nou Grup Muscular</h2>
        <form className="nougrupmuscular" onSubmit={this.addGrupMuscular}>
          <input
            type="text"
            ref={input => this.grupMuscularNom = input}
            placeholder="Nom"
            autoFocus={true}
            style={{
                display: "inline-block",
                width: "40%"
            }}
          />
          <textarea
            ref={ta => this.grupMuscularDescripcio = ta}
            placeholder="Descripció del grup muscular"
            style={{
                display: "inline-block",
                width: "40%"
            }}
          />

          {/*// Introduir arxius i imatges. Cal fer un bon component que puga ser reutilitzat.*/}
          <PujaArxiusAmbSendButton onImatgesPujades={this.handleImatgesPujades} />

          <input
            type="submit"
            value="Introduir"
          />
        </form>
      </div>
    );
  }
};
