import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import {_} from 'lodash';

import {extendObservable, action, autorun, useStrict, toJS, map, observable} from 'mobx';
//import jQuery from 'meteor/jquery';

export default class MobX extends Component{
  toggleChecked(){
    Meteor.call('clients.update', this.props.client);
  }
  deleteClient(){
    Meteor.call('clients.delete', this.props.client);
  }

  render(){
    let person = observable({
      firstName: 'Jow',
      lastName: 'Uqu',
      age: 0,
      fullName: function (){
        return this.firstName +' '+this.lastName;
      }
    });

    Object.assign(person, {
      setFirstAndLastName: action(function setFirstAndLastName(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
      })
    })

    autorun(function(){
      console.log(person.fullName+' '+person.age);
    });

    person.setFirstAndLastName('Un', 'Nom');




    const clientClass = this.props.client.completed ? "checked" : "";
    //const status = this.props.client.completed ? <span className="spnCompleted">Completed</span> : "";

    return (
      <li className={clientClass}>
        <a className="aSingleClient" href={"client/"+this.props.client._id}>{this.props.client.clientCognoms+", "+this.props.client.clientNom }</a>
        {/*status*/}
        <button
          className="btDeleteClient"
          onClick={this.deleteClient.bind(this)}
        >
          &times;
        </button>
      </li>
    );
  }
}
