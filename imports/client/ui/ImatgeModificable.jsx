import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { MainLayout } from '../ui/layouts/MainLayout.jsx';

import ReactFileReader from 'react-file-reader';

export default class Experimental2 extends Component {
    constructor(props) {
        super(props);

        this.handleFiles = this.handleFiles.bind(this);
    }

    handleFiles(files) {
      console.log(files)
    }

    render() {
        return (
            <ReactFileReader handleFiles={this.handleFiles}>
                <button className='btn'>Upload</button>
            </ReactFileReader>
        );
    }
}
