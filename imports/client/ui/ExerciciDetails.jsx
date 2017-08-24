import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
//import ReactDOM from 'react-dom';
//import Bert from 'meteor/themeteorchef:bert';
import { createContainer } from 'meteor/react-meteor-data';

import './ExerciciDetails.scss';

class ExerciciDetailsNoData extends Component {
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
            <div id="divExercici">
                <h2>Exercici: </h2>
                <h4>
                    {
                        this.props.exercici[0] ?
                        <div>
                            <span id="spnNom">
                                {this.props.exercici[0].exerciciNom}
                            </span>
                        </div> :
                        `Carregant...`
                    }
                </h4>
                <div className="divExerciciDescripcio">
                    {
                        this.props.exercici[0] ?
                        this.props.exercici[0].exerciciDescripcio :
                        `Carregant...`
                    }
                </div>
                <div className="divGridExerciciImgs">
                    {   this.props.exercici[0] && this.props.exercici[0].arrImatges ?
                        this.props.exercici[0].arrImatges.map(
                            (v, i, a) => {
                                return (
                                    <div key={i} className="divExerciciImatges">
                                        <img className="imgExercici" src={v.imgArx.buffer} alt={v.imgArx.name} />
                                        <div className="divExerciciImgText">
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
        aquestExercici = Exercicis.find({_id: id}).fetch();//,
        //arrImatges = aquestGM.arrImatges || [];



  //console.log(props);
    return {
        clients: Clients.find().fetch(),
        exercici: Exercicis.find({_id: id}).fetch(),
        exercicis: Exercicis.find().fetch(),
        rutines: Rutines.find().fetch(),
        imatges: Imatges.find({user: Meteor.userId()}).fetch()
    }
}, ExerciciDetailsNoData);

//res: Resolutions.find({_id: this.props.id}).fetch()
//res: "Algo per dir algo..."

// imatges: Imatges.find({
//     _id: { $in: this.props.grups_musculars[0].arrImatges }
// }).fetch()
