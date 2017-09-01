import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './GrupsMusculars.scss';

import GrupsMuscularsForm from './GrupsMuscularsForm.jsx';
import GrupMuscularSingle from './GrupMuscularSingle.jsx';
import { check, Match } from 'meteor/check';
import { CSSTransitionGroup } from 'react-transition-group';

//import PrintDeliverer from './PrintDeliverer.jsx';

//import PHE from 'print-html-element';
//import print form 'print-any-html';

//import $ from 'meteor/jquery';


class GrupsMuscularsNoData extends Component {
    constructor(props) {
        super(props);

        this.state = {

            // subscription: {
            //     clients: Meteor.subscribe("userClients"),
            //     grups_musculars: Meteor.subscribe("userGrupsMusculars")
            //},
            formActive: false
        }

        this.activateForm = this.activateForm.bind(this);
        this.imprimeixLlista = this.imprimeixLlista.bind(this);
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

    imprimeixLlista () {
    //    PHE.printElement(document.querySelector(".olLlistaGMs"));
        //alert('Després de PHE');
        $(".ulGrupsMuscularsLlista").printThis();
    }

    render() {
        //  let resol = this.props.resolutions;
        //console.log(resol);
        return (
            <CSSTransitionGroup
                id="divGrupsMuscularsContainer"
                component="div"
                transitionName="route"
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={400}
                style={{
                    display: `grid`
                }}
            >
                <CSSTransitionGroup
                    component="ul"
                    className="ulGrupsMuscularsLlista"
                    transitionName="route"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={400}
                    style={{
                        display: `grid`
                    }}
                >
                    {  this.props.grups_musculars.map((grup_muscular) => (
                            <GrupMuscularSingle
                                key={grup_muscular._id}
                                grup_muscular={grup_muscular}
                            />
                        ))
                    }
                </CSSTransitionGroup>
                <div className="divPrintDeliverer">
                    <button className="btAddNew" onClick={this.activateForm}>Nou</button>
                    <button className="btPrintList" onClick={this.imprimeixLlista}>Imprimir</button>
                </div>
                <GrupsMuscularsForm active={this.state.formActive} />
            </CSSTransitionGroup>
        );
    }
}

// propTypes = {
// //  clients: PropTypes.array.isRequired
// };

export default createContainer(() => {
    const
        subscription = {
            clientsSubscription: Meteor.subscribe("userClients"),
            grups_muscularsSubscription: Meteor.subscribe("userGrupsMusculars"),
            imatgesSubscription: Meteor.subscribe("userImatges"),
            exercicisSubscription: Meteor.subscribe("userExercicis")
        };

    return {
        clients: Clients.find().fetch(),
        grups_musculars: GrupsMusculars.find().fetch(),
        imatges: Imatges.find().fetch()
    }
}, GrupsMuscularsNoData);
