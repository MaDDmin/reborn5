import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class ActualitzaImatge extends Component {
    constructor(props) {
      super(props);

      this.fileSelect = this.fileSelect.bind(this);
      //this.sendFiles = this.sendFiles.bind(this);

      this.arrImatgesPujades = [];


      this.state = {
          imatgeTriada: false
      }

      this.sendFile = this.sendFile.bind(this);
      //this.selArxiusAmbAnchor = this.selArxiusAmbAnchor.bind(this);
    }

    fileSelect(ev) {
        let clau = this.props.clau;

        this.setState({
            imatgeTriada: true
        });

        const
            arxiu = ev.target.files[0],
            preview = this.preview;

        let
            arx = arxiu,
            imageType = /^image\//;

            // if (!imageType.test(arx.type)){
            //   continue;
            // }
        let divArx = document.createElement("div");
        divArx.classList.add("divPreview");

        //console.dir("Clau: ", this.props.clau);

        preview.appendChild(divArx);

        let img = document.createElement("img");
        img.classList.add("preview");
        img.file = arx;
        divArx.appendChild(img);

            /* 	let prog = document.createElement("progress");
                prog.setAttribute("max", "100");
                prog.setAttribute("value", "0");
                prog.setAttribute("id", `progress_${i}`);
                divArx.appendChild(prog);
     */
            //div.children.push(img).push(prog);
            //preview.appendChild(div);

        let reader = new FileReader();
        reader.onload = ((aImg) => {
                //let buffer = new Uint8Array(reader.result);
                //Meteor.call('saveFile', buffer);
            return (e) => aImg.src = e.target.result;
        })(img);
        reader.readAsDataURL(arx);
            //reader.readAsArrayBuffer(arx);

        let funA = function funAlert() {
            stopPropagation();
            alert("okokok");
        }
        let btEstableixImatge = document.createElement("button");
        btEstableixImatge.classList.add("btEstableixImatge");
        btEstableixImatge.innerHTML = "Estableix la imatge";
        btEstableixImatge.setAttribute("data-clau", this.props.clau);
        btEstableixImatge.setAttribute("ref", bt => this.bt = bt);
        btEstableixImatge.setAttribute("onClick", funA);
        divArx.appendChild(btEstableixImatge);

        console.dir(`Clau: `, this.props.clau);
        console.dir(`Imatge: `, arx);
        console.dir(`GM: `, this.props.grup_muscular);
        //alert("Arxius seleccionats. Missatge a la consola.");

        //this.sendFiles2(arxius)
    //this.sendFile(arx);
    }

    sendFile(arxiu) {
        //for (let i = 0; i < arxius.length; i++) {
        let
            arx = arxiu,
            imageType = /^image\//;

        if (!imageType.test(arx.type)) {
        //    continue;
        }

        let reader2 = new FileReader();
        reader2.onload = function (event) {

            let buffer = event.target.result;// = new Uint8Array(event.target.result);

            Meteor.call('grups_musculars.imatge.update',
                  buffer,
                  "Provisional",
                  "ID del GM referenciat",
                  { observacions: "Ací una observació de l'arxiu particular"},
                  (error, result) => {
                      that.arrImatgesPujades.push(result);
                      console.log("ImatgesPujades: ");
                      console.dir(that.arrImatgesPujades);
                      // De moment farà els canvis tantes vegades com arxius se passen.
                      // Se podrà millorar en un futur utilitzant una promesa o un async/await.
                      that.props.onImatgesPujades(that.arrImatgesPujades);
                  }
              );
            //return (e) => aImg.src = e.target.result;
        };
        reader2.readAsDataURL(arx);
        //reader2.readAsArrayBuffer(arx);
    }

    render() {
        return (
            <div style={{
                display: `grid`,
                gridArea: `"preview"`,
                justifySelf: `center`,
                alignContent: `center`
            }}>
                <input type="file"
                    id={`inFile${this.props.clau}`}
                    accept="image/*"
                    style={{ display: `none` }}
                    data-clau={this.props.clau}
                    onChange={this.fileSelect}
                />
                {/*  <a href="#" id="aSelArxius" onClick= this.selArxiusAmbAnchor}>Selecciona imatges (anchor)</a> */}
                <label htmlFor={`inFile${this.props.clau}`}>
                    <div id="divZonaUpload"
                        style={{
                            display: !this.state.imatgeTriada
                                ? `grid`
                                : `none`
                            ,
                            border: `.6em dashed white`,
                            color: `white`,
                            fontWeight: `bold`,
                            textAlign: `center`,
                            margin: `.3em 1em`,
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
                        >
                            Selecciona una imatge
                        </span>
                    </div>
                </label>
                <div
                    data-clau={this.props.clau}
                    ref={preview => this.preview = preview}
                ></div>
            </div>
        );
    }
}
