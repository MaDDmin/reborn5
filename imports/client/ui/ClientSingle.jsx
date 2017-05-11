import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import jQuery from 'meteor/jquery';

export default class ClientSingle extends Component{
  toggleChecked(){
    Meteor.call('clients.update', this.props.client);
  }
  deleteClient(){
    Meteor.call('clients.delete', this.props.client);
  }
  render(){
    const clientClass = this.props.client.completed ? "checked" : "";
    const status = this.props.client.completed ? <span className="spnCompleted">Completed</span> : "";

    return (
      <li className={clientClass}>
        <input
          className="chkCompletedClient"
          ref="chkCompletedClient"
          key={this.props.client._id}
          type="checkbox"
          readOnly={true}
          checked={this.props.client.completed}
          onClick={this.toggleChecked.bind(this)}
        />
        <a className="aSingleClient" href={"client/"+this.props.client._id}>{this.props.client.text}</a>
        {status}
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
