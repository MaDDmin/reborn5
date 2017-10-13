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
            imatgesTriadesNoText: [],
            imatgesEstablertes: false,
            afegitFet: false
        }

        this.handleFiles = this.handleFiles.bind(this);
        this.handleAfegeixImatges = this.handleAfegeixImatges.bind(this);
    }


    handleFiles(files) {
        let
            fileList = files.fileList,
            arrNovesImatgesNoText = [],
            buffer;

        // console.dir("Files: ", files);
        //
        fileList.map((v,i,a) => {
            v.buffer = files.base64[i];
            arrNovesImatgesNoText.push({
                imgArx: v,
                imgText: ""
            });
        });

        console.dir("arrNovesImatgesNoText: ", arrNovesImatgesNoText);

        this.setState({
            imatgesTriadesNoText: arrNovesImatgesNoText
        });


        //this.props.onImatgesPujades(arrImatgesPujadesAmbNoText);
    }

    afegitFet() {
        this.setState({
            afegitFet: true
        })
    }

    handleAfegeixImatges() {
        const
            promiseArrNovesImatgesAmbText = new Promise( //<<<<<<<<<<<<<<< PROMISE!!!!
                (resolve, reject) => {
                    let
                        arrNovesImatgesAmbText = this.state.imatgesTriadesNoText;

                    this.setState(
                        (prevState, props) => {
                            prevState.imatgesTriadesNoText.map(
                                (v,i,a) => {
                                    arrNovesImatgesAmbText[i].imgText = document.querySelector(`#taImgText_${i}`).value;
                                }
                            );

                            return ({
                                arrNovesImatgesAmbText
                            });
                        }
                    );
                    resolve();
                })
                .then(() => {
                    Meteor.call('exercicis.imatges.afegeix',
                        this.props.exercici,
                        this.state.arrNovesImatgesAmbText
                    );
                });

        this.afegitFet();
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
                                textAlState={props.handleTaInput}
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
                    display: !this.state.afegitFet
                        ? `grid`
                        : `none`
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
                                    opacity: `1`
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

                <PreviewsImatgesAmbTexts handleTaInput={this.textAlState} />

                <BotoEstableix
                    exercici={this.props.exercici}
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

    //    this.handleTaInput = this.handleTaInput.bind(this);
    }
    //
    // handleTaInput(ev) {
    //     let
    //         textAAfegir = ev.target.value
    //     ;
    //
    //     this.props.textAlState(this.props.clau, textAAfegir);
    // }

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
                    data-clau={this.props.clau}
                    style={{
                        alignSelf: `stretch`
                    }}
                    onInput={this.props.textAlState}
                />
            </div>
        );
    }
}
