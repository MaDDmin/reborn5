import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';
import PujaArxiusAmbText from './PujaArxiusAmbText.jsx';
//import GrupMuscularOpt from './GrupMuscularOpt.jsx';

//import '../../api/collections/GrupsMusculars.js';

export default class ExercicisForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arrImatgesPujades: []
        };

        this.addExercici = this.addExercici.bind(this);
        this.handleImatgesPujades = this.handleImatgesPujades.bind(this);
    }

    addExercici(event) {
        event.preventDefault();
        let
            arrImatgesPujadesAmbText = [],
            exerciciNom = this.exerciciNom.value.trim(),
            exerciciGrupMuscular = this.selGrupMuscular.selectedOptions[0].value,
            exerciciDescripcio = this.exerciciDescripcio.value.trim(),
            exerciciSeriesDefault = this.exerciciSeriesDefault.value.trim(),
            exerciciRepeticionsDefault = this.exerciciRepeticionsDefault.value.trim(),
            exerciciDescansMinuts = this.exerciciDescansMinuts.value.trim(),
            exerciciDescansSegons = this.exerciciDescansSegons.value.trim();
            exerciciCarrega = this.exerciciCarrega.value.trim();

        if (exerciciNom) {

            this.state.arrImatgesPujades.forEach(
                (v, i, a) => {
                    let
                        imgTaIterantValue = document.querySelector(`#taArx_${i}`).value,
                        arrImatgesPujadesAmbTextIterant = v;

                    arrImatgesPujadesAmbTextIterant.imgText = imgTaIterantValue;
                    arrImatgesPujadesAmbText.push(arrImatgesPujadesAmbTextIterant);

                    console.dir(arrImatgesPujadesAmbText);
                }
            );

            Meteor.call(
                'exercicis.insert',
                exerciciNom,
                exerciciGrupMuscular,
                exerciciDescripcio,
                exerciciSeriesDefault,
                exerciciRepeticionsDefault,
                exerciciDescansMinuts,
                exerciciDescansSegons,
                exerciciCarrega,
                this.state.arrImatgesPujades,
                (error, data) => {
                    if (error) {
                      Bert.alert(
                          "Logueja't abans d'introduir dades.",
                          "danger",
                          "fixed-top",
                          "fa-frown-o"
                      );
                    } else {
                        this.exerciciNom.value = "";
                        this.exerciciDescripcio.value = "";
                        this.exerciciSeriesDefault.value = "";
                        this.exerciciRepeticionsDefault.value = "";
                        this.exerciciDescansMinuts.value = "";
                        this.exerciciDescansSegons.value = "";
                        this.exerciciCarrega.value = "";
                    }
            });
        }
    }

    handleImatgesPujades(arrImatgesPujades) {
        this.setState({
            arrImatgesPujades
        });
    }

    render() {
        return (
            <div id="divExercicisForm">
                <h2>Nou Exercici</h2>
                <form className="nouexercici" onSubmit={this.addExercici}>
                    <input
                        type="text"
                        ref={input => this.exerciciNom = input}
                        placeholder="Nom"
                    />
                    <textarea
                        ref={ta => this.exerciciDescripcio = ta}
                        placeholder="Descripció de l'exercici"
                    />
                    <select ref={sel => this.selGrupMuscular = sel}>
                        {
                            this.props.grups_musculars.map(grup_muscular =>
                                <option
                                    key={grup_muscular.grupMuscularNom}
                                    value={grup_muscular._id}
                                >
                                    { grup_muscular.grupMuscularNom }
                                </option>
                            )
                        }
                    </select>
                    <fieldset>
                        <legend>Valors per defecte: </legend>
                        <input
                            type="number"
                            min="1"
                            ref={input => this.exerciciSeriesDefault = input}
                            placeholder="Sèries"
                        />
                        <input
                            type="number"
                            min="1"
                            ref={input => this.exerciciRepeticionsDefault = input}
                            placeholder="Repeticions"
                        />
                        <input
                            type="number"
                            min="0"
                            ref={input => this.exerciciDescansMinuts = input}
                            placeholder="DescansMinuts"
                        />
                        <input
                            type="number"
                            min="0"
                            max="60"
                            step="10"
                            ref={input => this.exerciciDescansSegons = input}
                            placeholder="DescansSegons"
                        />
                        <input
                            type="number"
                            min="0"
                            step="5"
                            ref={input => this.exerciciCarrega = input}
                            placeholder="Càrrega"
                        />
                    </fieldset>

                    {/*// Introduir arxius i imatges. Cal fer un bon component que puga ser reutilitzat.*/}
                    <PujaArxiusAmbText onImatgesPujades={this.handleImatgesPujades} />

                    <input
                        type="submit"
                        ref={input => this.exerciciSubmit = input}
                        value="Introduir"
                    />
                </form>
            </div>
        );
    }
};
