import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
//import ReactDOM from 'react-dom';
//import Bert from 'meteor/themeteorchef:bert';
import { createContainer } from 'meteor/react-meteor-data';
import './ExerciciDetails.scss';
import Tappable from 'react-tappable';


class ExerciciDetailsNoData extends Component {
    constructor(props) {
        super(props);

        this.state = {
        //   subscription: {
        //     clients: Meteor.subscribe("userClients")
        //   }
        };

        this.handleTapEventTitol = this.handleTapEventTitol.bind(this);
        this.handlePressEventTitol = this.handlePressEventTitol.bind(this);
    }

    handleTapEventTitol() {
    //    alert("Lliiih ja has tapejat el títol!")
    }

    handlePressEventTitol() {
        this.titol.setAttribute("contenteditable", "true")
    }

    render() {
        let
            titol = new ReactiveVar(
                this.props.exercici[0]
                ?
                    <span id="spnNom">
                        {this.props.exercici[0].exerciciNom}
                    </span>
                :
                    `Carregant...`
            ),

            descripcio = new ReactiveVar(
                this.props.exercici[0]
                ?
                    this.props.exercici[0].exerciciDescripcio
                :
                    `Carregant...`
            ),

            imatgePrincipal = new ReactiveVar(
                (this.props.exercici[0] && this.props.exercici[0].arrImatges)
                ?
                    <div key={0} className="divExerciciImatgePrincipal">
                        <img
                            className="imgPrincipalExercici"
                            src={this.props.exercici[0].arrImatges[0].imgArx.buffer}
                            alt={this.props.exercici[0].arrImatges[0].imgArx.name}
                        />
                        <div className="divExerciciImgText divExerciciImgPrincipalText">
                            {this.props.exercici[0].arrImatges[0].imgText}
                        </div>
                    </div>
                :
                    `Carregant...`
            ),

            imatgesAdicionals = new ReactiveVar(
                (this.props.exercici[0] && this.props.exercici[0].arrImatges)
                ?
                    this.props.exercici[0].arrImatges.map(
                        (v, i, a) => {
                            if (i === 0) { return; }
                            return (
                                <div key={i} className="divExerciciImatges">
                                    <img className="imgExercici" src={v.imgArx.buffer} alt={v.imgArx.name} />
                                    {
                                        (v.imgText.length > 0)
                                        ?
                                            <div className="divExerciciImgText">
                                                {v.imgText}
                                            </div>
                                        :
                                            null
                                    }
                                </div>
                            );
                        }
                    )
                :
                    `Carregant...`
            )

            series = new ReactiveVar(
                (this.props.exercici[0] && this.props.exercici[0].exerciciSeriesDefault)
                ?
                    this.props.exercici[0].exerciciSeriesDefault
                :
                    `Carregant...`
            ),
            repeticions = new ReactiveVar(
                (this.props.exercici[0] && this.props.exercici[0].exerciciRepeticionsDefault)
                ?
                    this.props.exercici[0].exerciciRepeticionsDefault
                :
                    `Carregant...`
            ),
            descansMinuts = new ReactiveVar(
                (this.props.exercici[0] && this.props.exercici[0].exerciciDescansMinuts)
                ?
                    this.props.exercici[0].exerciciDescansMinuts
                :
                    `Carregant...`
            ),
            descansSegons = new ReactiveVar(
                (this.props.exercici[0] && this.props.exercici[0].exerciciDescansSegons)
                ?
                    this.props.exercici[0].exerciciDescansSegons
                :
                    `Carregant...`
            ),
            carrega = new ReactiveVar(
                (this.props.exercici[0] && this.props.exercici[0].exerciciCarrega)
                ?
                    this.props.exercici[0].exerciciCarrega
                :
                    `Carregant...`
            )
        ;

        return (
            <div id="divExercici">
                <h3
                    style={{
                        display: `inline-block`,
                        color: `rgba(100,100,100,.5)`,
                        fontStyle: `italic`,
                        fontVariant: `small-caps`,
                        textDecoration: `underline`

                    }}
                >Exercici: </h3>
                <Tappable
                    onTap={this.handleTapEventTitol}
                    onPress={this.handlePressEventTitol}
                    pressDelay={300}
                >
                    <h2
                        style={{
                            textAlign: `center`,
                            fontVariant: `small-caps`,

                            //background: `rgba(255, 255, 255, 0.5)`,
                            color: `lightsteelblue`,
                            textShadow: `1px 1px 3px grey`
                        }}
                        ref={t => this.titol = t}
                    >{titol.get()}</h2>
                </Tappable>
                <div className="divGridExerciciImgs">
                    {imatgePrincipal.get()}
                </div>
                <div className="divExerciciDescripcio">
                    {descripcio.get()}
                </div>

                <div id="divValorsPerDefecte">
                    <span id="spnSeries" className="spanDefaults">Sèries: {series.get()}</span>
                    <span id="spnRepeticions"className="spanDefaults">Repeticions: {repeticions.get()}</span>
                    <div className="divDescans">
                        <span id="spnDescansMinuts"className="spanDefaults">Descans: {descansMinuts.get()}'</span><span id="spnDescansSegons" className="spanDefaults">{descansSegons.get()}"</span>
                    </div>
                    <span id="spnCarrega" className="spanDefaults">Càrrega: {carrega.get()}%</span>
                </div>

                <div className="divGridExerciciImgs">
                    {imatgesAdicionals.get()}
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
