import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import GrupsMuscularsForm from './GrupsMuscularsForm.jsx';
import GrupMuscularSingle from './GrupMuscularSingle.jsx';
import { check, Match } from 'meteor/check';
import { CSSTransitionGroup } from 'react-transition-group';

//import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';

import {
    BootstrapTable,
    TableHeaderColumn
} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './bootstrap.css';
import './GrupsMusculars.scss';
import {
    Button
} from 'react-bootstrap';

import sanitizeHtml from 'sanitize-html-react';

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
    constructor(props, context) {
        super(props, context);

        this.state = {
            rows: props.grups_musculars
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            rows: nextProps.grups_musculars,
        })
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

    handleGridSort = (sortColumn, sortDirection) => {
        const
            comparer = (a, b) => {
                if (sortDirection === 'ASC') {
                    return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
                } else if (sortDirection === 'DESC') {
                    return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
                }
            },
            rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer)
        ;

        this.setState({ rows });
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

    handleInsertButtonClick = (onClick) => {
        // Custom your onClick event here,
        // it's not necessary to implement this function if you have no any process before onClick
        console.log('This is my custom function for InserButton click event');
        onClick();
    };

    createCustomInsertButton = (onClick) => {
        return (
          <InsertButton
            btnText='Nou'
            className='my-custom-class'

            onClick={ () => this.handleInsertButtonClick(onClick) }
          />
        );
        // If you want have more power to custom the child of InsertButton,
        // you can do it like following
        // return (
        //   <InsertButton
        //     btnContextual='btn-warning'
        //     className='my-custom-class'
        //      btnContextual='btn-warning'
        //      btnGlyphicon='glyphicon-edit'
        //     onClick={ () => this.handleInsertButtonClick(onClick) }>
        //     { ... }
        //   </InsertButton>
        // );
    };

    handleDeleteButtonClick = (onClick) => {
      // Custom your onClick event here,
      // it's not necessary to implement this function if you have no any process before onClick
      console.log('This is my custom function for DeleteButton click event');
      onClick();
    };

    createCustomDeleteButton = (onClick) => {
      return (
        <DeleteButton
          btnText='Elimina'
          className='my-custom-class'
          onClick={ e => this.handleDeleteButtonClick(onClick) }/>
      );
      // If you want have more power to custom the child of DeleteButton,
      // you can do it like following
      // return (
      //   <DeleteButton
      //     btnContextual='btn-warning'
      //     className='my-custom-class'
          // btnGlyphicon='glyphicon-edit'
          // btnContextual='btn-success'
      //     onClick={ () => this.handleDeleteButtonClick(onClick) }>
      //     { ... }
      //   </DeleteButton>
      // );
  };

    createCustomSearchField = (props) => {
        return (
          <SearchField
            className='my-custom-class'
            defaultValue={ props.defaultSearch }
            placeholder="Busca els Grups Musculars..."
          />
        );
    };

    beforeClose = (e) => {
      alert(`[Custom Event]: Before modal close event triggered!`);
    };

    handleModalClose = (closeModal) => {
      // Custom your onCloseModal event here,
      // it's not necessary to implement this function if you have no any process before modal close
      console.log('This is my custom function for modal close event');
      closeModal();
    };

    createCustomModalHeader = (onClose, onSave) => {
        const headerStyle = {
          fontWeight: 'bold',
          fontSize: 'large',
          textAlign: 'center',
          backgroundColor: '#eeeeee'
        };
        return (
          <div className='modal-header' style={ headerStyle }>
            <h3>Nou Grup Muscular</h3>
            <button className='btn btn-info' onClick={onClose}>&times;</button>
          </div>
        );
    };

    createCustomModalFooter = (onClose, onSave) => {
      const style = {
        backgroundColor: '#ffffff'
      };
      return (
        <div className='modal-footer' style={ style }>
          <button className='btn btn-xs ' onClick={ onSave }>Guardar</button>
        </div>
      );
    };

    objecteIDs = (keyVal) => {
        console.log("keyVal: ", keyVal);
        console.dir("thisState: ", this.state);
        const
            idx = this.state.rows.findIndex((row) => row.grupMuscularNom === keyVal),
            oId = this.state.rows[idx]._id,
            uId = this.state.rows[idx].user
        ;
        //console.log("idx: ", idx);

        return {
            idx,
            _id: oId,
            user: uId
        };
    }

    onDeleteRow = (rows) => {
         //alert("Esborrant...");
         console.dir("rows: ", rows);

         rows.map(
             (v,i,a) => {
                let
                    objIDs = this.objecteIDs(v)
                ;
                console.dir("objIDs: ", objIDs);
                console.log("MUser: ", Meteor.user());
                Meteor.call('grups_musculars.delete', objIDs);
             }
         )
    }

    render() {
        function onAfterInsertRow(row) {
            let newRowStr = '';

             for (const prop in row) {
               newRowStr += prop + ': ' + row[prop] + ' \n';
             }
            alert('The new row is:\n ' + newRowStr);
        }

        function customConfirm(next, dropRowKeys) {
          const dropRowKeysStr = dropRowKeys.join('\n ⇝ ');
          if (confirm(`Vas a eliminar per complet ${dropRowKeys.length} element${dropRowKeys.length>1?"s":""}: \n ⇝ ${dropRowKeysStr} \n Estàs segur# de continuar?`)) {
            // If the confirmation is true, call the function that
            // continues the deletion of the record.
            next();
          }
        }

        function afterDeleteRow(rowKeys) {
            console.dir("rowKeys: ", rowKeys);
        }

        function afterSearch(searchText, result) {
          console.log('Your search text is ' + searchText);
          console.log('Result is:');
          for (let i = 0; i < result.length; i++) {
            console.dir('Result: ', result[i]);
          }
        }

        function linkFormatter(cell, row) {
            return (
                <a href={`/grup_muscular/${row._id}`}>{cell}</a>
            );
        }

        function descripFormatter(cell, row) {
            return <div dangerouslySetInnerHTML={{__html: sanitizeHtml(row.grupMuscularDescripcio)}}></div>;
        }

        return  (
            <BootstrapTable
                data={this.state.rows}
                options={{
                    afterInsertRow: onAfterInsertRow,
                    handleConfirmDeleteRow: customConfirm,
                    onDeleteRow: this.onDeleteRow,
                    afterDeleteRow,
                    afterSearch: afterSearch,
                    insertBtn: this.createCustomInsertButton,
                    deleteBtn: this.createCustomDeleteButton,
                    clearSearch: false,
                    searchField: this.createCustomSearchField,
                    insertModalHeader: this.createCustomModalHeader,
                    insertModalFooter: this.createCustomModalFooter,
                    sortIndicator: false
                }}
                striped
                hover
                search
                insertRow
                deleteRow
                selectRow={{
                    mode: `checkbox`
                }}
                version='4'
            >
                <TableHeaderColumn isKey dataSort dataField='grupMuscularNom' dataFormat={linkFormatter}>Grup Muscular</TableHeaderColumn>
                <TableHeaderColumn dataSort dataField='grupMuscularDescripcio' dataFormat={descripFormatter}>Descripció</TableHeaderColumn>
            </BootstrapTable>
        );
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
