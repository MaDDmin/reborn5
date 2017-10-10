import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
//import ReactDOM from 'react-dom';
//import Bert from 'meteor/themeteorchef:bert';
import { createContainer } from 'meteor/react-meteor-data';
import './GrupMuscularDetails.scss';
import Tappable from 'react-tappable';
import sanitizeHtml from 'sanitize-html-react';
//import renderHTML from 'react-render-html';
import ImatgeModificable from './ImatgeModificable.jsx';
import PujaArxiusAmbTextRFR from './PujaArxiusAmbTextRFR.jsx';
//import Modal from 'react-modal';


// Modal.defaultStyles = {
//     overlay: {
//         position: 'relative',
//         display: 'grid',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         background: 'rgba(5, 5, 5, 0.75)',
//         zIndex: 200000
//     },
//     content:{
//         alignSelf: `center`,
//         padding: `5%`,
//         margin: `5%`,
//         border: `1px solid gray`,
//         borderRadius: `2em`,
//         boxShadow: `0 .2em .3em gray`,
//         background      : `rgba(252,124,5,.7)`
//     }
// };

class GrupMuscularDetailsNoData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editantTitol: false,
            editantDescrip: false,
            editantImatge: NaN
        };

        this.handleTapEventTitol = this.handleTapEventTitol.bind(this);
        this.handleEditaTitol = this.handleEditaTitol.bind(this);
        this.handleEstableixTitol = this.handleEstableixTitol.bind(this);

        this.handleTapEventDescrip = this.handleTapEventDescrip.bind(this);
        this.handleEditaDescrip = this.handleEditaDescrip.bind(this);
        this.handleEstableixDescrip = this.handleEstableixDescrip.bind(this);
        this.handleEditantImatge = this.handleEditantImatge.bind(this);

        this.handleImatgesPujades = this.handleImatgesPujades.bind(this);
    }

    handleTapEventTitol() {
        this.titol.setAttribute("contenteditable", "true");
    }
    handleEditaTitol() {
        this.setState({
            editantTitol: true
        });
    }
    handleEstableixTitol() {
        Meteor.call(
            'grups_musculars.nom.update',
            this.props.grup_muscular[0],
            this.titol.innerHTML
        );
        this.titol.setAttribute("contenteditable", "false");
        this.setState({
            editantTitol: false
        });
    }

    handleTapEventDescrip() {
        this.descrip.setAttribute("contenteditable", "true");
    }
    handleEditaDescrip() {
        this.setState({
            editantDescrip: true
        });
    }
    handleEstableixDescrip() {
        Meteor.call(
            'grups_musculars.descrip.update',
            this.props.grup_muscular[0],
            this.descrip.innerHTML
        );
        this.descrip.setAttribute("contenteditable", "false");
        this.setState({
            editantDescrip: false
        });
    }

    handleEditantImatge(clau) {
        this.setState({
            editantImatge: clau
        })
    }

    handleImatgesPujades(arrImatgesPujades) {
        this.setState({
            arrImatgesPujades
        });
    }

    addImatgesPujades() {
        Meteor.call('grups_musculars.imatges.afegeix',
            this.props.grup_muscular[0],
            this.state.arrImatgesPujades
        );
    }

    render() {
    //console.log(this.props.res);

    /*if (this.props.clients.ready()) {*/
        return (
            <div id="divGrupMuscular">

                <h2>Grup Muscular: </h2>
                <Tappable
                    onTap={this.handleTapEventTitol}
                >
                    <h4
                        id="titolGM"
                        ref={tit => this.titol = tit}
                        onInput={this.handleEditaTitol}
                    >
                        {
                            this.props.grup_muscular[0] ? this.props.grup_muscular[0].grupMuscularNom :
                            `Carregant...`
                        }
                    </h4>
                </Tappable>
                <button
                    style={{
                        visibility: this.state.editantTitol ? `visible` : `hidden`,
                        display: this.state.editantTitol ? `inline-block` : `none`
                    }}
                    onClick={this.handleEstableixTitol}
                >Estableix el nom</button>

                <Tappable
                    onTap={this.handleTapEventDescrip}
                >
                    <div
                        className="divGMDescrip"
                        ref={descrip => this.descrip = descrip}
                        onInput={this.handleEditaDescrip}
                        dangerouslySetInnerHTML={{
                            __html: this.props.grup_muscular[0] ?
                                sanitizeHtml(this.props.grup_muscular[0].grupMuscularDescripcio) :
                                `Carregant...`
                        }}
                    ></div>
                </Tappable>
                <button
                    style={{
                        visibility: this.state.editantDescrip ? `visible` : `hidden`,
                        display: this.state.editantDescrip ? `inline-block` : `none`
                    }}
                    onClick={this.handleEstableixDescrip}
                >Estableix la descripció</button>

                <div className="divGridGMImgs">
                    {   this.props.grup_muscular[0] ?
                        this.props.grup_muscular[0].arrImatges.map(
                            (v, i, a) => {
                                return (
                                    <ImatgeModificable
                                        key={i}
                                        clau={i}
                                        src={v.imgArx.buffer}
                                        alt={v.imgArx.name}
                                        peu={v.imgText}
                                        grup_muscular={this.props.grup_muscular[0]}
                                        imatge_amb_text_original={v}
                                        handleEditantImatge={this.handleEditantImatge}
                                    />
                                );
                            }
                        ) :
                        `Carregant...`
                    }
                </div>

                <AfegeixImatges />
            </div>
          );
    }
}

class AfegeixImatges extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imatgesPujades: []
        }
    }

    render() {
        return (
            <div
                style={{
                    display: `grid`
                }}
            >
                <PujaArxiusAmbTextRFR />
            </div>
        );
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
        aquestGM = GrupsMusculars.find({_id: id}).fetch();//,
        //arrImatges = aquestGM.arrImatges || [];



  //console.log(props);
    return {
        grups_musculars: GrupsMusculars.find().fetch(),
        grup_muscular: GrupsMusculars.find({_id: id}).fetch(),
        exercicis: Exercicis.find().fetch(),
        rutines: Rutines.find().fetch(),
        imatges: Imatges.find({user: Meteor.userId()}).fetch()
    }
}, GrupMuscularDetailsNoData);

//res: Resolutions.find({_id: this.props.id}).fetch()
//res: "Algo per dir algo..."

// imatges: Imatges.find({
//     _id: { $in: this.props.grups_musculars[0].arrImatges }
// }).fetch()
