import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

// import './ExerciciSingle.scss';

export default class ExerciciSingle extends Component{
    constructor(props) {
        super(props);

        this.toggleChecked = this.toggleChecked.bind(this);
        this.deleteExercici = this.deleteExercici.bind(this);
    }

    toggleChecked() {
        Meteor.call('exercicis.update', this.props.exercici);
    }

    deleteExercici() {
        Meteor.call('exercicis.delete', this.props.exercici);
    }

    render() {
        const
            exerciciClass = this.props.exercici.completed
                ? "checked"
                : ""
        ;
        //const status = this.props.client.completed ? <span className="spnCompleted">Completed</span> : "";

        return (
            <tr className={exerciciClass} >
                <td
                    style={{
                        border: `ridge 2px rgba(255,180,0,.3)`,
                        borderRadius: `.3em`
                    }}
                >
                    <a
                        className="aSingleExercici"
                        href={`exercici/${this.props.exercici._id}`}
                    >
                        { this.props.exercici.exerciciNom }
                    </a>
                </td>
                <td>
                    <ExerciciGrupMuscularCampEditable
                        exercici={this.props.exercici}
                        grups_musculars={this.props.grups_musculars}
                    />
                </td>
                <td>
                    <button
                        className="btDeleteExercici"
                        onClick={this.deleteExercici}
                    >
                        &times;
                    </button>
                </td>
            </tr>
        );
    }
}

class ExerciciGrupMuscularCampEditable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editant: true
        };
    }

    render() {
        let
            arrGrupsMusculars = [];

            this.props.grups_musculars.map(
                (v,i,a) => {
                    //console.log(JSON.stringify(client));
                    arrGrupsMusculars.push({
                        value: v.grupMuscularNom,
                        label: v.grupMuscularNom
                    });
                }
            )
        ;
        return (
            <div>
                {
                    !this.state.editant
                        ? this.props.exercici.exerciciGrupMuscular
                        : <Select
                            actual={this.props.exercici.exerciciGrupMuscular}
                            options={arrGrupsMusculars}
                        />
                }
            </div>
        );
    }
}
