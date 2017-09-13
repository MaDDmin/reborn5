import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';

import InfiniteCalendar, { withRange, Calendar } from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { getISOWeek, startOfWeek, compareDesc, endOfWeek } from 'date-fns';

import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

import Modal from 'react-modal';

import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const
    today = new Date(),
    lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
    lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
    nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()),

    Avatar = (props) =>
        <img
            src={
                props.client ? (
                    props.client.value.arrImatges[0] ?
                    props.client.value.arrImatges[0].imgArx.buffer :
                    `anon0.jpg`
                ) : `anon0.jpg`
            }
            alt="Avatar del client"
            style={{
                borderRadius: `10em`,
                maxWidth: `12em`,
                maxHeight: `12em`,
                display: `inline-block`,
                boxShadow: `0 .2em .1em black`
            }}
        />

Modal.defaultStyles = {
    overlay: {
        position: 'fixed',
        display: 'grid',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor : 'rgba(255, 255, 255, 0.75)',
        zIndex: 200000
    },
    content: {
        alignSelf: `center`,
        padding: `5%`,
        margin: `5%`,
        border: `1px solid gray`,
        borderRadius: `2em`,
        boxShadow: `0 .2em .3em gray`,
        background      : `rgba(252,124,5,.7)`
    }
};



class Rutina extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rangeOfDates: {},
            selectClientsValue: ``,
            selectGMsValue: ``,
            maxIndexExercicis: 0,
            setmanes: {}
        }

        this.addRutina = this.addRutina.bind(this);
        this.handleDates = this.handleDates.bind(this);
        this.selectClientsUpdateValue = this.selectClientsUpdateValue.bind(this);
        this.selectGMsUpdateValue = this.selectGMsUpdateValue.bind(this);
        this.afegeixSetmanaAlStateDeLaRutina = this.afegeixSetmanaAlStateDeLaRutina.bind(this);
    }

    addRutina(event) {
        event.preventDefault();
        let
            rutinaNom = this.rutinaNom.value.trim(),
            rutinaClient = this.selClient.selectedOptions[0].value,
            rutinaGrupMuscular = this.selGrupMuscular.selectedOptions[0].value,
            rutinaDescripcio = this.rutinaDescripcio.value.trim(),

            rutinaDataInici = this.state.rangeOfDates.start,
            rutinaDataFi = this.state.rangeOfDates.end;

        if (rutinaNom) {
            Meteor.call(
                'rutines.insert',
                rutinaNom,
                rutinaClient,
                rutinaGrupMuscular,
                rutinaDataInici,
                rutinaDataFi,
                rutinaDescripcio,
                (error, data) => {
                    if (error) {
                        Bert.alert("Logueja't abans d'introduir dades.", "danger", "fixed-top", "fa-frown-o");
                    } else {
                        this.rutinaNom.value = "";
                        this.rutinaDescripcio.value = "";
                    }
                }
            );
        }
    }

    afegeixSetmanaAlStateDeLaRutina(nSetmana, setmana) {

        this.setState(
            (previousState, props) => {
                let
                    setmanes = previousState.setmanes;

                //setmanes.push(setmana);
                Object.assign(setmanes, setmana);
                return ({
                    setmanes
                });
            }
        );
    }

    handleDates(data) {
        let
            setmanes = {},
            rangeOfDates = data,
            nSetmanes = getISOWeek(data.end) - getISOWeek(data.start) + 1,
            dataIniSetmana,
            dataFiSetmana,
            nSetmanaISO,
            nSetmanaRutina,
            setmana,
            extremsSetmanes,
            finalPrimeraSetmana,
            iniciUltimaSetmana;

        if (data.eventType === 3) {
            // this.infCal.props.rangeOfDates.start = data.start;
            // this.infCal.props.rangeOfDates.end = data.end;

            // El final de la primera setmana sempre serà endOfWeek(rangeOfDates.start) si aquesta és posterior a rangeOfDates.end.

            if (compareDesc(rangeOfDates.end, endOfWeek(rangeOfDates.start, {weekStartsOn: 1})) === 1) {
                finalPrimeraSetmana = rangeOfDates.end;
            } else {
                finalPrimeraSetmana = endOfWeek(rangeOfDates.start, {weekStartsOn: 1});
            }

            //----

            if (nSetmanes === 1) {
                iniciUltimaSetmana = rangeOfDates.start;
            } else {
                iniciUltimaSetmana = startOfWeek(rangeOfDates.end, {weekStartsOn: 1});
            }

            extremsSetmanes = Object.assign(
                {},

                { 1: {
                    start: rangeOfDates.start,
                    end: finalPrimeraSetmana
                }},

                { [nSetmanes]: {
                    start: iniciUltimaSetmana,
                    end: rangeOfDates.end
                }}
            );

            for (let i = 1; i < nSetmanes; i += 1) {

                if (i === 1) {
                    dataIniSetmana = extremsSetmanes[1].start;
                    dataFiSetmana = extremsSetmanes[1].end;
                } else {
                    dataIniSetmana = new Date(extremsSetmanes[i-1].end.getFullYear(), extremsSetmanes[i-1].end.getMonth(), extremsSetmanes[i-1].end.getDate() + 1);
                    dataFiSetmana = endOfWeek(dataIniSetmana, {weekStartsOn: 1});
                }

                Object.assign(
                    extremsSetmanes,

                    { [i]: {
                        start: dataIniSetmana,
                        end: dataFiSetmana
                    }}
                );
            }

            // dataIniSetmana = startOfWeek(rangeOfDates.start, {weekStartsOn: 1});
            // setmana = {
            //     [this.props.nSetmana]: {
            //         start: "",
            //         end: "",
            //         nSetmanaRutina,
            //         dataIniSetmana,
            //         extremsSetmanes
            //     }
            // };

            this.setState({
                rangeOfDates,
                nSetmanes,
                setmanes,
                extremsSetmanes
            });
        }
    }

    selectClientsUpdateValue(selectClientsValue) {
        this.setState({ selectClientsValue });
    }

    selectGMsUpdateValue(selectGMsValue) {
        this.setState({ selectGMsValue });
    }

    render() {
        let
            arrNomsClients = [];

        this.props.clients.map(
            (client) => {
                //console.log(JSON.stringify(client));
                arrNomsClients.push({
                    value: client,
                    label: `${client.clientCognoms}, ${client.clientNom}`,
                    className: `autoCompleteSelectOption`
                });
            }
        );
        return (
            <div>
                <Avatar client={this.state.selectClientsValue} />

                <Select
                    value={this.state.selectClientsValue}
                    options={arrNomsClients}
                    onChange={this.selectClientsUpdateValue}
                />

                <InfiniteCalendar
                    Component={withRange(Calendar)}
                    selected={false}
                    min={lastYear}
                    minDate={lastYear}
                    max={nextYear}
                    maxDate={nextYear}
                    displayOptions={{}}
                    locale={{
                        locale: require('date-fns/locale/ca'),
                        headerFormat: 'ddd, D MMM',
                        weekdays: ["Dmg","Dll","Dm","Dcs","Djs","Dvs","Dss"],
                        weekStartsOn: 1,
                        blank: 'Selecciona una data',
                        todayLabel: {
                            long: 'Anar a avui',
                            short: 'Avui.'
                        }
                    }}
                    ref={infCal => this.infCal = infCal}
                    onSelect={this.handleDates}
                />

                <textarea
                    ref={ta => this.taObservacionsRutina = ta}
                    className="taObservacions"
                    id="taObservacionsRutina"
                />

                <BotonsSetmanesIModal
                    rangeOfDates={this.state.rangeOfDates}
                    nSetmanes={this.state.nSetmanes}
                    afegeixSetmanaAlStateDeLaRutina={this.afegeixSetmanaAlStateDeLaRutina}
                    setmanes={this.state.setmanes}
                    extremsSetmanes={this.state.extremsSetmanes}
                />
            </div>
        );
    }
}


class BotonsSetmanesIModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        }

        this.showModal = this.showModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.triaSetmana = this.triaSetmana.bind(this);
    }

    showModal(setmana) {
        this.setState({
            showModal: true,
            editant: setmana
        });
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
            nSetmanaRutina: null
        });
    }

    triaSetmana(nSetmanaRutina, setmana) {
        this.setState({
            nSetmanaRutina,
            setmana
        });

        //this.props.afegeixSetmanaAlStateDeLaRutina(nSetmanaRutina, setmana);
    }

    render() {
        let
            arrSetmanes = [];

        if (!!this.props.nSetmanes) {
            for (let i = 1; i <= this.props.nSetmanes; i += 1) {
                arrSetmanes.push(
                    <SetmanaButton
                        key={i}
                        nSetmana={i}
                        setmanes={this.props.setmanes}
                        rangeOfDates={this.props.rangeOfDates}
                        extremsSetmanes={this.props.extremsSetmanes}
                        triaSetmana={this.triaSetmana}
                        afegeixSetmanaAlStateDeLaRutina={this.props.afegeixSetmanaAlStateDeLaRutina}
                        showModal={this.showModal}
                    />
                );
            }
            return (
                <div id="arrSetm">
                    {arrSetmanes}
                    <div
                        id="divSetmanesForms"
                        ref={divSetmanesForms => this.divSetmanesForms = divSetmanesForms}
                    >
                        <Modal
                            isOpen={this.state.showModal}
                            contentLabel="Modal"
                            ariaHideApp={true}
                        >
                            <button onClick={this.handleCloseModal}>x</button>
                            <ModalFormContent
                                afegeixSetmanaAlStateDeLaRutina={this.props.afegeixSetmanaAlStateDeLaRutina}
                                setmana={this.state.setmana}
                            />
                        </Modal>
                    </div>
                </div>
            );
        }
        return null;
    }
}


class SetmanaButton extends Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(ev) {
        let
            rangeOfDates = this.props.rangeOfDates,
            nSetmanes = this.props.nSetmanes,
            dataIniSetmana,
            dataFiSetmana,
            nSetmanaRutina = this.props.nSetmana,
            nSetmanaISO = getISOWeek(this.props.extremsSetmanes[nSetmanaRutina].start),
            setmana,
            setmanes = this.props.setmanes,
            extremsSetmanes = this.props.extremsSetmanes,
            finalPrimeraSetmana,
            sessions = {},
            iniciUltimaSetmana,
            setmanaObj = {
                start: extremsSetmanes[nSetmanaRutina].start,
                end: extremsSetmanes[nSetmanaRutina].end,
                nSetmanaRutina,
                nSetmanaISO,
                sessions
            };


        setmana = {
            [this.props.nSetmana]: {
                start: extremsSetmanes[nSetmanaRutina].start,
                end: extremsSetmanes[nSetmanaRutina].end,
                nSetmanaRutina,
                nSetmanaISO,
                sessions
            }
        };

        this.props.triaSetmana(nSetmanaRutina, setmanaObj);
        this.props.afegeixSetmanaAlStateDeLaRutina(nSetmanaRutina, setmana);
        this.props.showModal(setmanaObj);
    }

    render() {
        return (
            <button
                onClick={this.handleOnClick}
            >
                { `Setmana ${this.props.nSetmana}` }
            </button>
        );
    }
}

// >>>>><<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// TODO: Aquest component capta totes les dades necessàries per dibuixar el diàleg modal mitjançant props (children pels camps i altres per la gestió de les dades)...
// >>>>>          El reutilitzarem per a cada Modal... (amb recursivitat inclosa!)  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
class ModalFormContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sessions: {},
            showModal: false,
            ta: ""
        }

        this.showModal = this.showModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleEstableixSessio = this.handleEstableixSessio.bind(this);
    //    this.triaSetmana = this.triaSetmana.bind(this);
    }

    showModal(sessio) {
        this.setState({
            showModal: true,
            editant: sessio
        });
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
            nSetmanaRutina: null
        });
    }

    handleEstableixSessio(setmana) {
        let
            sessio = {
                descripDeProva: this.ta.value
            },
            sessions = [];

        sessions.push(sessio);

        Object.assign(setmana, { sessions });
        this.props.afegeixSetmanaAlStateDeLaRutina(setmana.nSetmanaRutina, setmana);
    }

    render() {
        let
            setmana = this.props.setmana;

        return (
            <div>
                <div>{`Data Inici Setmana: ${this.props.setmana.start.getDate()}`}</div>
                <div>{`Data Final Setmana: ${this.props.setmana.end.getDate()}`}</div>
                <div>Nº de setmana ISO: {this.props.setmana.nSetmanaISO}</div>
                <div>Nº de setmana de Rutina: {this.props.setmana.nSetmanaRutina}</div>

                <textarea
                    ref={(ta) => {this.ta = ta;}}
                    placeholder="Escriu alguna cosa per provar que guardem la sessió..."
                />
                <button onClick={() => {this.handleEstableixSessio(setmana);}}>
                    Estableix la sessió
                </button>

                <button
                    onClick={this.showModal}
                >
                    Nova sessió
                </button>

                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Modal"

                    ariaHideApp={true}
                    shouldCloseOnOverlayClick={true}
                >
                    <button onClick={this.handleCloseModal}>&times;</button>
                    <SessioFormContent />
                </Modal>
            </div>
        );
    }
}

class SessioFormContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            parts: {},
            showModal: false
        }

        this.showModal = this.showModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    //    this.triaSetmana = this.triaSetmana.bind(this);
    }

    showModal(part) {
        this.setState({
            showModal: true,
            editant: part
        });
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
            nSetmanaRutina: null
        });
    }

    handleEstableixSessio() {

    }

    render() {
        return (
            <div>
                <textarea placeholder="Escriu alguna cosa per provar que guardem la sessió..." />
                <button onClick={this.handleEstableixSessio}>
                    Estableix la sessió
                </button>

                <button
                    onClick={this.showModal}
                >
                    Nova part
                </button>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Modal"

                    ariaHideApp={true}
                    shouldCloseOnOverlayClick={true}
                >
                    <button onClick={this.handleCloseModal}>&times;</button>
                    <PartFormContent

                    />
                </Modal>
            </div>
        );
    }
}


class PartFormContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exercicis: {},
            showModal: false
        }

        this.showModal = this.showModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    //    this.triaSetmana = this.triaSetmana.bind(this);
    }

    showModal(part) {
        this.setState({
            showModal: true,
            editant: part
        });
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
            nSetmanaRutina: null
        });
    }

    render() {
        return (
            <div>
                <span>SESSIO: </span>
                <span>DataFi: </span>
                <span>Nº de setmana ISO: </span>
                <span>Nº de setmana de Rutina: </span>

                <button
                    onClick={this.showModal}
                >
                    Nou exercici
                </button>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Modal"
                    ariaHideApp={true}
                    shouldCloseOnOverlayClick={true}
                >
                    <button onClick={this.handleCloseModal}>&times;</button>
                    <ExerciciFormContent

                    />
                </Modal>
            </div>
        );
    }
}


class ExerciciFormContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exercicis: {},
            showModal: false
        }

        this.showModal = this.showModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    //    this.triaSetmana = this.triaSetmana.bind(this);
    }

    showModal(exercici) {
        this.setState({
            showModal: true,
            editant: exercici
        });
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
            nSetmanaRutina: null
        });
    }

    render() {
        return (
            <div>
                <span>SESSIO: </span>
                <span>DataFi: </span>
                <span>Nº de setmana ISO: </span>
                <span>Nº de setmana de Rutina: </span>

                <button
                    onClick={() => {
                        alert(`Nou exercici`);
                    }}
                >
                    Nou exercici
                </button>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Modal"
                    ariaHideApp={true}
                    shouldCloseOnOverlayClick={true}
                >
                    <button onClick={this.handleCloseModal}>&times;</button>

                    <h1>I prou per ara...</h1>
                </Modal>
            </div>
        );
    }
}


export default Rutina;
