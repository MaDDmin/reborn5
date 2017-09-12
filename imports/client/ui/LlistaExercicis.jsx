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

export class LlistaExercicis extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exercicisMaxIndex: 0
        }
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
