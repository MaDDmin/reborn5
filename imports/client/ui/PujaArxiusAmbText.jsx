import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class PujaArxiusAmbText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            objImgTxt: [{
                imgArx: {},
                imgText: ""
            }]
        }

        this.fileSelect = this.fileSelect.bind(this);
        //this.sendFiles = this.sendFiles.bind(this);
    }

	fileSelect(ev) {
		const
			arxius = ev.target.files,
			preview = document.querySelector("#divPreview");

        let
            arrImatgesPujadesAmbNoText = [];

		for (let i = 0; i < arxius.length; i++) {
			let
                objImgTxtIterant = {
                    imgArx: arxius[i]
                    // {
                    //     lastModified: arxius[i].lastModified,
                    //     lastModifiedDate: arxius[i].lastModifiedDate,
                    //     name: arxius[i].name,
                    //     size: arxius[i].size,
                    //     type: arxius[i].type,
                    //     webkitRelativePath: arxius[i].webkitRelativePath
                    // }
                    ,
                    imgText: "",
                    imgClau: i

                },
                arx = arxius[i],
				imageType = /^image\//;

			let divArx = document.createElement("div");
			divArx.classList.add("divArx");
            let taArx = document.createElement("textarea");
            taArx.classList.add("taArx");
            taArx.setAttribute("id", `taArx_${i}`);
			preview.appendChild(divArx);

			let img = document.createElement("img");
			img.classList.add("obj");
			img.file = arx;

			divArx.appendChild(img);
            divArx.appendChild(taArx);

			let reader = new FileReader();
			reader.onload = ((aImg) => {
				//let buffer = new Uint8Array(reader.result);
				//Meteor.call('saveFile', buffer);
				return (e) => {
                    aImg.src = e.target.result;
                    Object.assign(objImgTxtIterant.imgArx, {
                        buffer: e.target.result
                    });
                    arrImatgesPujadesAmbNoText.push(objImgTxtIterant);
                };
			})(img);
			reader.readAsDataURL(arx);
		}

        this.props.onImatgesPujades(arrImatgesPujadesAmbNoText);
	}

	//sendFiles(arxius) {}

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
