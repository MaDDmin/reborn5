// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// La col·lecció de les resolucions
import '../../api/collections/Clients.js';
import '../../api/collections/GrupsMusculars.js';
import './GrupsMusculars.scss';

import { createContainer } from 'meteor/react-meteor-data';
import GrupsMuscularsForm from './GrupsMuscularsForm.jsx';
import GrupMuscularSingle from './GrupMuscularSingle.jsx';
import { check, Match } from 'meteor/check';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

//import PrintDeliverer from './PrintDeliverer.jsx';

const FormReceptacle = (props) => (
    <div>
        {props.form}
    </div>
);

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            subscription: {
                clients: Meteor.subscribe("userClients"),
                grups_musculars: Meteor.subscribe("userGrupsMusculars")
            },
            formActive: false
        }

        this.activateForm = this.activateForm.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    //    this.state.subscription.grups_musculars.stop();
    }

    /*renderResolutions() {
    return this.props.resolutions.map((resolution)=>(
      <ResolutionSingle key={resolution._id} resolution={resolution} />
    ));
    }*/

    activateForm() {
        this.setState({formActive: !this.state.formActive});
    }

    render() {
        //  let resol = this.props.resolutions;
        //console.log(resol);
        return (
            <ReactCSSTransitionGroup
                id="divApp"
                component="div"
                transitionName="route"
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={400}
            >
                <ReactCSSTransitionGroup
                    component="ul"
                    className="ulResolutions"
                    transitionName="resolutionLoad"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={400}
                >
                    {   this.props.grups_musculars.map((grup_muscular) => (
                            <GrupMuscularSingle
                                key={grup_muscular._id}
                                grup_muscular={grup_muscular}
                            />
                        ))
                    }
                </ReactCSSTransitionGroup>
                <div className="divPrintDeliverer">
                    <button className="btAddNew" onClick={this.activateForm} >Nou</button>
                    <button className="btPrintList">Imprimir</button>
                </div>
                <GrupsMuscularsForm active={this.state.formActive} />
            </ReactCSSTransitionGroup>
        );
    }
}

App.propTypes = {
//  clients: PropTypes.array.isRequired
};

export default createContainer(() => {
    return {
        clients: Clients.find().fetch(),
        grups_musculars: GrupsMusculars.find().fetch()
    }
}, App);
