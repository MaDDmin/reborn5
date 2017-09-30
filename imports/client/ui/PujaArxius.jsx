import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class PujaArxius extends Component {
    constructor(props) {
      super(props);

      this.fileSelect = this.fileSelect.bind(this);
      this.sendFiles = this.sendFiles.bind(this);

      this.arrImatgesPujades = [];

      /* this.sendFiles2 = this.sendFiles2.bind(this); */
      //this.selArxiusAmbAnchor = this.selArxiusAmbAnchor.bind(this);
    }

    fileSelect(ev) {
        const
            arxius = ev.target.files,
            preview = document.querySelector("#divPreview");

        for (let i = 0; i < arxius.length; i++) {
            let
                arx = arxius[i],
                imageType = /^image\//;

            // if (!imageType.test(arx.type)){
            //   continue;
            // }
            let divArx = document.createElement("div");
            divArx.classList.add("divArx");
            preview.appendChild(divArx);

            let img = document.createElement("img");
            img.classList.add("obj");
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
        }

        console.dir(arxius);
        //alert("Arxius seleccionats. Missatge a la consola.");

        //this.sendFiles2(arxius)
        this.sendFiles(arxius);
    }

    sendFiles(arxius) {
        let that = this;

        for (let i = 0; i < arxius.length; i++) {
            let
                arx = arxius[i],
                imageType = /^image\//;

            if (!imageType.test(arx.type)) {
                continue;
            }

            let reader2 = new FileReader();
            reader2.onload = function (event) {

                let buffer = event.target.result;// = new Uint8Array(event.target.result);

                Meteor.call('imatges.insert',
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
    }

    render() {
        return (
            <div>
                <input type="file"
                    id="inFile"
                    multiple
                    accept="image/*"
                    style={{ display: `none` }}
                    onChange={this.fileSelect}
                />
                {/*  <a href="#" id="aSelArxius" onClick= this.selArxiusAmbAnchor}>Selecciona imatges (anchor)</a> */}
                <label htmlFor="inFile">
                    <div id="divZonaUpload"
                        style={{
                            display: `grid`,
                            border: `.6em dashed white`,
                            color: `white`,
                            fontWeight: `bold`,
                            textAlign: `center`,
                            margin: `.3em 1em`,
                            width: `150px`,
                            height: `200px`
                        }}
                        title="Clica ací per incloure imatges il·lustratives"
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
                <div id="divPreview" />
            </div>
        );
    }
}
