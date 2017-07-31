import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
//import ReactDOM from 'react-dom';
import Bert from 'meteor/themeteorchef:bert';

class PujaArxius extends Component {
  constructor(props) {
      super(props);

      this.fileSelect = this.fileSelect.bind(this);
      this.sendFiles = this.sendFiles.bind(this);

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
                  "GrupMuscular",
                  "ID del GM referenciat",
                  { observacions: "Ací una observació de l'arxiu particular"}
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
                  display: "inline-block",
                  width: "10em",
                  height: "3em",
                  border: "2px dashed aliceblue",
                  cursor: "pointer",
                  color: "aliceblue",
                  textAlign: "center"
              }}
              title="Clica ací per incloure imatges il·lustratives"
          >
                  Selecciona imatges
          </div>
      </label>
      <div id="divPreview" />
</div>
);
}
}

export default class GrupsMuscularsForm extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }

  addGrupMuscular(event){
    event.preventDefault();
    let grupMuscularNom = this.refs.grupMuscularNom.value.trim(),
      grupMuscularDescripcio = this.refs.grupMuscularDescripcio.value.trim();

    if (grupMuscularNom){
      Meteor.call('grups_musculars.insert', grupMuscularNom, grupMuscularDescripcio, (error, data)=>{
        if (error){
          Bert.alert("Logueja't abans d'introduir dades.", "danger", "fixed-top", "fa-frown-o");
        }else{
          this.refs.grupMuscularNom.value = "";
          this.refs.grupMuscularDescripcio.value = "";
        }
      });
    }
  }

  render() {
    if (!this.props.active){
      return null;
    }
    return (
      <div id="divGrupsMuscularsForm">
        <h2>Nou Grup Muscular</h2>
        <form className="nougrupmuscular" onSubmit={this.addGrupMuscular.bind(this)}>
          <input
            type="text"
            ref="grupMuscularNom"
            placeholder="Nom"
            autoFocus={true}
            style={{
                display: "inline-block",
                width: "40%"
            }}
          />
          <textarea
            ref="grupMuscularDescripcio"
            placeholder="Descripció del grup muscular"
            style={{
                display: "inline-block",
                width: "40%"
            }}
          />

          {/*// Introduir arxius i imatges. Cal fer un bon component que puga ser reutilitzat.*/}
          <PujaArxius />

          <input
            type="submit"
            ref="grupMuscularSubmit"
            value="Introduir"
          />
        </form>
      </div>
    );
  }
};
