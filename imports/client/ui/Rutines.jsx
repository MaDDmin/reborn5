// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';

// La col·lecció de les resolucions
import '../../api/collections/Clients.js';
import '../../api/collections/GrupsMusculars.js';
import '../../api/collections/Exercicis.js';
import '../../api/collections/Rutines.js';
import '../../api/collections/Imatges.js';

import { createContainer } from 'meteor/react-meteor-data';
import RutinesForm from './RutinesForm.jsx';
import RutinaSingle from './RutinaSingle.jsx';
import { check, Match } from 'meteor/check';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component{
  constructor(props){
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
      <div>
        <RutinesForm
          clients={this.props.clients}
          grups_musculars={this.props.grups_musculars}
          exercicis={this.props.exercicis}
        />
        <ReactCSSTransitionGroup
          component="ul"
          className="ulResolutions"
          transitionName="resolutionLoad"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={400}
        >
          {
            this.props.rutines.map((rutina) => (
              <RutinaSingle key={rutina._id} rutina={rutina} />
            ))
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
App.propTypes = {
//  clients: PropTypes.array.isRequired
};

export default AppContainer = createContainer(()=>{
  //const dataHandle = Meteor.subscribe('totesDades');
  const clientsHandle = Meteor.subscribe("userClients");
  const grups_muscularsHandle = Meteor.subscribe("userGrupsMusculars");
  const exercicisHandle = Meteor.subscribe("userExercicis");
  const rutinesHandle = Meteor.subscribe("userRutines");

  const loading = ! (clientsHandle.ready() && grups_muscularsHandle.ready() && exercicisHandle.ready() && rutinesHandle.ready());

  const clients = clientsHandle.ready() ? Clients.find().fetch() : [];
  const grups_musculars = grups_muscularsHandle.ready() ? GrupsMusculars.find().fetch() : [];
  const exercicis = exercicisHandle.ready() ? Exercicis.find().fetch() : [];
  const rutines = rutinesHandle.ready() ? Rutines.find().fetch() : [];

  return {
    clients,
    grups_musculars,
    exercicis,
    rutines,
    loading
  }
}, App);
