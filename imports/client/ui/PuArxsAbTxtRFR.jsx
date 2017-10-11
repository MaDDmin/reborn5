import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import ReactFileReader from 'react-file-reader';

FileList.prototype.map = function(step){
    return Array.prototype.map.call(this, step);
};

export default class PujaArxiusAmbTextRFR extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (



class ImatgeAmbTextAAfegir extends Component {
    constructor(props) {
        super(props);

        this.handleTaInput = this.handleTaInput.bind(this);
    }

    handleTaInput(ev) {
        let
            textAAfegir = ev.target.value
        ;

        this.props.textsAlState(this.props.clau, textAAfegir);
    }

    render() {
        return (
            <div
                style={{
                    display: `grid`,
                    justifyContent: `center`
                }}
            >
                <img
                    src={this.props.v.imgArx.buffer}
                    alt={this.props.v.imgArx.name}
                    title={this.props.v.imgArx.name}
                    style={{
                        display: `inline-block`,
                        width: `210px`,
                        alignSelf: `center`
                    }}
                />
                <textarea
                    id={`taImgText_${this.props.clau}`}
                    className="taImgText"
                    style={{
                        alignSelf: `stretch`
                    }}
                    onInput={this.handleTaInput}
                />
            </div>
        );
    }
}
