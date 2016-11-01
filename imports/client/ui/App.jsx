import React, {Component, PropTypes} from 'react';
import '../../api/collections/Resolutions.js';
import {createContainer} from 'meteor/react-meteor-data';
import ResolutionsForm from './ResolutionsForm.jsx';
import ResolutionSingle from './ResolutionSingle.jsx';
import { check, Match } from 'meteor/check';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      subscription: {
        resolutions: Meteor.subscribe("userResolutions")
      }
    }
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    this.state.subscription.resolutions.stop();
  }

  /*renderResolutions(){
    return this.props.resolutions.map((resolution)=>(
      <ResolutionSingle key={resolution._id} resolution={resolution} />
    ));
  }*/

  render(){
    let resol = this.props.resolutions;
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
        <ResolutionsForm />
        <ReactCSSTransitionGroup
          component="ul"
          className="ulResolutions"
          transitionName="resolutionLoad"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={400}
        >
                                  {/*this.renderResolutions()*/}
          {
            this.props.resolutions.map((resolution)=>(
              <ResolutionSingle key={resolution._id} resolution={resolution} />
            ))
          }
        </ReactCSSTransitionGroup>
      </ReactCSSTransitionGroup>
    );
  }
}
App.propTypes = {
  resolutions: PropTypes.array.isRequired
};
export default createContainer(()=>{
  return {
    resolutions: Resolutions.find().fetch()
  }
}, App);
