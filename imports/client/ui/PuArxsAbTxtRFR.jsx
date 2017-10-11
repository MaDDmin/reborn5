import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import ReactFileReader from 'react-file-reader';

FileList.prototype.map = function(step){
    return Array.prototype.map.call(this, step);
};

export default class PujaArxiusAmbTextRFR extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arrTexts: []
        }
    }

    handleTaInput(ev) {
        // let
        //     nouArrTexts = this.state.arrTexts;
        //
        // this.setState((prevState, props) => {
        //     return {
        //         arrTexts: prevState.arrTexts.slice().splice()
        //     };
        // })
    }

    render() {
        let
            PreviewsImatgesAmbTexts = (props) => (
                <div style={{
                    display: `grid`,
                    gridAutoFlow: `column`,
                    justifyContent: `center`,
                    gridGap: `1em`,
                    gridTemplateColumns: `repeat(auto-fit, minmax(210px, 1fr))`,
                }}>
                { this.state.imatgesTriadesNoText.map(
                    (v,i,a) => {
                        return (
                            <ImatgeAmbTextAAfegir
                                key={i}
                                clau={i}
                                v={v}
                            />
                        );
                    }
                )}
                </div>
            ),
            BotoEstableix = (props) =>
                <button
                    onClick={(ev) => {
                        ev.stopPropagation();
                        this.handleAfegeixImatges();
                    }}
                    style={{
                        display: (this.state.imatgesTriadesNoText.length > 0) && !this.state.imatgesEstablertes
                            ? `block`
                            : `none`
                        ,
                        margin: `.5em`
                    }}
                >Afegeix les imatges
                </button>
        ;
        return (
            <div
                style={{
                    display: `grid`
                }}
            >
                <ReactFileReader
                    base64={true}
                    multipleFiles={true}
                    handleFiles={this.handleFiles}
                >
                    <div
                        style={{
                            display: `grid`,
                            alignSelf: `center`,
                            justifySelf: `center`,
                            justifyContent: `center`
                        }}
                    >
                        <input
                            type="button"
                            id="inFile"
                            style={{ display: `none` }}
                        />
                        <label htmlFor="inFile" >
                            <div
                                id="divUpload"
                                style={{
                                    display: `grid`,
                                    border: `.6em dashed white`,
                                    color: `white`,
                                    fontWeight: `bold`,
                                    textAlign: `center`,
                                    margin: `.3em 1em`,
                                    width: `150px`,
                                    height: `200px`,
                                    opacity: `.1`
                                }}
                            >
                                <span
                                    style={{
                                        alignSelf: `center`,
                                        justifySelf: `center`

                                    }}
                                >
                                        Inclou imatges
                                </span>
                            </div>
                        </label>
                    </div>
                </ReactFileReader>

                <PreviewsImatgesAmbTexts handleTaInput={this.handleTaInput} />

                <BotoEstableix
                    grup_muscular={this.props.grup_muscular}
                    clau={this.props.clau}
                    imgSrc={this.state.imgSrc}
                    imgTitle={this.state.imgTitle}
                />
            </div>
        );
    }
}

class ImatgeAmbTextAAfegir extends Component {
    constructor(props) {
        super(props);

        this.handleTaInput = this.handleTaInput.bind(this);
    }

    handleTaInput(ev) {
        let
            textAAfegir = ev.target.value
        ;

        this.props.textAlState(this.props.clau, textAAfegir);
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
