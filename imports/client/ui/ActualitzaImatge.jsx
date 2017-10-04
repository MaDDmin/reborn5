import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactFileReader from 'react-file-reader';

export default class ActualitzaImatge extends Component {
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
    //     console.dir(`GM: `, this.props.grup_muscular);
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
        //     Meteor.call('grups_musculars.imatge.update',
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
        grup_muscular,
        clau,
        imgSrc,
        imgTitle
    ) {
        let editDate = new Date();

        //alert("A punt de cridar el mètode de Meteor");
        // console.dir("GM:", grup_muscular),
        // console.log("clau: ",clau);
        // console.log("imgSrc: ", imgSrc);
        // console.log("imgTitle: ", imgTitle);
        // console.log("editDate: ", editDate);

        Meteor.call('grups_musculars.imatge.update',
            grup_muscular,
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
                            props.grup_muscular,
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
                            grup_muscular={this.props.grup_muscular}
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
