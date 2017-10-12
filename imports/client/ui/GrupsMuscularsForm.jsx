import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';
import PujaArxiusAmbText from './PujaArxiusAmbText.jsx';
import PuArxsAbTxtRFR from './PuArxsAbTxtRFR.jsx';

export default class GrupsMuscularsForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            arrImatgesPujades: [],
            arrImatgesPujadesAmbText: []
        };

        this.addGrupMuscular = this.addGrupMuscular.bind(this);
        this.handleImatgesPujades = this.handleImatgesPujades.bind(this);
    }

    addGrupMuscular(event) {
        event.preventDefault();
        let
            arrImatgesPujadesAmbText = [],
            grupMuscularNom = this.grupMuscularNom.value.trim(),
            grupMuscularDescripcio = this.grupMuscularDescripcio.value.trim();

        if (grupMuscularNom) {

            this.state.arrImatgesPujades.forEach(
                (v, i, a) => {
                    let
                        imgTaIterantValue = document.querySelector(`#taArx_${i}`).value,
                        arrImatgesPujadesAmbTextIterant = v;

                    arrImatgesPujadesAmbTextIterant.imgText = imgTaIterantValue;
                    arrImatgesPujadesAmbText.push(arrImatgesPujadesAmbTextIterant);
                }
            );

            console.dir("addGrupMuscular: arrImatgesPujadesAmbText", arrImatgesPujadesAmbText);

            Meteor.call('grups_musculars.insert',
                grupMuscularNom,
                grupMuscularDescripcio,
                arrImatgesPujadesAmbText,
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
    }

    textAlState(clau, text) {

    }

    render() {
        if (!this.props.active) {
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
                        }}
                    />

                    {/*// Introduir arxius i imatges. Cal fer un bon component que puga ser reutilitzat.*/}
                    <PujaArxiusAmbText onImatgesPujades={this.handleImatgesPujades} />

                    <input
                        type="submit"
                        value="Introduir"
                    />
                </form>
            </div>
        );
    }
};
