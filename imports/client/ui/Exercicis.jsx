import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';
import ExercicisForm from './ExercicisForm.jsx';
import ExerciciSingle from './ExerciciSingle.jsx';

import { check, Match } from 'meteor/check';

import { CSSTransitionGroup } from 'react-transition-group';

NodeList.prototype.map = function(step){
    return Array.prototype.map.call(this, step);
};
document.querySelectorAll(".Select").map(
  (v,i,a) => {
      v.style.zIndex = 10000 - (10000/a.length) * (i+1);
  }
);

class ExercicisNoData extends Component{
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount(){

    }

    componentWillUnmount(){
        //this.state.subscription.exercicis.stop();
    }

  /*renderResolutions(){
    return this.props.resolutions.map((resolution)=>(
      <ResolutionSingle key={resolution._id} resolution={resolution} />
    ));
  }*/

    render() {
  //  let resol = this.props.resolutions;
    //console.log(resol);
        return (
            <CSSTransitionGroup
                id="divExercicis"
                component="div"
                transitionName="route"
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={400}
            >
                <CSSTransitionGroup
                    component="table"
                    className="tableExercicis"
                    transitionName="route"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={400}
                    style={{
                        border: `ridge 2px orange`,
                        borderRadius: `.3em`,
                        background: `rgba(200,200,200,.5)`
                    }}
                >
                    <tbody>
                        <tr>
                            <th>Títol</th>
                            <th>Grup Muscular</th>
                            <th>Accions</th>
                        </tr>
                        {   this.props.exercicis.map((exercici) =>
                                <ExerciciSingle
                                    key={exercici._id}
                                    exercici={exercici}
                                    grups_musculars={this.props.grups_musculars}
                                />
                            )
                        }
                    </tbody>
                </CSSTransitionGroup>
                <ExercicisForm
                    grups_musculars={this.props.grups_musculars}
                />
            </CSSTransitionGroup>
        );
    }
}

// App.propTypes = {
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
        exercicis: Exercicis.find().fetch(),
        rutines: Rutines.find().fetch(),
        imatges: Imatges.find().fetch()
    }
}, ExercicisNoData);
