import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class PujaArxiusAmbSendButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgArr: []
        }

        this.fileSelect = this.fileSelect.bind(this);
        this.sendFiles = this.sendFiles.bind(this);

        /* this.sendFiles2 = this.sendFiles2.bind(this); */
        //this.selArxiusAmbAnchor = this.selArxiusAmbAnchor.bind(this);
    }

	fileSelect(ev) {
		const
            //that = this,
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

        this.setState({
            imgArr: arxius
        });
		//alert("Arxius seleccionats. Missatge a la consola.");

		//this.sendFiles2(arxius)

		//this.sendFiles(arxius);
	}

	sendFiles(arxius) {

		for (let i = 0; i < arxius.length; i++) {
			let
				arx = arxius[i],
				imageType = /^image\//;

			if (!imageType.test(arx.type)) {
				continue;
			}

			let reader = new FileReader();
			reader.onload = function (event) {

				let buffer = event.target.result;// = new Uint8Array(event.target.result);
	            Meteor.call('imatges.insert', buffer);
				//return (e) => aImg.src = e.target.result;
			};
			reader.readAsDataURL(arx);
			//reader2.readAsArrayBuffer(arx);
		}
	}

	render() {
		return (
			<div>
				<input
                    type="file"
					id="inFile"
					multiple
					accept="image/*"
					style={{ display: `none` }}
					onChange={this.fileSelect}
				/>
				{/*  <a href="#" id="aSelArxius" onClick= this.selArxiusAmbAnchor}>Selecciona imatges (anchor)</a> */}
				<label htmlFor="inFile">Selecciona imatges (label + button)</label>
				<div id="divPreview" />
                {this.state.imgArr.length > 0 ?
                    <input
                        type="button"
                        value="Envia"
                        onClick={this.sendFiles}
                    />
                : null }
			</div>
		);
	}
}
