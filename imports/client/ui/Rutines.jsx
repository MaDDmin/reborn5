// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import RutinesForm from './RutinesForm.jsx';
import RutinaSingle from './RutinaSingle.jsx';

import { check, Match } from 'meteor/check';

import { CSSTransitionGroup } from 'react-transition-group';

class RutinesNoData extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // componentDidMount(){
  //
  // }
  //
  // componentWillUnmount(){
  //   this.state.subscription.rutines.stop();
  // }

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
            id="divRutines"
            component="div"
            transitionName="route"
            transitionAppear={true}
            transitionAppearTimeout={600}
            transitionEnterTimeout={600}
            transitionLeaveTimeout={400}
        >
            <CSSTransitionGroup
                component="ul"
                className="ulLlistaRutines"
                transitionName="route"
                transitionEnterTimeout={600}
                transitionLeaveTimeout={400}
            >
          {
            this.props.rutines.map((rutina) => (
              <RutinaSingle key={rutina._id} rutina={rutina} />
            ))
          }
          </CSSTransitionGroup>
          <RutinesForm
            clients={this.props.clients}
            grups_musculars={this.props.grups_musculars}
            exercicis={this.props.exercicis}
          />
        </CSSTransitionGroup>
    );
  }
}

// App.propTypes = {
// //  clients: PropTypes.array.isRequired
// };

export default createContainer(() => {
    const
        subscription = {
            clientsSubscription: Meteor.subscribe("userClients"),
            grups_muscularsSubscription: Meteor.subscribe("userGrupsMusculars"),
            imatgesSubscription: Meteor.subscribe("userImatges"),
            exercicisSubscription: Meteor.subscribe("userExercicis"),
            rutinesSubscription: Meteor.subscribe("userRutines")
        },

        loading = ! ( subscription.clientsSubscription.ready() &&
            subscription.grups_muscularsSubscription.ready() &&
            subscription.exercicisSubscription.ready() &&
            subscription.rutinesSubscription.ready()
        ),

        clients = subscription.clientsSubscription.ready() ? Clients.find().fetch() : [],
        grups_musculars = subscription.grups_muscularsSubscription.ready() ? GrupsMusculars.find().fetch() : [],
        exercicis = subscription.exercicisSubscription.ready() ? Exercicis.find().fetch() : [],
        rutines = subscription.rutinesSubscription.ready() ? Rutines.find().fetch() : [];

  return {
    clients,
    grups_musculars,
    exercicis,
    rutines,
    loading
  }
}, RutinesNoData);
