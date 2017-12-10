import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';
import ExercicisForm from './ExercicisForm.jsx';
import ExerciciSingle from './ExerciciSingle.jsx';

import { check, Match } from 'meteor/check';

import { CSSTransitionGroup } from 'react-transition-group';

import sanitizeHtml from 'sanitize-html-react';
import Select from 'react-select';

NodeList.prototype.map = function(step){
    return Array.prototype.map.call(this, step);
};

class ExerciciGrupMuscularCampEditable extends Component {
    constructor(props) {
        super(props);

        let
            gmAct = props.grups_musculars.filter(gm => gm._id === props.exercici[0].exerciciGrupMuscular),

            selectValue = {
                label: gmAct[0] ? gmAct[0].grupMuscularNom : "",
                value: gmAct[0] ? gmAct[0]._id : ""
            }
        ;
        //debugger;
        console.dir(`gmAct: `, gmAct[0]);

        this.state = {
            editant: false,
            selectValue
        };
    }

    updateValue = (nouVal) => {
        this.setState({
            selectValue: nouVal
        });
    }

    render() {
        let
            arrGrupsMusculars = []
            // ,
            // gmArr = this.props.grups_musculars.filter(gm => gm._id === this.props.exercici[0].exerciciGrupMuscular),
            // gmNom = gmArr.grupMuscularNom
        ;

        //console.dir(gmNom);
        this.props.grups_musculars.map(
            (v,i,a) => {
                //console.log(JSON.stringify(client));
                arrGrupsMusculars.push({
                    value: v._id,
                    label: v.grupMuscularNom
                });
            }
        );

        return (
            <div>
                {
                    !this.state.editant
                        ? <div onClick={() => {
                            this.setState({
                                editant: true
                            });
                        }}>{gmNom}</div>
                        : <Select
                            value={this.state.selectValue}
                            onChange={this.updateValue}
                            options={arrGrupsMusculars}
                        />
                }
            </div>
        );
    }
}

class TaulaExercicis extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            rows: props.exercicis
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            rows: nextProps.exercicis,
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
            placeholder="Busca els Exercicis..."
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
            <h3>Nou Exercici</h3>
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
            idx = this.state.rows.findIndex((row) => row.exerciciNom === keyVal),
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
                Meteor.call('exercicis.delete', objIDs);
             }
         )
    }

    render() {
        let
            onAfterInsertRow = (row)  => {
                let newRowStr = '';

                for (const prop in row) {
                    newRowStr += prop + ': ' + row[prop] + ' \n';
                }
                alert('The new row is:\n ' + newRowStr);
            },

            customConfirm = (next, dropRowKeys)  => {
                const dropRowKeysStr = dropRowKeys.join('\n ⇝ ');
                if (
                    confirm(`Vas a eliminar per complet ${dropRowKeys.length} element${dropRowKeys.length>1?"s":""}: \n ⇝ ${dropRowKeysStr} \n Estàs segur# de continuar?`)
                ) {
                    // If the confirmation is true, call the function that
                    // continues the deletion of the record.
                    next();
                }
            },

            afterDeleteRow = (rowKeys)  => {
                console.dir("rowKeys: ", rowKeys);
            },

            afterSearch = (searchText, result)  => {
                console.log('Your search text is ' + searchText);
                console.log('Result is:');
                for (let i = 0; i < result.length; i++) {
                    console.dir('Result: ', result[i]);
                }
            },

            linkFormatter = (cell, row) => <a href={`/exercici/${row._id}`}>{cell}</a>,

            descripFormatter = (cell, row)  => <div dangerouslySetInnerHTML={{__html: sanitizeHtml(row.exerciciDescripcio)}}></div>,

            gmFormatter = (cell, row) => {
                const
                    exs = this.props.exercicis,
                    gms = this.props.grups_musculars,
                    exercici = this.props.exercicis.filter(ex => ex._id === row._id)
                ;

                return (<ExerciciGrupMuscularCampEditable
                    grups_musculars={gms}
                    exercici={exercici}
                />);
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
                <TableHeaderColumn isKey dataSort dataField='exerciciNom' dataFormat={linkFormatter}>Exercici</TableHeaderColumn>
                <TableHeaderColumn dataSort dataField='exerciciGrupMuscular' dataFormat={gmFormatter}>Grup Muscular</TableHeaderColumn>
                <TableHeaderColumn dataSort dataField='exerciciDescripcio' dataFormat={descripFormatter}>Descripció</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}


class ExercicisNoData extends Component{
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount(){

    }

    componentWillUnmount(){
        //this.state.subscription.exercicis.stop();
    }

  /*renderResolutions(){
    return this.props.resolutions.map((resolution)=>(
      <ResolutionSingle key={resolution._id} resolution={resolution} />
    ));
  }*/

    render() {
  //  let resol = this.props.resolutions;
    //console.log(resol);
        return (
            <CSSTransitionGroup
                id="divExercicis"
                component="div"
                transitionName="route"
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={400}
            >
                <CSSTransitionGroup
                    component="table"
                    className="tableExercicis"
                    transitionName="route"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={400}
                    style={{
                        border: `ridge 2px orange`,
                        borderRadius: `.3em`,
                        background: `rgba(200,200,200,.5)`
                    }}
                >
                    <tbody>
                        <tr>
                            <th>Títol</th>
                            <th>Grup Muscular</th>
                            <th>Accions</th>
                        </tr>
                        {   this.props.exercicis.map((exercici) =>
                                <ExerciciSingle
                                    key={exercici._id}
                                    exercici={exercici}
                                    grups_musculars={this.props.grups_musculars}
                                />
                            )
                        }
                    </tbody>
                </CSSTransitionGroup>

                <TaulaExercicis
                    exercicis={this.props.exercicis}
                    grups_musculars={this.props.grups_musculars}
                />

                <ExercicisForm
                    grups_musculars={this.props.grups_musculars}
                />
            </CSSTransitionGroup>
        );
    }
}

// App.propTypes = {
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
        exercicis: Exercicis.find().fetch(),
        rutines: Rutines.find().fetch(),
        imatges: Imatges.find().fetch()
    }
}, ExercicisNoData);

document.querySelectorAll(".Select").map(
  (v,i,a) => {
      v.style.zIndex = 10000 - (10000/a.length) * (i+1);
  }
);
