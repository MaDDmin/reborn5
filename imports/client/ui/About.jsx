import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class About extends Component{
  render(){
    return (
      <ReactCSSTransitionGroup
        id="divAbout"
        component="div"
        transitionName="route"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={400}>
        <h2>ABOUT</h2>
        <div id="divCos">
          <p>There's a rebel lying deep in my soul. Anytime anybody tells me the trend is such and such, I go the opposite direction. I hate the idea of trends. I hate imitation; I have a reverence for individuality.</p>
          <p>I know what you're thinking. Did he fire six shots or only five? Well to tell you the truth in all this excitement I've kinda lost track myself. But being this is a .44 Magnum - the most powerful hand gun in the world and would blow your head clean off, you've got to ask yourself one question--Do I feel lucky? Well, do ya punk!</p>
          <p>God this stuff isn't getting to me - the shootings, the knifings, the beatings. Old ladies being bashed in the head for their social security checks. Nah that doesn't bother me. But you know what does bother me? You know what makes me really sick to my stomach? It's watching you stuff your face with those hotdogs! Nobody - I mean nobody puts ketchup on a hot dog!</p>
          <p>Now remember, things look bad and it looks like you're not gonna make it, then you gotta get mean. I mean plumb, mad-dog mean. ‘Cause if you lose your head and you give up then you neither live nor win. That's just the way it is.</p>
          <p>I'm not doing this because I want to take long showers with you assholes and I don't want to get my head shot off in some far away land because you don't habla, comprende?</p>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
};
