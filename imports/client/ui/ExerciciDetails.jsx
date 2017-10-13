import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
//import ReactDOM from 'react-dom';
//import Bert from 'meteor/themeteorchef:bert';
import { createContainer } from 'meteor/react-meteor-data';
import './ExerciciDetails.scss';
import Tappable from 'react-tappable';
import sanitizeHtml from 'sanitize-html-react';
//import renderHTML from 'react-render-html';
import ImatgeModificableExercici from './ImatgeModificableExercici.jsx';
import PujaArxiusAmbTextRFRExercici from './PujaArxiusAmbTextRFRExercici.jsx';


class ExerciciDetailsNoData extends Component {
    constructor(props) {
        super(props);

        this.state = {
        //   subscription: {
        //     clients: Meteor.subscribe("userClients")
        //   }

            editantNom: false,
            editantImatge: NaN,
            editantDescrip: false,
            editantSeries: false,
            editantRepeticions: false,
            editantMinuts: false,
            editantSegons: false,
            editantCarrega: false
        };

        this.handleTapEventNom = this.handleTapEventNom.bind(this);
        this.handleEditantNom = this.handleEditantNom.bind(this);
        this.handleEstableixNom = this.handleEstableixNom.bind(this);

        this.handleTapEventDescrip = this.handleTapEventDescrip.bind(this);
        this.handleEditantDescrip = this.handleEditantDescrip.bind(this);
        this.handleEstableixDescrip = this.handleEstableixDescrip.bind(this);

        this.handleTapEventSeries = this.handleTapEventSeries.bind(this);
        this.handleEditantSeries = this.handleEditantSeries.bind(this);
        this.handleEstableixSeries = this.handleEstableixSeries.bind(this);

        this.handleTapEventRepeticions = this.handleTapEventRepeticions.bind(this);
        this.handleEditantRepeticions = this.handleEditantRepeticions.bind(this);
        this.handleEstableixRepeticions = this.handleEstableixRepeticions.bind(this);

        this.handleTapEventMinuts = this.handleTapEventMinuts.bind(this);
        this.handleEditantMinuts = this.handleEditantMinuts.bind(this);
        this.handleEstableixMinuts = this.handleEstableixMinuts.bind(this);

        this.handleTapEventSegons = this.handleTapEventSegons.bind(this);
        this.handleEditantSegons = this.handleEditantSegons.bind(this);
        this.handleEstableixSegons = this.handleEstableixSegons.bind(this);

        this.handleTapEventCarrega = this.handleTapEventCarrega.bind(this);
        this.handleEditantCarrega = this.handleEditantCarrega.bind(this);
        this.handleEstableixCarrega = this.handleEstableixCarrega.bind(this);
    }

    handleTapEventNom() {
        this.nom.setAttribute("contenteditable", "true");
    }
    handleEditantNom() {
        this.setState({
            editantNom: true
        });
    }
    handleEstableixNom() {
        Meteor.call(
            'exercicis.nom.update',
            this.props.exercici[0],
            this.nom.innerHTML
        );
        this.nom.setAttribute("contenteditable", "false");
        this.setState({
            editantNom: false
        });
    }

    // handlePressEventTitol() {
    //     this.titol.setAttribute("contenteditable", "true")
    // }

    handleEditantImatge(clau) {
        this.setState({
            editantImatge: clau
        })
    }

    handleTapEventDescrip() {
        this.descrip.setAttribute("contenteditable", "true");
    }
    handleEditantDescrip() {
        this.setState({
            editantDescrip: true
        });
    }
    handleEstableixDescrip() {
        Meteor.call(
            'exercicis.descrip.update',
            this.props.exercici[0],
            this.descrip.innerHTML
        );
        this.descrip.setAttribute("contenteditable", "false");
        this.setState({
            editantDescrip: false
        });
    }

    handleTapEventSeries() {
        this.series.setAttribute("contenteditable", "true");
    }
    handleEditantSeries() {
        this.setState({
            editantSeries: true
        });
    }
    handleEstableixSeries() {
        Meteor.call(
            'exercicis.series.update',
            this.props.exercici[0],
            this.series.innerHTML
        );
        this.series.setAttribute("contenteditable", "false");
        this.setState({
            editantSeries: false
        });
    }

    handleTapEventRepeticions() {
        this.repeticions.setAttribute("contenteditable", "true");
    }
    handleEditantRepeticions() {
        this.setState({
            editantRepeticions: true
        });
    }
    handleEstableixRepeticions() {
        Meteor.call(
            'exercicis.repeticions.update',
            this.props.exercici[0],
            this.repeticions.innerHTML
        );
        this.repeticions.setAttribute("contenteditable", "false");
        this.setState({
            editantRepeticions: false
        });
    }

    handleTapEventMinuts() {
        this.minuts.setAttribute("contenteditable", "true");
    }
    handleEditantMinuts() {
        this.setState({
            editantMinuts: true
        });
    }
    handleEstableixMinuts() {
        Meteor.call(
            'exercicis.minuts.update',
            this.props.exercici[0],
            this.minuts.innerHTML
        );
        this.minuts.setAttribute("contenteditable", "false");
        this.setState({
            editantMinuts: false
        });
    }

    handleTapEventSegons() {
        this.segons.setAttribute("contenteditable", "true");
    }
    handleEditantSegons() {
        this.setState({
            editantSegons: true
        });
    }
    handleEstableixSegons() {
        Meteor.call(
            'exercicis.segons.update',
            this.props.exercici[0],
            this.segons.innerHTML
        );
        this.segons.setAttribute("contenteditable", "false");
        this.setState({
            editantSegons: false
        });
    }

    handleTapEventCarrega() {
        this.carrega.setAttribute("contenteditable", "true");
    }
    handleEditantCarrega() {
        this.setState({
            editantCarrega: true
        });
    }
    handleEstableixCarrega() {
        Meteor.call(
            'exercicis.carrega.update',
            this.props.exercici[0],
            this.carrega.innerHTML
        );
        this.carrega.setAttribute("contenteditable", "false");
        this.setState({
            editantCarrega: false
        });
    }

    render() {
        let
            titol = new ReactiveVar(
                this.props.exercici[0]
                ?   <div>
                        <Tappable
                            onTap={this.handleTapEventNom}
                        >
                            <span
                                id="spnNom"
                                ref={nom => this.nom = nom}
                                onInput={this.handleEditantNom}
                            >
                                {this.props.exercici[0].exerciciNom}
                            </span>
                        </Tappable>
                        <button
                            style={{
                                visibility: this.state.editantNom ? `visible` : `hidden`,
                                display: this.state.editantNom ? `inline-block` : `none`
                            }}
                            onClick={this.handleEstableixNom}
                        >Estableix el nom
                        </button>
                    </div>
                :
                    `Carregant...`
            ),

            descripcio = new ReactiveVar(
                this.props.exercici[0]
                    ?   this.props.exercici[0].exerciciDescripcio
                    :   `Carregant...`
            ),

            imatgePrincipal = new ReactiveVar(
                (this.props.exercici[0] && this.props.exercici[0].arrImatges)
                ?
                    // <div key={0} className="divExerciciImatgePrincipal">
                    //     <img
                    //         className="imgPrincipalExercici"
                    //         src={this.props.exercici[0].arrImatges[0].imgArx.buffer}
                    //         alt={this.props.exercici[0].arrImatges[0].imgArx.name}
                    //     />
                    //     <div className="divExerciciImgText divExerciciImgPrincipalText">
                    //         {this.props.exercici[0].arrImatges[0].imgText}
                    //     </div>
                    // </div>
                    //<<<<<<<<<<<<<<
                    <div key={0} className="divExerciciImatgePrincipal">
                        <ImatgeModificableExercici
                            clau={0}
                            className="imgPrincipalExercici"
                            src={this.props.exercici[0].arrImatges[0].imgArx.buffer}
                            alt={this.props.exercici[0].arrImatges[0].imgArx.name}
                            peu={this.props.exercici[0].arrImatges[0].imgText}
                            exercici={this.props.exercici[0]}
                            imatge_amb_text_original={this.props.exercici[0].arrImatges[0]}
                            handleEditantImatge={this.handleEditantImatge}
                        />
                    </div>

                : `Carregant...`
            ),

            imatgesAdicionals = new ReactiveVar(
                (this.props.exercici[0] && this.props.exercici[0].arrImatges)
                ?
                    this.props.exercici[0].arrImatges.map(
                        (v, i, a) => {
                            if (i === 0) { return; }
                            return (
                                <div key={i} className="divExerciciImatges">
                                    {// <img className="imgExercici" src={v.imgArx.buffer} alt={v.imgArx.name} />
                                    // {
                                    //     (v.imgText.length > 0)
                                    //     ?   <div className="divExerciciImgText">
                                    //             {v.imgText}
                                    //         </div>
                                    //     :   null
                                    // }
                                    }
                                    <ImatgeModificableExercici
                                        clau={i}
                                        className="imgExercici"
                                        src={this.props.exercici[0].arrImatges[i].imgArx.buffer}
                                        alt={this.props.exercici[0].arrImatges[i].imgArx.name}
                                        peu={this.props.exercici[0].arrImatges[i].imgText}
                                        exercici={this.props.exercici[0]}
                                        imatge_amb_text_original={this.props.exercici[0].arrImatges[i]}
                                        handleEditantImatge={this.handleEditantImatge}
                                    />
                                </div>
                            );
                        }
                    )
                :
                    `Carregant...`
            )

            series = new ReactiveVar(
                this.props.exercici[0] && this.props.exercici[0].exerciciSeriesDefault
                    ? <div
                        style={{
                            display: `inline-block`
                        }}
                      >
                            <Tappable
                                onTap={this.handleTapEventSeries}
                            >
                                <span
                                    id="spnSeries"
                                    ref={ser => this.series = ser}
                                    onInput={this.handleEditantSeries}
                                  >
                                    { this.props.exercici[0].exerciciSeriesDefault }
                                  </span>
                            </Tappable>
                            <button
                                style={{
                                    visibility: this.state.editantSeries ? `visible` : `hidden`,
                                    display: this.state.editantSeries ? `inline-block` : `none`
                                }}
                                onClick={this.handleEstableixSeries}
                            >Estableix les sèries
                            </button>
                        </div>
                    : `Carregant...`
            ),
            repeticions = new ReactiveVar(
                this.props.exercici[0] && this.props.exercici[0].exerciciRepeticionsDefault
                    ? <div
                        style={{
                            display: `inline-block`
                        }}
                      >
                            <Tappable
                                onTap={this.handleTapEventRepeticions}
                            >
                                <span
                                    id="spnRepeticions"
                                    ref={rep => this.repeticions = rep}
                                    onInput={this.handleEditantSeries}
                                  >
                                    { this.props.exercici[0].exerciciRepeticionsDefault }
                                  </span>
                            </Tappable>
                            <button
                                style={{
                                    visibility: this.state.editantRepeticions ? `visible` : `hidden`,
                                    display: this.state.editantRepeticions ? `inline-block` : `none`
                                }}
                                onClick={this.handleEstableixRepeticions}
                            >Estableix les repeticions
                            </button>
                        </div>
                    : `Carregant...`
            ),
            descansMinuts = new ReactiveVar(
                this.props.exercici[0] && this.props.exercici[0].exerciciDescansMinuts
                    ? <div
                        style={{
                            display: `inline-block`
                        }}
                      >
                            <Tappable
                                onTap={this.handleTapEventMinuts}
                            >
                                <span
                                    id="spnMinuts"
                                    ref={min => this.minuts = min}
                                    onInput={this.handleEditantMinuts}
                                  >
                                    { this.props.exercici[0].exerciciDescansMinuts }
                                  </span>
                            </Tappable>
                            <button
                                style={{
                                    visibility: this.state.editantMinuts ? `visible` : `hidden`,
                                    display: this.state.editantMinuts ? `inline-block` : `none`
                                }}
                                onClick={this.handleEstableixMinuts}
                            >Estableix els minuts
                            </button>
                        </div>
                    : `Carregant...`
            ),
            descansSegons = new ReactiveVar(
                this.props.exercici[0] && this.props.exercici[0].exerciciDescansSegons
                    ? <div
                        style={{
                            display: `inline-block`
                        }}
                      >
                            <Tappable
                                onTap={this.handleTapEventSegons}
                            >
                                <span
                                    id="spnSegons"
                                    ref={seg => this.segons = seg}
                                    onInput={this.handleEditantSegons}
                                  >
                                    { this.props.exercici[0].exerciciDescansSegons.length === 1
                                        ? `0${this.props.exercici[0].exerciciDescansSegons}`
                                        : this.props.exercici[0].exerciciDescansSegons
                                    }
                                  </span>
                            </Tappable>
                            <button
                                style={{
                                    visibility: this.state.editantSegons ? `visible` : `hidden`,
                                    display: this.state.editantSegons ? `inline-block` : `none`
                                }}
                                onClick={this.handleEstableixSegons}
                            >Estableix els segons
                            </button>
                        </div>
                    : `Carregant...`
            ),
            carrega = new ReactiveVar(
                (this.props.exercici[0] && this.props.exercici[0].exerciciCarrega)
                    ? <div
                        style={{
                            display: `inline-block`
                        }}
                      >
                            <Tappable
                                onTap={this.handleTapEventCarrega}
                            >
                                <span
                                    id="spnCarrega"
                                    ref={car => this.carrega = car}
                                    onInput={this.handleEditantCarrega}
                                  >
                                    { this.props.exercici[0].exerciciCarrega }
                                  </span>
                            </Tappable>
                            <button
                                style={{
                                    visibility: this.state.editantCarrega ? `visible` : `hidden`,
                                    display: this.state.editantCarrega ? `inline-block` : `none`
                                }}
                                onClick={this.handleEstableixCarrega}
                            >Estableix la carrega
                            </button>
                        </div>
                    : `Carregant...`
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

                <h2
                    style={{
                        textAlign: `center`,
                        fontVariant: `small-caps`,

                        //background: `rgba(255, 255, 255, 0.5)`,
                        color: `lightsteelblue`,
                        textShadow: `1px 1px 3px grey`
                    }}
                    ref={t => this.titol = t}
                >{titol.get()}
                </h2>

                <div className="divGridExerciciImgs">
                    {imatgePrincipal.get()}
                </div>

                <Tappable
                    onTap={this.handleTapEventDescrip}
                >
                    <div
                        className="divExerciciDescripcio"
                        ref={d => this.descrip = d}
                        onInput={this.handleEditantDescrip}
                    >
                        {descripcio.get()}
                    </div>
                </Tappable>
                <button
                    style={{
                        visibility: this.state.editantDescrip ? `visible` : `hidden`,
                        display: this.state.editantDescrip ? `inline-block` : `none`
                    }}
                    onClick={this.handleEstableixDescrip}
                >Estableix la descripció
                </button>

                <div
                    id="divValorsPerDefecte"

                    style={{
                        display: `inline-block`
                    }}
                >
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
                <div
                    style={{
                        display:
                        this.state.afegitFet
                        ? `none`
                        : `grid`
                    }}
                >
                    <AfegeixImatges
                        exercici={this.props.exercici[0]}
                        afegitFet={this.afegitFet}
                    />
                </div>
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
                <PujaArxiusAmbTextRFRExercici
                    exercici={this.props.exercici}
                    afegitFet={this.props.afegitFet}
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
