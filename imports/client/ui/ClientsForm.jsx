import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';

import PujaArxiusAmbText from './PujaArxiusAmbText.jsx';

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

import subYears from 'date-fns/sub_years';


export default class ClientsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arrImatgesPujades: [],
            dateOfBirth: {}
        };

        this.addClient = this.addClient.bind(this);
        this.handleImatgesPujades = this.handleImatgesPujades.bind(this);
        this.handleDateOfBirth = this.handleDateOfBirth.bind(this);
    }

    addClient(event) {
        event.preventDefault();
        let
            arrImatgesPujadesAmbText = [],
            clientNom = this.clientNom.value.trim(),
            clientCognoms = this.clientCognoms.value.trim(),
            clientMobil = this.clientMobil.value.trim(),
            clientEmail = this.clientEmail.value.trim(),
            clientAddress = this.clientAddress.value.trim(),
            clientObservacions = this.clientObservacions.value.trim(),

            clientDateOfBirth = this.state.dateOfBirth,
            arrImatges = this.state.arrImatgesPujades;

        if (clientNom) {
// Tros per capturar els texts i associar-los a cada imatge a pujar.
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
                'clients.insert',
                clientNom,
                clientCognoms,
                clientMobil,
                clientEmail,
                clientAddress,
                clientDateOfBirth,
                clientObservacions,
                arrImatges,
                (error, data) => {
                    if (error) {
                        Bert.alert(
                            "Logueja't abans d'escriure una resolució.",
                            "danger",
                            "fixed-top",
                            "fa-frown-o"
                        );
                    } else {
                        //this.refs.client.value = "";
                    }
                }
            );
        }
    }

    handleImatgesPujades(arrImatgesPujades) {
        this.setState({
            arrImatgesPujades
        });
        //alert(`handleImatgesPujades`);
    }

    handleDateOfBirth(date) {
        this.setState({
            dateOfBirth: date
        });
        // Açò no és més que un miserable hack per fer funcionar adequadament la funció de seleccionar l'any.
        setTimeout(() => {
            document
                .querySelectorAll("span.Cal__Header__date")[1]
                .click();
        }, 1200);
    }

    render() {
        return (
            <div id="divClientsForm">
                <h2>Nou Client</h2>
                <fieldset>
                    <legend>Nou client </legend>

                    <form className="new-client" onSubmit={this.addClient}>

                        <PujaArxiusAmbText
                            onImatgesPujades={this.handleImatgesPujades}
                        />

                        <div id="divInNomClient">
                            <input
                                id="clientNom"
                                className="inNomClient"
                                type="text"
                                ref={input => this.clientNom = input}
                                placeholder="Nom"
                            />
                            <input
                                id="clientCognoms"
                                className="inNomClient"
                                type="text"
                                ref={input => this.clientCognoms = input}
                                placeholder="Cognoms"
                            />
                        </div>

                        <div id="divInGender">
                            <div id="divInGenderFemale" className="divGenderOption">
                                <input
                                    type="radio"
                                    name="clientSexe"
                                    ref={input => this.clientSexe = input}
                                    value="dona"
                                />
                                <span className="spanGender"> Dona</span>
                            </div>
                            <div id="divInGenderMale" className="divGenderOption">
                                <input
                                    type="radio"
                                    name="clientSexe"
                                    ref={input => this.clientSexe = input}
                                    value="home"
                                />
                                <span className="spanGender"> Home</span>
                            </div>
                        </div>

                        <div id="divClientContact">
                            <input
                                id="clientEmail"
                                type="email"
                                ref={input => this.clientEmail = input}
                                placeholder="eMail"
                            />
                            <input
                                id="clientMobil"
                                type="text"
                                ref={input => this.clientMobil = input} placeholder="Mòbil"
                            />
                            <textarea
                                id="clientAddress"
                                ref={ta => this.clientAddress = ta} placeholder="Adreça domiciliar"
                            />
                        </div>

                        {/*Component= withRange(Calendar)}*/}
                        <InfiniteCalendar
                            display="years"
                            selected={null}
                            min={new Date(1940, 0, 1)}
                            minDate={new Date(1940, 0, 1)}
                            max={subYears(Date(), 10)}
                            maxDate={subYears(Date(), 10)}

                            locale={{
                                locale: require('date-fns/locale/ca'),
                                headerFormat: 'dddd, D MMM',
                                weekdays: ["Dmg","Dll","Dm","Dcs","Djs","Dvs","Dss"],
                                weekStartsOn: 1,
                                blank: 'Data de naixement: ',
                                todayLabel: {
                                    long: 'Anar a avui',
                                    short: 'Avui.'
                                }
                            }}
                            onSelect={this.handleDateOfBirth}
                            ref={infCal => this.infCal = infCal}
                        />

                        {/*<input
                          type="text"
                          ref="clientTags"
                          placeholder="Etiquetes (separades per comes)"
                        />*/}

                        <textarea
                            id="clientObservacions"
                            ref={ta => this.clientObservacions = ta}
                            placeholder="Observacions"
                        />
                        <input
                            id="clientSubmit"
                            type="submit"
                            ref={input => this.clientSubmit = input}
                            value="Introduir"
                        />
                    </form>
                </fieldset>
            </div>
        );
    }
};
