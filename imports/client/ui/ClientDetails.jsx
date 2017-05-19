import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
//import ReactDOM from 'react-dom';
//import Bert from 'meteor/themeteorchef:bert';
import {createContainer} from 'meteor/react-meteor-data';

class ClientDetails extends Component{
  constructor(props){
    super(props);

    this.state = {
      subscription: {
        clients: Meteor.subscribe("userClients")
      }
    }
  }

  componentWillUnmount(){
    this.state.subscription.clients.stop();
  }

  render(){
    console.log(this.props.res);
    if (this.state.subscription.clients.ready()){
      return (
        <div id="divClientsForm">
        <h2>Res</h2>
        <h4>ID: {this.props.res[0]._id}</h4>
        <h6>Created at: {this.props.res[0].createdAt.toString()}</h6>
        <h4>Text: {this.props.res[0].text}</h4>
        <h4>Completed: {this.props.res[0].completed.toString()}</h4>
        <h5>res: {this.props.res.toString()}</h5>
        <h5>eee: {this.props.eee}</h5>
        </div>
      );
    }
    return (
      <span>Loading...</span>
    );
  }
};

// ResolutionDetails.propTypes = {
//   res: PropTypes.array.isRequired
// };
//
export default createContainer(({params})=>{
  const {id} = params;

  //console.log(props);
  return {
    //res: Resolutions.find({_id: this.props.id}).fetch()
    //res: "Algo per dir algo..."
    res: Clients.find({_id: id}).fetch(),
    eee: "tio"
  }
}, ClientDetails);
