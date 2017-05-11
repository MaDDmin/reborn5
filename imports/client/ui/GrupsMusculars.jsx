// React
import React, {Component, PropTypes} from 'react';

// La col·lecció de les resolucions
import '../../api/collections/GrupsMusculars.js';
import {createContainer} from 'meteor/react-meteor-data';
import GrupsMuscularsForm from './GrupsMuscularsForm.jsx';
import GrupMuscularSingle from './GrupMuscularSingle.jsx';
import { check, Match } from 'meteor/check';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      subscription: {
        grups_musculars: Meteor.subscribe("userGrupsMusculars")
      }
    }
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    this.state.subscription.grups_musculars.stop();
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
        <GrupsMuscularsForm />
        <ReactCSSTransitionGroup
          component="ul"
          className="ulResolutions"
          transitionName="resolutionLoad"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={400}
        >
                                  {/*this.renderResolutions()*/}
          {
            this.props.grups_musculars.map((grup_muscular)=>(
              <GrupMuscularSingle key={grup_muscular._id} grup_muscular={grup_muscular} />
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
    grups_musculars: GrupsMusculars.find().fetch()
  }
}, App);
