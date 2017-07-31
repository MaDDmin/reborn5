import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import ClientsForm from './ClientsForm.jsx';
import ClientSingle from './ClientSingle.jsx';

import { check, Match } from 'meteor/check';

import { CSSTransitionGroup } from 'react-transition-group';

class ClientsNoData extends Component{
  constructor(props) {
    super(props);

    this.state = {
    //   subscription: {
    //     clients: Meteor.subscribe("userClients"),
    //     grups_musculars: Meteor.subscribe("userGrupsMusculars")
    //   }
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    //this.props.subscription.clients.stop();
  }

  /*renderResolutions(){
    return this.props.resolutions.map((resolution)=>(
      <ResolutionSingle key={resolution._id} resolution={resolution} />
    ));
  }*/

  render() {
  //  let resol = this.props.resolutions;
    //console.log(resol);
    return (
        <CSSTransitionGroup
            id="divClientsContainer"
            component="div"
            transitionName="route"
            transitionAppear={true}
            transitionAppearTimeout={600}
            transitionEnterTimeout={600}
            transitionLeaveTimeout={400}
        >
            <CSSTransitionGroup
                component="ul"
                className="ulLlistaClients"
                transitionName="clientsLoad"
                transitionEnterTimeout={600}
                transitionLeaveTimeout={400}
            >
                {
                    this.props.clients.map((client) => (
                        <ClientSingle key={client._id} client={client} />
                    ))
                }
                <button id="btCientsFormTrigger">Nou Client</button>
            </CSSTransitionGroup>
            <ClientsForm />
      </CSSTransitionGroup>
    );
  }
}

// Clients.propTypes = {
// //  clients: PropTypes.array.isRequired
// };

export default createContainer(() => {
    const
        subscription = {
            clientsSubscription: Meteor.subscribe("userClients"),
            grups_muscularsSubscription: Meteor.subscribe("userGrupsMusculars"),
            imatgesSubscription: Meteor.subscribe("userImatges"),
            exercicisSubscription: Meteor.subscribe("userExercicis")
        };

    return {
        clients: Clients.find().fetch(),
        grups_musculars: GrupsMusculars.find().fetch(),
        imatges: Imatges.find().fetch()
    }
}, ClientsNoData);
