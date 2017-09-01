import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';

import InfiniteCalendar, { withRange, Calendar } from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

class LiniaExercici extends Component {
    constructor(props) {
        super(props);

        this.liniaChange = this.liniaChange.bind(this);
    }

    componentDidMount() {
    }

    selExerciciChange(ev) {
        if (!!this.selExercici.selectedOptions.length) {
            let
                exerStringified = this.selExercici.selectedOptions[0].getAttribute("data-exercici"),
                exer = JSON.parse(exerStringified);
            // Ha canviat l'exercici i hem d'actualitzar les dades que l'acompanyen ()
            this.exerciciSel = exer;
        } else {
            this.selExercici.options[0].setAttribute("selected", "selected");
        }

        this.inRepeticions.value = this.state.repeticions;
        this.inSeries.value = this.state.series;
        this.inDescans.value = this.state.descans;
        this.inMinuts.value = this.state.minuts;
    }

    altraOp() {
        this.state.repeticions = this.inRepeticions.value;
        this.state.series = this.inSeries.value;
        this.state.descans = this.inDescans.value;
        this.state.minuts = this.inMinuts.value;

        this.selExerciciChange();

        console.log(`State: ${JSON.stringify(this.state)}`);
        console.dir(toJS(this.state));
    }

    liniaChange(ev) {
    }

    render() {
        return (
            <li className="liSelEx">
                <select
                    className="selExercici"
                    ref={selExercici => this.selExercici = selExercici}
                    onChange={this.liniaChange}
                >
                    {
                        this.props.exercicis.map(exercici => (
                            <option
                                key={exercici.exerciciNom}
                                value={exercici._id}
                                data-exercici={JSON.stringify(exercici)}
                            >
                                { exercici.exerciciNom }
                            </option>
                        ))
                    }
                </select>
                <input
                    type="text"
                    placeholder="Repeticions"
                    ref={inRepeticions => this.inRepeticions = inRepeticions}
                    onChange={this.liniaChange}
                />
                <input
                    type="text"
                    placeholder="Series"
                    ref={inSeries => this.inSeries = inSeries}
                    onChange={this.liniaChange}
                />
                <input
                    type="text"
                    placeholder="Descans"
                    ref={inDescans => this.inDescans = inDescans}
                    onChange={this.liniaChange}
                />
                <input
                    type="text"
                    placeholder="Minuts"
                    ref={inMinuts => this.inMinuts = inMinuts}
                    onChange={this.liniaChange}
                />
                <table>
                    <tbody>
                        <tr>
                            <td><input type="radio" name="tipusLinia" title="Normal" value="Normal" /></td>
                            <td><input type="radio" name="tipusLinia" title="Super" value="Super" /></td>
                            <td><input type="radio" name="tipusLinia" title="Triple" value="Triple" /></td>
                            <td><input type="radio" name="tipusLinia" title="Separador" value="Separador" /></td>
                        </tr>
                    </tbody>
                </table>
                <button ref={btLiniaUp => this.btLiniaUp = btLiniaUp} ></button>
                <button ref={btLiniaDown => this.btLiniaDown = btLiniaDown} ></button>
                <button ref={btLiniaDelete => this.btLiniaDelete = btLiniaDelete} ></button>
            </li>
        );
    }
}

class LlistaExercicis extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ol
                    id="olSelEx"
                    ref={olSelEx => this.olSelEx = olSelEx}
                >
                    {this.props.children}
                </ol>
                <button
                    id="btAddEx"
                    ref={btAddEx => this.btAddEx = btAddEx}
                >
                    +
                </button>
            </div>
        );
    }
}

export default class RutinesForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rangeOfDates: {},
            selectClientsValue: ``,
            selectGMsValue: ``
        }

        this.addRutina = this.addRutina.bind(this);
        this.handleDates = this.handleDates.bind(this);
        this.selectClientsUpdateValue = this.selectClientsUpdateValue.bind(this);
        this.selectGMsUpdateValue = this.selectGMsUpdateValue.bind(this);
    }

    onAddSelEx(event) {
        event.preventDefault();
        let
            olSelEx = this.olSelEx,
            newSelEx = () => (
                <li className="liSelEx">
                    <select ref={selExercici => this.selExercici = selExercici} >
                        {
                            this.props.exercicis.map(exercici =>
                                <option key={exercici._id} value={exercici._id}>
                                    { exercici.exerciciNom }
                                </option>
                            )
                        }
                    </select>
                </li>
            );

        olSelEx.appendChild(newSelEx);
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

    handleDates(data) {
        if (data.eventType === 3) {
            // this.infCal.props.rangeOfDates.start = data.start;
            // this.infCal.props.rangeOfDates.end = data.end;

            this.setState({
                rangeOfDates: data
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
            today = new Date(),
            lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
            lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
            nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()),

            arrNomsClients = [],
            arrGMs = [];

        this.props.clients.map(
            (client) => {
                //console.log(JSON.stringify(client));
                arrNomsClients.push({
                    value: `${client._id}`,
                    label: `${client.clientCognoms}, ${client.clientNom}`,
                    className: `autoCompleteSelectOption`
                });
            }
        );

        this.props.grups_musculars.map(
            (gm) => {
                //console.log(JSON.stringify(client));
                arrGMs.push({
                    value: `${gm._id}`,
                    label: `${gm.grupMuscularNom}`,
                    className: `autoCompleteSelectOption`
                });
            }
        );

        return (
            <div id="divRutinesForm">
                <h2>Nova Rutina</h2>
                <form className="novarutina" onSubmit={this.addRutina}>
                    <input
                        type="text"
                        ref={rutinaNom => this.rutinaNom = rutinaNom}
                        placeholder="Nom de la Rutina"
                    />

                    <label>Client: </label>
                    <Select
                        value={this.state.selectClientsValue}
                        options={arrNomsClients}
                        onChange={this.selectClientsUpdateValue}
                    />

                    <label>Grup Muscular: </label>
                    <Select
                        value={this.state.selectGMsValue}
                        options={arrGMs}
                        onChange={this.selectGMsUpdateValue}
                    />

                    {/*Component= withRange(Calendar)}*/}

                    <InfiniteCalendar
                        Component={withRange(Calendar)}
                        selected={false}
                        min={lastYear}
                        minDate={lastYear}
                        max={nextYear}
                        maxDate={nextYear}

                        displayOptions={{
                        }}
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

                    <fieldset>
                        <legend>Llista d'exercicis: </legend>

                        <LlistaExercicis
                            addSelEx={this.onAddSelEx.bind(this)}
                            clients={this.props.clients}
                            grups_musculars={this.props.grups_musculars}
                            exercicis={this.props.exercicis}
                        >
                            <LiniaExercici
                                clients={this.props.clients}
                                grups_musculars={this.props.grups_musculars}
                                exercicis={this.props.exercicis}
                            />
                        </LlistaExercicis>
                    </fieldset>

                    <textarea
                        ref={rutinaDescripcio => this.rutinaDescripcio = rutinaDescripcio}
                        placeholder="Descripció de la rutina"
                    />

                    <input
                        type="submit"
                        ref={rutinaSubmit => this.rutinaSubmit = rutinaSubmit}
                        value="Introduir"
                    />
                </form>
            </div>
        );
    }
}
