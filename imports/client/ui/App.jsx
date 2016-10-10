import React, {Component, PropTypes} from 'react';
import '../../api/collections/Resolutions.js';
import {createContainer} from 'meteor/react-meteor-data';
import ResolutionsForm from './ResolutionsForm.jsx';
import ResolutionSingle from './ResolutionSingle.jsx';
import { check, Match } from 'meteor/check';

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

  renderResolutions(){
    return this.props.resolutions.map((resolution)=>(
      <ResolutionSingle key={resolution._id} resolution={resolution} />
    ));
  }

  render(){
    let resol = this.props.resolutions;
    //console.log(resol);
    return (
      <div>
        <ResolutionsForm />
        <ul className="ulResolutions">
          {//this.renderResolutions()}
            this.props.resolutions.map((resolution)=>(
              <ResolutionSingle key={resolution._id} resolution={resolution} />
            ))
          }
        </ul>
      </div>
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
