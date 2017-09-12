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


export default class LiniaExercici extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectExercicisValue: {
                value: `zzz`
            }
        };

        this.handleSelectExercicisUpdateValue = this.handleSelectExercicisUpdateValue.bind(this);
        // this.selExercici.map((sE, index) =>
        //     sE = this.selExercici[index].bind(this);
        // );
    }

    handleSelectExercicisUpdateValue(selectExercicisValue) {
        this.setState({ selectExercicisValue });
    }

    render() {
        let
            arrExercicis = [];

        this.props.exercicis.map(
            (exer) => {
                //console.log(JSON.stringify(client));
                arrExercicis.push({
                    value: exer,
                    label: `${exer.exerciciNom}`,
                    className: `autoCompleteSelectOption`
                });
            }
        );

        return (
            <li className="liSelEx">

                <label>Exercici: </label>

                <Select
                    value={this.state.selectExercicisValue}
                    placeholder="Selecciona un exercici"
                    clearable={true}
                    options={arrExercicis}
                    onChange={this.handleSelectExercicisUpdateValue}
                />

                <input
                    type="text"
                    placeholder="Repeticions"
                    ref={inRepeticions => this.inRepeticions = inRepeticions}
                    onChange={this.liniaChange}
                    value={this.state.selectExercicisValue.value.exerciciRepeticionsDefault}
                />
                <input
                    type="text"
                    placeholder="Series"
                    ref={inSeries => this.inSeries = inSeries}
                    onChange={this.liniaChange}
                    value={this.state.selectExercicisValue.value.exerciciSeriesDefault}
                />
                <input
                    type="text"
                    placeholder="Descans"
                    ref={inDescans => this.inDescans = inDescans}
                    onChange={this.liniaChange}
                    value={this.state.selectExercicisValue.value.exerciciDescansDefault}
                />
                <input
                    type="text"
                    placeholder="Minuts"
                    ref={inMinuts => this.inMinuts = inMinuts}
                    onChange={this.liniaChange}
                    value={this.state.selectExercicisValue.value.exerciciMinutsDefault}
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
