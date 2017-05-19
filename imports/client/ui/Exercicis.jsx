// React
import React, {Component, PropTypes} from 'react';

// La col·lecció de les resolucions
import '../../api/collections/Clients.js';
import '../../api/collections/GrupsMusculars.js';
import '../../api/collections/Exercicis.js';

import {createContainer} from 'meteor/react-meteor-data';
import ExercicisForm from './ExercicisForm.jsx';
import ExerciciSingle from './ExerciciSingle.jsx';
import { check, Match } from 'meteor/check';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      subscription: {
        clients: Meteor.subscribe("userClients"),
        grups_musculars: Meteor.subscribe("userGrupsMusculars"),
        exercicis: Meteor.subscribe("userExercicis")
      }
    }
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    this.state.subscription.exercicis.stop();
  }

  /*renderResolutions(){
    return this.props.resolutions.map((resolution)=>(
      <ResolutionSingle key={resolution._id} resolution={resolution} />
    ));
  }*/

  render(){
  //  let resol = this.props.resolutions;
    //console.log(resol);
    return (
      <CSSTransitionGroup
        id="divApp"
        component="div"
        transitionName="route"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={400}
      >
        <ExercicisForm />
        <CSSTransitionGroup
          component="ul"
          className="ulResolutions"
          transitionName="resolutionLoad"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={400}
        >
                                  {/*this.renderResolutions()*/}
          {
            this.props.exercicis.map((exercici)=>(
              <ExerciciSingle key={exercici._id} exercici={exercici} />
            ))
          }
        </CSSTransitionGroup>
      </CSSTransitionGroup>
    );
  }
}
App.propTypes = {
//  clients: PropTypes.array.isRequired
};
export default createContainer(()=>{
  return {
    clients: Clients.find().fetch(),
    grups_musculars: GrupsMusculars.find().fetch(),
    exercicis: Exercicis.find().fetch(),
    rutines: Rutines.find().fetch()
  }
}, App);
