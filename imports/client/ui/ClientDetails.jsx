import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
//import ReactDOM from 'react-dom';
//import Bert from 'meteor/themeteorchef:bert';
import { createContainer } from 'meteor/react-meteor-data';

import './ClientDetails.scss';

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
            <div id="divClient">
                <h2>Client: </h2>
                <h4>
                    {
                        this.props.client[0] ?
                        <div>
                            <span id="spnNom">
                                {this.props.client[0].clientNom}
                            </span>
                            &nbsp;
                            <span id="spnCognom">
                                {this.props.client[0].clientCognoms}
                            </span>
                        </div> :
                        `Carregant...`
                    }
                </h4>
                <div className="divClientObservacions">
                    {
                        this.props.client[0] ?
                        this.props.client[0].clientObservacions :
                        `Carregant...`
                    }
                </div>
                <div className="divGridClientImgs">
                    {   this.props.client[0] && this.props.client[0].arrImatges ?
                        this.props.client[0].arrImatges.map(
                            (v, i, a) => {
                                return (
                                    <div key={i} className="divClientImatges">
                                        <img className="imgClient" src={v.imgArx.buffer} alt={v.imgArx.name} />
                                        <div className="divClientImgText">
                                            {v.imgText}
                                        </div>
                                    </div>
                                );
                            }
                        ) :
                        `Carregant...`
                    }
                </div>
            </div>
          );
        /*}*/

//this.props.grup_muscular[0]._id
        // <h6>Created at: {this.props.grups_musculars[0].createdAt.toString()}</h6>
        // <h4>Nom: {this.props.grups_musculars[0].grupMuscularNom}</h4>
        // <h4>Descripció: {this.props.grups_musculars[0].grupMuscularDescripcio}</h4>
        // <div className="divGMImatges">
        //     { this.props.imatges.map((el, index) =>
        //         <img key={index} className="imgGM" src={el.data} />
        //     )}
        // </div>

    /*return (
      <span>Loading...</span>
  );*/
    }
}

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

    let
        aquestClient = Clients.find({_id: id}).fetch();//,
        //arrImatges = aquestGM.arrImatges || [];



  //console.log(props);
    return {
        clients: Clients.find().fetch(),
        client: Clients.find({_id: id}).fetch(),
        exercicis: Exercicis.find().fetch(),
        rutines: Rutines.find().fetch(),
        imatges: Imatges.find({user: Meteor.userId()}).fetch()
    }
}, ClientDetailsNoData);

//res: Resolutions.find({_id: this.props.id}).fetch()
//res: "Algo per dir algo..."

// imatges: Imatges.find({
//     _id: { $in: this.props.grups_musculars[0].arrImatges }
// }).fetch()
