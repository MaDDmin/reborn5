import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';

export default class ClientsForm extends Component{
  addClient(event){
    event.preventDefault();
    let text = this.refs.client.value.trim();

    if (text){
      Meteor.call('clients.insert', text, (error, data)=>{
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
            ref="nomClient"
            placeholder="Nom"
          />
          <input
            type="text"
            ref="cognomsClient"
            placeholder="Cognoms"
          />
          <input
            type="text"
            ref="mobilClient"
            placeholder="Mòbil"
          />
          <input
            type="text"
            ref="emailClient"
            placeholder="eMail"
          />
          <textarea
            ref="adressClient"
            placeholder="Adreça domiciliar"
          />
        </form>
      </div>
    );
  }
};
