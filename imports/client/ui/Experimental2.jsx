import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { MainLayout } from '../ui/layouts/MainLayout.jsx';

import ReactFileReader from 'react-file-reader';

export default class Experimental2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgSrc: "",
            imgAlt: "",
            imgTitle: ""
        }

        this.handleFiles = this.handleFiles.bind(this);
    }

    handleFiles(files) {
        console.log(files);
        this.setState({
            imgSrc: files.base64,
            imgAlt: files.fileList[0].name,
            imgTitle: files.fileList[0].name
        });
    }

    render() {
        return (
            <div>
                <ReactFileReader
                    base64={true}
                    handleFiles={this.handleFiles}
                >
                    <div style={{
                        display: `grid`,
                        gridArea: `"preview"`,
                        justifySelf: `center`,
                        alignContent: `center`
                    }}>
                        <input type="button"
                            id={`inFile${this.props.clau}`}
                            accept="image/*"
                            style={{ display: `none` }}
                            data-clau={this.props.clau}
                            onChange={this.handleFiles}
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
                    </div>



                    {/*<button className='btn'>Upload</button>*/}
                </ReactFileReader>
                <Preview
                    imgSrc={this.state.imgSrc}
                    imgAlt={this.state.imgAlt}
                    imgTitle={this.state.imgTitle}
                />
            </div>
        );
    }
}

let
    Preview = (props) => (
        <img
            src={props.imgSrc}
            alt={props.imgAlt}
            title={props.imgTitle}
        />
    );
