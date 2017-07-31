import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';

import { CSSTransitionGroup } from 'react-transition-group';

export default class ClientSingle extends Component {
    constructor(props) {
        super(props);

        this.deleteClient = this.deleteClient.bind(this);
    }

    // toggleChecked() {
    //     Meteor.call('clients.update', this.props.client);
    // }

    deleteClient() {
        Meteor.call('clients.delete', this.props.client);
    }

    render() {
        //const
            //clientClass = this.props.client.completed ? "checked" : "";

        return (
            <CSSTransitionGroup
                className="liClients"
                component="li"
                transitionName="route"
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={400}
            >
                <a
                    className="aSingleClient"
                    href={"client/"+this.props.client._id}
                >
                    {`${this.props.client.clientCognoms}, ${this.props.client.clientNom}`}
                </a>
                <button
                    className="btDeleteClient"
                    onClick={this.deleteClient}
                >
                    &times;
                </button>
            </CSSTransitionGroup>
        );
    }
}
