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
        <form className="new-client" onSubmit={this.addClient.bind(this)}>
          <input
            type="file"
            ref="clientImatge"
          />
          <input
            type="text"
            ref="clientNom"
            placeholder="Nom"
          />
          <input
            type="text"
            ref="clientAlias"
            placeholder="Alias"
          />
          <input
            type="text"
            ref="clientCognoms"
            placeholder="Cognoms"
          />
          <input
            type="radio"
            name="clientSexe"
            ref="clientSexe"
            value="home"
          />
          <span> Home</span>
          <input
            type="radio"
            name="clientSexe"
            ref="clientSexe"
            value="dona"
          /><span> Dona</span>
          <input
            type="radio"
            name="clientSexe"
            ref="clientSexe"
            value="altre"
          />
          <span> Altre</span>
          <input
            type="text"
            ref="clientMobil"
            placeholder="Mòbil"
          />
          <input
            type="text"
            ref="clientDayOfBirth"
            placeholder="Dia de naixement"
          />
          <input
            type="text"
            ref="clientMonthOfBirth"
            placeholder="Mes de naixement"
          />
          <input
            type="text"
            ref="clientYearOfBirth"
            placeholder="Any de naixement"
          />
          <input
            type="email"
            ref="clientEmail"
            placeholder="eMail"
          />
          {/*<input
            type="text"
            ref="clientTags"
            placeholder="Etiquetes (separades per comes)"
          />*/}
          <textarea
            ref="clientAddress"
            placeholder="Adreça domiciliar"
          />
          <textarea
            ref="clientObservacions"
            placeholder="Observacions"
          />
          <input
            type="submit"
            ref="clientSubmit"
            value="Introduir"
          />
        </form>
      </div>
    );
  }
};
