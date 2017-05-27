import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';

export default class ClientsForm extends Component{
  addClient(event){
    event.preventDefault();
    let clientNom = this.refs.clientNom.value.trim(),
      clientCognoms = this.refs.clientCognoms.value.trim(),
      clientMobil = this.refs.clientMobil.value.trim(),
      clientEmail = this.refs.clientEmail.value.trim(),
      clientAddress = this.refs.clientAddress.value.trim();

    if (clientNom){
      Meteor.call('clients.insert', clientNom, clientCognoms, clientMobil, clientEmail, clientAddress, (error, data)=>{
        if (error){
          Bert.alert("Logueja't abans d'escriure una resolució.", "danger", "fixed-top", "fa-frown-o");
        }else{
          this.refs.client.value = "";
        }
      });
    }
  }
  render(){
    return (
      <div id="divClientsForm">
        <h2>Nou Client</h2>
        <fieldset>
          <legend>Nou client </legend>
          <form className="new-client" onSubmit={this.addClient.bind(this)}>
            {/* <input type="file" ref="clientImatge" /> */}
            <div id="divInNomClient">
              <input id="clientNom" className="inNomClient" type="text" ref="clientNom" placeholder="Nom" />
              <input id="clientCognoms" className="inNomClient" type="text" ref="clientCognoms" placeholder="Cognoms" />
              <input id="clientAlias" className="inNomClient" type="text" ref="clientAlias" placeholder="Alias" />
            </div>
            <div id="divInGender">
              <div id="divInGenderFemale" className="divGenderOption">
                <input type="radio" name="clientSexe" ref="clientSexe" value="dona" />
                <span className="spanGender"> Dona</span>
              </div>
              <div id="divInGenderMale" className="divGenderOption">
                <input type="radio" name="clientSexe" ref="clientSexe" value="home" />
                <span className="spanGender"> Home</span>
              </div>
              <div id="divInGenderOther" className="divGenderOption">
                <input type="radio" name="clientSexe" ref="clientSexe" value="altre" />
                <span className="spanGender"> Altre</span>
              </div>
            </div>
            <input id="clientMobil" type="text" ref="clientMobil" placeholder="Mòbil" />
            <input id="clientDayOfBirth" type="text" ref="clientDayOfBirth" placeholder="Dia de naixement" />
            <input id="clientMonthOfBirth" type="text" ref="clientMonthOfBirth" placeholder="Mes de naixement" />
            <input id="clientYearOfBirth" type="text" ref="clientYearOfBirth" placeholder="Any de naixement" />
            <input id="clientEmail" type="email" ref="clientEmail" placeholder="eMail" />
            {/*<input
              type="text"
              ref="clientTags"
              placeholder="Etiquetes (separades per comes)"
            />*/}
            <textarea id="clientAddress" ref="clientAddress" placeholder="Adreça domiciliar" />
            <textarea id="clientObservacions" ref="clientObservacions" placeholder="Observacions" />
            <input id="clientSubmit" type="submit" ref="clientSubmit" value="Introduir" />
          </form>
        </fieldset>
      </div>
    );
  }
};
