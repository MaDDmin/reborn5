// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// La col·lecció de les resolucions
import '../../api/collections/Clients.js';
import '../../api/collections/GrupsMusculars.js';
import '../../api/collections/Exercicis.js';
import '../../api/collections/Rutines.js';
import '../../api/collections/Imatges.js';

import { createContainer } from 'meteor/react-meteor-data';
//import ClientsForm from './ClientsForm.jsx';
//import ClientSingle from './ClientSingle.jsx';
import { check, Match } from 'meteor/check';
import CSSTransitionGroup from 'react-transition-group';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      subscription: {
        clients: Meteor.subscribe("userClients"),
        grups_musculars: Meteor.subscribe("userGrupsMusculars"),
        exercicis: Meteor.subscribe("userExercicis"),
        rutines: Meteor.subscribe("userRutines"),
        imatges: Meteor.subscribe("userImatges")
      }
    


    }
  }

  componentDidMount(){

  }

  componentWillUnmount(){
  //  this.state.subscription.clients.stop();
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
      <div id="app"></div>
    );
  }
}

App.propTypes = {
//  clients: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    clients: Clients.find().fetch(),
    grups_musculars: GrupsMusculars.find().fetch(),
    exercicis: Exercicis.find().fetch(),
    rutines: Rutines.find().fetch(),
  }
}, App);
