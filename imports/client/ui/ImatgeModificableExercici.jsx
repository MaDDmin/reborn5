import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactFileReader from 'react-file-reader';
import Tappable from 'react-tappable';
import sanitizeHtml from 'sanitize-html-react';
//
// import { ScaleModal as CropModal } from 'boron';
//import { Button, Alert, Spinner, Modal as CropModal, ModalBody, ModalHeader, ModalFooter } from 'elemental';
//import { Modal as CropModal } from 'react-bootstrap';
//import {ModalContainer, ModalDialog} from 'react-modal-dialog';

import CropModal from 'simple-react-modal';
//import 'simple-react-modal/dist/modal';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


export default class ImatgeModificableExercici extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editantImatge: false,
            editantImgText: false,
            overImage: false,
            crop: {},
            cropping: false
        };

        this.handlePressEventImatge = this.handlePressEventImatge.bind(this);

        this.handleTapImgText = this.handleTapImgText.bind(this);
        this.handleEditaImgText = this.handleEditaImgText.bind(this);
        this.handleEstableixImgText = this.handleEstableixImgText.bind(this);

        this.showDeleteImageButton = this.showDeleteImageButton.bind(this);
        this.hideDeleteImageButton = this.hideDeleteImageButton.bind(this);
        this.handleEsborraImatge = this.handleEsborraImatge.bind(this);
    }

    handlePressEventImatge(ev) {
    //     let clau = ev.target.dataset.clau;
    //
        this.setState({
                editantImatge: true,
                overImage: true
        });
    }

// ImgText:
    handleTapImgText() {
        this.imgText.setAttribute("contenteditable", "true");
    }
    handleEditaImgText() {
        this.setState({
            editantImgText: true
        });
    }
    handleEstableixImgText() {
        // console.log("exercicis.imatgeText.update abans del Mètode: ");
        // console.dir("exercici: ", this.props.exercici);
        // console.log("clau: ", this.props.clau);
        // console.log("innerHTML: ", this.imgText.innerHTML);
        Meteor.call(
            'exercicis.imatgeText.update',
            this.props.exercici,
            this.props.clau,
            this.imgText.innerHTML
        );
        this.imgText.setAttribute("contenteditable", "false");
        this.setState({
            editantImgText: false
        });
    }

// Esborra la imatge:
    showDeleteImageButton() {
        this.setState({
            overImage: true
        })
    }

    hideDeleteImageButton() {
        this.setState({
            overImage: false
        })
    }

    handleEsborraImatge() {
        if (confirm("Vas a esborrar la imatge amg el seu text per complet. Recorda que pots editar tant la imatge com el text per separat. Confirma per procedir.")) {
            Meteor.call(
                'exercicis.imatge.delete',
                this.props.exercici,
                this.props.clau
            );
        }
    }

    handleRetallaImatge = () => {
        this.setState({
            cropping: true
        })
    };

    handleCropChange = (crop, pixelCrop) => {
        this.setState({ crop });
    };

    toggleCropModal = () => {
        //this.refs.cropModal.toggle();
        this.setState({
            cropping: true
        });
    };


    handleClick = () => this.setState({isShowingModal: true});
    handleClose = () => this.setState({isShowingModal: false});

    render() {

        let crop = {
            x: 20,
            y: 10,
            width: 30,
            height: 10
        };

        return (
            <div
                className="divExerciciImatges"
                onMouseEnter={this.showDeleteImageButton}
                onMouseLeave={this.hideDeleteImageButton}
            >
                <Tappable
                    component="div"
                    onPress={this.handlePressEventImatge}
                    pressDelay={250}
                    stopPropagation={true}
                >
                    <div style={{
                        display: `grid`,
                        gridTemplateAreas: `"imatgeModificable"`
                    }}>
                        <img
                            className={this.props.className}
                            src={this.props.src}
                            alt={this.props.alt}
                            style={{
                                gridArea: `imatgeModificable`
                            }}
                        />

                        <div
                            style={{
                                gridArea: `imatgeModificable`,
                                position: `relative`,
                                display: this.state.overImage
                                    ? `inline-block`
                                    : `none`
                            }}
                        >
                            <button
                                className="btDelImage"
                                style={{
                                    gridArea: `imatgeModificable`,
                                    position: `relative`,
                                    float: `left`,
                                    bottom: `0`,
                                    zIndex: `200`
                                }}
                                onClick={this.toggleCropModal}
                            >Retallar</button>
                        </div>

                        <div
                            style={{
                                gridArea: `imatgeModificable`,
                                position: `relative`,
                                display: this.state.overImage
                                    ? `inline-block`
                                    : `none`
                            }}
                        >
                            <button
                                className="btDelImage"
                                style={{
                                    gridArea: `imatgeModificable`,
                                    position: `relative`,
                                    float: `right`,
                                    zIndex: `200`
                                }}
                                onClick={this.handleEsborraImatge}
                            >x</button>
                        </div>

                        <div
                            style={{
                                gridArea: `imatgeModificable`,
                                alignSelf: `stretch`,
                                justifySelf: `center`,
                                borderRadius: `2em`,
                                overflow: `hidden`,
                                width: `100%`,
                                textAlign: `center`,
                                margin: `0 auto`
                            }}
                        >
                            <SelectorImatge
                                exercici={this.props.exercici}
                                isOpen={this.state.editantImatge}
                                clau={this.props.clau}
                                handleEditantImatge={this.props.handleEditantImatge}
                            />
                        </div>
                    </div>
                </Tappable>

                <Tappable
                    onTap={this.handleTapImgText}
                >
                    <div
                        className="divExerciciImgText"
                        ref={imgText => this.imgText = imgText}
                        onInput={this.handleEditaImgText}
                        dangerouslySetInnerHTML={{
                            __html: this.props.peu ?
                                sanitizeHtml(this.props.peu) :
                                `Carregant...`
                        }}
                    ></div>
                </Tappable>
                <button
                    style={{
                        visibility: this.state.editantImgText ? `visible` : `hidden`,
                        display: this.state.editantImgText ? `inline-block` : `none`,
                        alignSelf: `center`
                    }}
                    onClick={this.handleEstableixImgText}
                >Estableix</button>

                        <CropModal
                            show={this.state.cropping}
                            onClose={this.handleClose}
                        >
                            <ReactCrop
                                src={this.props.src}
                                onChange={this.handleCropChange}
                                crop={this.state.crop}
                            />
                        </CropModal>

            </div>
        );
    }
}

class SelectorImatge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imatgeEstablerta: false
        }

        this.handleEstableixImatge = this.handleEstableixImatge.bind(this);
    }

    handleEstableixImatge() {
        this.setState({
            imatgeEstablerta: true
        });
    }

    render() {
        return (
            <div
                className="divOverlay"
                style={{
                    display:
                        this.props.isOpen && !this.state.imatgeEstablerta
                        ?   `grid`
                        :   `none`
                    ,
                    position: `relative`,
                    background: `rgba(50,50,50,.85)`,
                    width: `100%`,
                    height: `100%`,
                    float: `left`,
                    padding: `0 1em`,
                    zIndex: '100',
                    alignContent: `center`
                }}
            >
                <ActualitzaImatge
                    meteor_method={``}
                    exercici={this.props.exercici}
                    imatge_amb_text_original={this.props.imatge_amb_text_original}
                    clau={this.props.clau}
                    handleEditantImatge={this.props.handleEditantImatge}
                    handleEstableixImatge={this.handleEstableixImatge}

                />
            </div>
        );
    }
}

class ActualitzaImatge extends Component {
    constructor(props) {
        super(props);

        //this.fileSelect = this.fileSelect.bind(this);
        //this.sendFiles = this.sendFiles.bind(this);
        this.arrImatgesPujades = [];

        this.state = {
          imatgeTriada: false,
          imatgeEstablerta: false,

          imgSrc: "",
          imgAlt: "",
          imgTitle: ""
        };

        this.handleFiles = this.handleFiles.bind(this);
        this.sendFile = this.sendFile.bind(this);
        //this.selArxiusAmbAnchor = this.selArxiusAmbAnchor.bind(this);
        this.handleEstableixImatge = this.handleEstableixImatge.bind(this);
    }

    handleFiles(files) {
      console.log(files);
      this.setState({
          imatgeTriada: true,

          imgSrc: files.base64,
          imgAlt: files.fileList[0].name,
          imgTitle: files.fileList[0].name
      });
    }

    // fileSelect(ev) {
    //     let clau = this.props.clau;
    //
    //     this.setState({
    //         imatgeTriada: true
    //     });
    //
    //     const
    //         arxiu = ev.target.files[0],
    //         preview = this.preview;
    //
    //     let
    //         arx = arxiu,
    //         imageType = /^image\//;
    //
    //         // if (!imageType.test(arx.type)){
    //         //   continue;
    //         // }
    //     let divArx = document.createElement("div");
    //     divArx.classList.add("divPreview");
    //
    //     //console.dir("Clau: ", this.props.clau);
    //
    //     preview.appendChild(divArx);
    //
    //     let img = document.createElement("img");
    //     img.classList.add("preview");
    //     img.file = arx;
    //     divArx.appendChild(img);
    //
    //         /* 	let prog = document.createElement("progress");
    //             prog.setAttribute("max", "100");
    //             prog.setAttribute("value", "0");
    //             prog.setAttribute("id", `progress_${i}`);
    //             divArx.appendChild(prog);
    //  */
    //         //div.children.push(img).push(prog);
    //         //preview.appendChild(div);
    //
    //     let reader = new FileReader();
    //     reader.onload = ((aImg) => {
    //             //let buffer = new Uint8Array(reader.result);
    //             //Meteor.call('saveFile', buffer);
    //         return (e) => aImg.src = e.target.result;
    //     })(img);
    //     reader.readAsDataURL(arx);
    //         //reader.readAsArrayBuffer(arx);
    //
    //     let funA = function funAlert() {
    //         stopPropagation();
    //         alert("okokok");
    //     }
    //     let btEstableixImatge = document.createElement("button");
    //     btEstableixImatge.classList.add("btEstableixImatge");
    //     btEstableixImatge.innerHTML = "Estableix la imatge";
    //     btEstableixImatge.setAttribute("data-clau", this.props.clau);
    //     btEstableixImatge.setAttribute("ref", bt => this.bt = bt);
    //     btEstableixImatge.setAttribute("onClick", funA);
    //     divArx.appendChild(btEstableixImatge);
    //
    //     console.dir(`Clau: `, this.props.clau);
    //     console.dir(`Imatge: `, arx);
    //     console.dir(`GM: `, this.props.exercici);
    //     //alert("Arxius seleccionats. Missatge a la consola.");
    //
    //     //this.sendFiles2(arxius)
    // //this.sendFile(arx);
    // }

    sendFile(arxiu) {
        //for (let i = 0; i < arxius.length; i++) {

        // let
        //     arx = arxiu,
        //     imageType = /^image\//;
        //
        // if (!imageType.test(arx.type)) {
        // //    continue;
        // }
        //
        // let reader2 = new FileReader();
        // reader2.onload = function (event) {
        //
        //     let buffer = event.target.result;// = new Uint8Array(event.target.result);
        //
        //     Meteor.call('exercicis.imatge.update',
        //           buffer,
        //           "Provisional",
        //           "ID del GM referenciat",
        //           { observacions: "Ací una observació de l'arxiu particular"},
        //           (error, result) => {
        //               that.arrImatgesPujades.push(result);
        //               console.log("ImatgesPujades: ");
        //               console.dir(that.arrImatgesPujades);
        //               // De moment farà els canvis tantes vegades com arxius se passen.
        //               // Se podrà millorar en un futur utilitzant una promesa o un async/await.
        //               that.props.onImatgesPujades(that.arrImatgesPujades);
        //           }
        //       );
        //     //return (e) => aImg.src = e.target.result;
        // };
        // reader2.readAsDataURL(arx);
        // //reader2.readAsArrayBuffer(arx);
    }

    handleEstableixImatge(
        exercici,
        clau,
        imgSrc,
        imgTitle
    ) {
        let editDate = new Date();

        //alert("A punt de cridar el mètode de Meteor");
        // console.dir("GM:", exercici),
        // console.log("clau: ",clau);
        // console.log("imgSrc: ", imgSrc);
        // console.log("imgTitle: ", imgTitle);
        // console.log("editDate: ", editDate);

        Meteor.call('exercicis.imatge.update',
            exercici,
            clau,
            imgSrc,
            imgTitle,
            editDate);

        // console.log("Després de tornar del mètode.");
        this.setState({
            imatgeEstablerta: true
        });

        this.props.handleEstableixImatge();
    }

    render() {
        let
            Preview = (props) => (
                <img
                    src={props.imgSrc}
                    alt={props.imgAlt}
                    title={props.imgTitle}
                    style={{
                        display: this.state.imatgeTriada && !this.state.imatgeEstablerta
                            ? `grid`
                            : `none`,
                        width: `210px`,
                        alignSelf: `center`
                    }}
                />
            ),
            BotoEstableix = (props) =>
                <button
                    onClick={(ev) => {
                        ev.stopPropagation();
                        this.handleEstableixImatge(
                            props.exercici,
                            props.clau,
                            props.imgSrc,
                            props.imgTitle
                        );
                    }}
                    style={{
                        display: this.state.imatgeTriada && !this.state.imatgeEstablerta
                            ? `block`
                            : `none`
                        ,
                        margin: `.5em`
                    }}
                >Estableix la imatge
                </button>
        ;

        return (
            <ReactFileReader
                base64={true}
                handleFiles={this.handleFiles}
            >
                <div>
                    <input type="button"
                        id={`inFile${this.props.clau}`}
                        accept="image/*"
                        style={{ display: `none` }}
                        data-clau={this.props.clau}
                    />
                    {/*  <a href="#" id="aSelArxius" onClick= this.selArxiusAmbAnchor}>Selecciona imatges (anchor)</a> */}
                    <label htmlFor={`inFile${this.props.clau}`}>
                        <div id="divZonaUpload"
                            style={{
                                display: !this.state.imatgeTriada && !this.state.imatgeEstablerta
                                    ? `grid`
                                    : `none`,
                                border: `.6em dashed white`,
                                color: `white`,
                                fontWeight: `bold`,
                                textAlign: `center`,
                                margin: `.3em auto`,
                                width: `150px`,
                                height: `200px`,
                                alignContent: `center`
                            }}
                            title="Clica ací per canviar la imatge"
                        >
                            <span
                                style={{
                                    alignSelf: `center`
                                }}
                            >Selecciona una imatge
                            </span>
                        </div>
                    </label>
                    <div style={{
                        display: `grid`,
                        gridArea: `"preview"`,
                        justifyContent: `center`,
                        alignContent: `center`
                    }}>
                        <Preview
                            imgSrc={this.state.imgSrc}
                            imgAlt={this.state.imgAlt}
                            imgTitle={this.state.imgTitle}
                            data-clau={this.props.clau}
                            ref={preview => this.preview = preview}
                        />
                        <BotoEstableix
                            exercici={this.props.exercici}
                            clau={this.props.clau}
                            imgSrc={this.state.imgSrc}
                            imgTitle={this.state.imgTitle}
                            editDate={new Date()}
                        />
                    </div>
                </div>
            </ReactFileReader>
        );
    }
}
