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
        this.afegeixSetmanaAlState = this.afegeixSetmanaAlState.bind(this);
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

    afegeixSetmanaAlState(nSetmana, setmana) {

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
                    afegeixSetmanaAlState={this.afegeixSetmanaAlState}
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
    }

    showModal(setmana) {
        this.setState({
            showModal: true
        });
    }

    handleCloseModal() {
        this.setState({
            showModal: false
        });
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
                        afegeixSetmanaAlState={this.props.afegeixSetmanaAlState}
                        showModal={this.showModal}
                    />
                );
            }
            return (
                <div id="arrSetm">
                    {arrSetmanes}
                    <div
                        id="divSetmanesForms"
                        key={divSetmanesForms => this.divSetmanesForms = divSetmanesForms}
                    >
                        <Modal
                            isOpen={this.state.showModal}
                            contentLabel="Modal"
                            portalClassName="ReactModalPortal"
                            overlayClassName="ReactModal__Overlay"
                            className="ReactModal__Content"
                            ariaHideApp={true}
                            shouldCloseOnOverlayClick={true}
                        >
                            <button onClick={this.handleCloseModal}>x</button>
                            <SetmanaForm
                                dataIni={new Date()}
                                dataFi={new Date()}
                                nSetmanaISO={getISOWeek(new Date())}
                                nSetmanaRutina={10}
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
            iniciUltimaSetmana;

        setmana = {
            [this.props.nSetmana]: {
                start: extremsSetmanes[nSetmanaRutina].start,
                end: extremsSetmanes[nSetmanaRutina].end,
                nSetmanaRutina,
                nSetmanaISO,
                sessions
            }
        };

        this.props.afegeixSetmanaAlState(this.props.nSetmana, setmana);
        this.props.showModal(setmana);


    //    alert(`Botó de la setmana ${this.props.nSetmana}`);
        //alert(`Botó de la setmana ${ev.target.dataset.n_setmana}`);
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

class SetmanaForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span>DataIni: {JSON.stringify(this.props.dataIni)}</span>
                <span>DataFi: {JSON.stringify(this.props.dataFi)}</span>
                <span>Nº de setmana ISO: {this.props.nSetmanaISO}</span>
                <span>Nº de setmana de Rutina: {this.props.nSetmanaRutina}</span>
            </div>
        );
    }
}

export default Rutina;
