import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './GrupsMusculars.scss';

import GrupsMuscularsForm from './GrupsMuscularsForm.jsx';
import GrupMuscularSingle from './GrupMuscularSingle.jsx';
import { check, Match } from 'meteor/check';
import { CSSTransitionGroup } from 'react-transition-group';

import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';



// const exampleDescription = (
//     <p>To make a given column editable set <code>column.editable</code> and create a <code>onGridRowsUpdated</code> handler. Note that you will need to store your rows in state and update that state when a cell value changes.</p>
// );
//
// module.exports = exampleWrapper({
//     WrappedComponent: Example,
//     exampleName: 'Editable Example',
//     exampleDescription,
//     examplePath: './scripts/example04-editable.js',
//     examplePlaygroundLink: 'https://jsfiddle.net/k7tfnw1n/10/'
// });

class Taula extends Component {
    constructor(props) {
        super(props);

        this._columns = [
            {
                key: 'grupMuscularNom',
                name: 'Title',
                editable: true
            }
        ];

        this.state = {
            rows: props.grups_musculars
        };
    }

    // getRandomDate = (start, end) => {
    //     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
    // };

    // createRows = (numberOfRows) => {
    //     let rows = [];
    //     for (let i = 1; i < numberOfRows; i++) {
    //         rows.push({
    //             id: i,
    //             task: 'Task ' + i,
    //             complete: Math.min(100, Math.round(Math.random() * 110)),
    //             priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
    //             issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
    //             startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
    //             completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
    //         });
    //     }
    //     return rows;
    // };

    rowGetter = (i) => {
        return this.state.rows[i];
    };

    handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        let rows = this.state.rows.slice();

        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = update(rowToUpdate, {$merge: updated}); // <<<<<<<<<<<<<<< Meteor.method()
            rows[i] = updatedRow;
        }

        this.setState({ rows });
    };

    render() {
        return  (
        <ReactDataGrid
            enableCellSelect={true}
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
            minHeight={400}
            onGridRowsUpdated={this.handleGridRowsUpdated}
        />);
    }
}


class GrupsMuscularsNoData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // subscription: {
            //     clients: Meteor.subscribe("userClients"),
            //     grups_musculars: Meteor.subscribe("userGrupsMusculars")
            //},
            formActive: false
        }

        this.activateForm = this.activateForm.bind(this);
        this.imprimeixLlista = this.imprimeixLlista.bind(this);
    }

    activateForm() {
        this.setState({
            formActive: !this.state.formActive
        });
    }

    imprimeixLlista () {
    //    PHE.printElement(document.querySelector(".olLlistaGMs"));
        //alert('Després de PHE');
        $(".ulGrupsMuscularsLlista").printThis();
    }

    render() {
        //  let resol = this.props.resolutions;
        //console.log(resol);

        let arrGrupsMusculars = [];

        return (
            <CSSTransitionGroup
                id="divGrupsMuscularsContainer"
                component="div"
                transitionName="route"
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={400}
                style={{
                    display: `grid`
                }}
            >
                <CSSTransitionGroup
                    component="Table"
                    className="tableGrupsMusculars"
                    transitionName="route"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={400}
                >
                    <Taula grups_musculars={this.props.grups_musculars} />

                </CSSTransitionGroup>
                <div className="divPrintDeliverer">
                    <button className="btAddNew" onClick={this.activateForm}>Nou</button>
                    <button className="btPrintList" onClick={this.imprimeixLlista}>Imprimir</button>
                </div>
                <GrupsMuscularsForm active={this.state.formActive} />
            </CSSTransitionGroup>
        );
    }
}

// propTypes = {
// //  clients: PropTypes.array.isRequired
// };

export default createContainer(() => {
    const
        subscription = {
            clientsSubscription: Meteor.subscribe("userClients"),
            grups_muscularsSubscription: Meteor.subscribe("userGrupsMusculars"),
            imatgesSubscription: Meteor.subscribe("userImatges"),
            exercicisSubscription: Meteor.subscribe("userExercicis")
        };

    return {
        clients: Clients.find().fetch(),
        grups_musculars: GrupsMusculars.find().fetch(),
        imatges: Imatges.find().fetch()
    }
}, GrupsMuscularsNoData);
