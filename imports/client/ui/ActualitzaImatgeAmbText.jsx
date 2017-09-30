import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class ActualitzaImatge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            objImgTxt: [{
                imgArx: null,
                imgText: ""
            }]
        }

        this.fileSelect = this.fileSelect.bind(this);
        this.sendFiles = this.sendFiles.bind(this);
    }

	fileSelect(ev) {
		const
			arxiu = ev.target.file,
			preview = document.querySelector("#divPreview");

        let
            objImg = {
                imgArx: {
                    lastModified: arxiu.lastModified,
                    lastModifiedDate: arxiu.lastModifiedDate,
                    name: arxiu.name,
                    size: arxiu.size,
                    type: arxiu.type,
                    webkitRelativePath: arxiu.webkitRelativePath
                },
                imgText: ""
            },
            arx = arxiu,
			imageType = /^image\//
        ;

		let divArx = document.createElement("div");
		divArx.classList.add("divArx");

		let img = document.createElement("img");
		img.classList.add("obj");
		img.file = arx;
		divArx.appendChild(img);

		let reader = new FileReader();
		reader.onload = ((aImg) => {
			return (e) => {
                aImg.src = e.target.result;
                Object.assign(objImg.imgArx, {
                    buffer: e.target.result
                });
            };
		})(img);
		reader.readAsDataURL(arx);

        this.props.onImatgePujada(objImg);
	}

	sendFiles(arxius) {

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
                            height: `200px`
                        }}
                    >
                        <span
                            style={{
                                alignSelf: `center`
                            }}
                        >
                                Inclou imatges
                        </span>
                    </div>
                </label>
				<div id="divPreview" />
			</div>
		);
	}
}
