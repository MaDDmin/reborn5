import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
//import ReactDOM from 'react-dom';
//import Bert from 'meteor/themeteorchef:bert';
import { createContainer } from 'meteor/react-meteor-data';
import './GrupMuscularDetails.scss';
import Tappable from 'react-tappable';
import sanitizeHtml from 'sanitize-html-react';
import renderHTML from 'react-render-html';
import ActualitzaImatge from './ActualitzaImatge.jsx';
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
            </div>
          );
    }
}

class ImatgeModificable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editantImatge: false,
            tappableOnKeyDown: true,
            tappableOnMouseDown: true,
            tappableOnTouchStart: true
        }

        this.handlePressEventImatge = this.handlePressEventImatge.bind(this);
    }

    handlePressEventImatge(ev) {
    //     let clau = ev.target.dataset.clau;
    //
        this.setState({
                editantImatge: true,
                tappableOnKeyDown: false,
                tappableOnMouseDown: false,
                tappableOnTouchStart: false
        });
    }

    render() {
        return (
            <div className="divGMImatges">
                <Tappable
                    component="div"
                    onPress={this.handlePressEventImatge}
                    pressDelay={250}
                    stopPropagation={true}
                    onKeyDown={() => this.state.tappableOnKeyDown}
                    onMouseDown={() => this.state.tappableOnMouseDown}
                    onTouchStart={() => this.state.tappableOnTouchStart}
                >
                    <div style={{
                        display: `grid`,
                        gridTemplateAreas: `"imatgeModificable"`
                    }}>
                        <img
                            className="imgGM"
                            src={this.props.src}
                            alt={this.props.alt}
                            style={{
                                gridArea: `imatgeModificable`
                            }}
                        />
                        <div
                            style={{
                                gridArea: `imatgeModificable`,
                                alignSelf: `stretch`,
                                justifySelf: `center`,
                                borderRadius: `2em`,
                                overflow: `hidden`,
                                width: `100%`,
                                textAlign: `center`,
                                margin: `0 auto`
                            }}
                        >
                            <SelectorImatge
                                grup_muscular={this.props.grup_muscular}
                                isOpen={this.state.editantImatge}
                                clau={this.props.clau}
                                handleEditantImatge={this.props.handleEditantImatge}
                            />
                        </div>
                    </div>
                    <div className="divGMImgText">
                        {this.props.peu}
                    </div>
                </Tappable>
            </div>
        );
    }
}

class SelectorImatge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imatgeEstablerta: false
        }

        this.handleEstableixImatge = this.handleEstableixImatge.bind(this);
    }

    handleEstableixImatge() {
        this.setState({
            imatgeEstablerta: true
        });
    }

    render() {
        return (
            <div
                className="divOverlay"
                style={{
                    display:
                        this.props.isOpen && !this.state.imatgeEstablerta
                        ?   `grid`
                        :   `none`
                    ,
                    position: `relative`,
                    background: `rgba(50,50,50,.85)`,
                    width: `100%`,
                    height: `100%`,
                    float: `left`,
                    padding: `0 1em`,
                    zIndex: '100',
                    alignContent: `center`,
                    margin: `.5em`
                }}
            >
                <ActualitzaImatge
                    meteor_method={``}
                    grup_muscular={this.props.grup_muscular}
                    imatge_amb_text_original={this.props.imatge_amb_text_original}
                    clau={this.props.clau}
                    handleEditantImatge={this.props.handleEditantImatge}
                    handleEstableixImatge={this.handleEstableixImatge}

                />
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
