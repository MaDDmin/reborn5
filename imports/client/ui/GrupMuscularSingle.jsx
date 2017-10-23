import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
//import jQuery from 'meteor/jquery';

export default class GrupMuscularSingle extends Component {
    constructor(props) {
        super(props);

        this.toggleChecked = this.toggleChecked.bind(this);
        this.deleteGrupMuscular = this.deleteGrupMuscular.bind(this);
    }

    toggleChecked() {
        Meteor.call('grups_musculars.update', this.props.grup_muscular);
    }

    deleteGrupMuscular() {
        Meteor.call('grups_musculars.delete', this.props.grup_muscular);
    }

    render() {
        const grupMuscularClass = this.props.grup_muscular.completed ? "checked" : "";
        //const status = this.props.client.completed ? <span className="spnCompleted">Completed</span> : "";

        // Per als GMs, volem una llista amb els seus noms i botons
        return (
            <tr className={grupMuscularClass} >
                <td
                    style={{
                        border: `ridge 2px rgba(255,180,0,.3)`,
                        borderRadius: `.3em`
                    }}
                >
                    <a className="aSingleGrupMuscular"
                        href={`grup_muscular/${this.props.grup_muscular._id}`}
                    >
                        { this.props.grup_muscular.grupMuscularNom }
                    </a>
                </td>
                <td>
                    <button
                        className="btDeleteGrupMuscular"
                        onClick={this.deleteGrupMuscular}
                    >
                        &times;
                    </button>
                </td>
            </tr>
        );
    }
}
