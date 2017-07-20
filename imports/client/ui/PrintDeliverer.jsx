// React
import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import { check, Match } from 'meteor/check';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class PrintDeliverer extends Component{
    constructor(props){
        super(props);
    }

    addNew(form) {
        this.props.toggleActiveForm(form);
    }

    render(){
        return (
            <div>
                <button className="btAddNew" onClick={this.addNew(this.props.form)} />
                <button className="btPrintList" onClick={this.printTheList(this.props.theList)} />
            </div>
        );
    }

}