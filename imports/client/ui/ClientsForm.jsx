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
            type="text"
            ref="clientNom"
            placeholder="Nom"
          />
          <input
            type="text"
            ref="clientCognoms"
            placeholder="Cognoms"
          />
          <input
            type="text"
            ref="clientMobil"
            placeholder="Mòbil"
          />
          <input
            type="text"
            ref="clientEmail"
            placeholder="eMail"
          />
          <textarea
            ref="clientAddress"
            placeholder="Adreça domiciliar"
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
