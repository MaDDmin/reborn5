import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import jQuery from 'meteor/jquery';

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

    render(){
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
                    { this.props.exercici.exerciciGrupMuscular }
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
