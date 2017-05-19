// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// La col·lecció de les resolucions
import '../../api/collections/Clients.js';
import '../../api/collections/GrupsMusculars.js';

import {createContainer} from 'meteor/react-meteor-data';
import ClientsForm from './ClientsForm.jsx';
import ClientSingle from './ClientSingle.jsx';
import { check, Match } from 'meteor/check';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      subscription: {
        clients: Meteor.subscribe("userClients"),
        grups_musculars: Meteor.subscribe("userGrupsMusculars")
      }
    }
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    this.state.subscription.clients.stop();
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
      <ReactCSSTransitionGroup
        id="divApp"
        component="div"
        transitionName="route"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={400}
      >
        <ClientsForm />
        <ReactCSSTransitionGroup
          component="ul"
          className="ulResolutions"
          transitionName="resolutionLoad"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={400}
        >
                                  {/*this.renderResolutions()*/}
          {
            this.props.clients.map((client)=>(
              <ClientSingle key={client._id} client={client} />
            ))
          }
        </ReactCSSTransitionGroup>
      </ReactCSSTransitionGroup>
    );
  }
}
App.propTypes = {
//  clients: PropTypes.array.isRequired
};
export default createContainer(()=>{
  return {
    clients: Clients.find().fetch(),
    grups_musculars: GrupsMusculars.find().fetch()
  }
}, App);
