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
            textsImatges: []
        }

        this.fileSelect = this.fileSelect.bind(this);
        this.sendFiles = this.sendFiles.bind(this);
        this.handleFiles = this.handleFiles.bind(this);
        this.handleAfegeixImatges = this.handleAfegeixImatges.bind(this);
        this.handleTaInput = this.handleTaInput.bind(this);
        this.textAlState = this.textAlState.bind(this);
    }

	fileSelect(ev) {
		// const
		// 	arxius = ev.target.files,
		// 	preview = document.querySelector("#divPreview");
        //
        // let
        //     arrImatgesPujadesAmbNoText = [];
        //
		// for (let i = 0; i < arxius.length; i++) {
		// 	let
        //         objImgTxtIterant = {
        //             imgArx: {
        //                 lastModified: arxius[i].lastModified,
        //                 lastModifiedDate: arxius[i].lastModifiedDate,
        //                 name: arxius[i].name,
        //                 size: arxius[i].size,
        //                 type: arxius[i].type,
        //                 webkitRelativePath: arxius[i].webkitRelativePath
        //             },
        //             imgText: ""
        //         },
        //         arx = arxius[i],
		// 		imageType = /^image\//;
        //
		// 	let divArx = document.createElement("div");
		// 	divArx.classList.add("divArx");
        //     let taArx = document.createElement("textarea");
        //     taArx.classList.add("taArx");
        //     taArx.setAttribute("id", `taArx_${i}`);
		// 	preview.appendChild(divArx);
        //
		// 	let img = document.createElement("img");
		// 	img.classList.add("obj");
		// 	img.file = arx;
		// 	divArx.appendChild(img);
        //     divArx.appendChild(taArx);
        //
		// 	let reader = new FileReader();
		// 	reader.onload = ((aImg) => {
		// 		//let buffer = new Uint8Array(reader.result);
		// 		//Meteor.call('saveFile', buffer);
		// 		return (e) => {
        //             aImg.src = e.target.result;
        //             Object.assign(objImgTxtIterant.imgArx, {
        //                 buffer: e.target.result
        //             });
        //             arrImatgesPujadesAmbNoText.push(objImgTxtIterant);
        //         };
		// 	})(img);
		// 	reader.readAsDataURL(arx);
		// }
        //
        // this.props.onImatgesPujades(arrImatgesPujadesAmbNoText);
	}

	sendFiles(arxius) {
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
    }

    handleAfegeixImatges() {
        let
            arrNovesImatgesAmbText = this.state.imatgesTriadesNoText;

        this.setState((prevState, props) => {
            prevState.imatgesTriadesNoText.map(
                (v,i,a) => {
                    arrNovesImatgesAmbText[i].imgText = document.querySelector(`#taImgText_${i}`).value;
                }
            );

            return ({
                arrNovesImatgesAmbText
            });
        })

        // Meteor.call('grups_musculars.imatges.afegeix',
        //
        // );
    }

    handleTaInput(ev) {
        // this.setState((prevState, props) => {
        //     let textIterat =
        //
        //     prevState.imatgesTriadesNoText.map(
        //         (v,i,a) => {
        //         }
        //     );
        //
        //     return ({
        //
        //     });
        // });
    }

    textAlState(clau, text) {
        let
            arrTexts = [];

        arrTexts[clau] = text;
        this.setState({
            textsImatges: arrTexts
        })
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
                                textAlState={this.textAlState}
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
