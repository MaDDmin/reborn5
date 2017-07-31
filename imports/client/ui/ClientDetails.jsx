import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
//import ReactDOM from 'react-dom';
//import Bert from 'meteor/themeteorchef:bert';
import { createContainer } from 'meteor/react-meteor-data';

class ClientDetailsNoData extends Component {
  constructor(props) {
    super(props);

    this.state = {
    //   subscription: {
    //     clients: Meteor.subscribe("userClients")
    //   }
    };
  }

  componentWillUnmount() {
    //this.props.clients.stop();
  }

  render() {
    //console.log(this.props.res);

    /*if (this.props.clients.ready()) {*/
      return (
        <div id="divClientsForm">
        <h2>El Client >>> </h2>
        <h4>ID: {this.props.clients[0]._id}</h4>
        <h6>Created at: {this.props.clients[0].createdAt.toString()}</h6>
        <h4>Email: {this.props.clients[0].clientEmail}</h4>
        <h4>Completed: {this.props.res[0].completed.toString()}</h4>
        <h5>res: {this.props.res.toString()}</h5>
        <h5>eee: {this.props.eee}</h5>
        </div>
      );
    /*}*/

    /*return (
      <span>Loading...</span>
  );*/
  }
};

// ResolutionDetails.propTypes = {
//   res: PropTypes.array.isRequired
// };
//
export default createContainer(({ params }) => {
    const
        { id } = params,

        subscription = {
            clientsSubscription: Meteor.subscribe("userClients"),
            grups_muscularsSubscription: Meteor.subscribe("userGrupsMusculars"),
            imatgesSubscription: Meteor.subscribe("userImatges"),
            exercicisSubscription: Meteor.subscribe("userExercicis")
        };

  //console.log(props);
  return {
    //res: Resolutions.find({_id: this.props.id}).fetch()
    //res: "Algo per dir algo..."
    res: Clients.find().fetch(),
    eee: "tio",
    clients: Clients.find({_id: id}).fetch(),
    grups_musculars: GrupsMusculars.find().fetch(),
    exercicis: Exercicis.find().fetch(),
    rutines: Rutines.find().fetch(),
    imatges: Imatges.find().fetch()
  }
}, ClientDetailsNoData);
