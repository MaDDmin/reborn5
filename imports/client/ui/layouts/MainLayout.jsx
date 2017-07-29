import React, {Component} from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';

import { Transition } from 'react-transition-group';



const
  duration = 300,

  defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
  },

  transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 }
  };

export default MainLayout = ({ in: inProp, ...content }) => (
  <Transition in={inProp} timeout={duration} {...content}>
    {(state) => (
      <div 
        className="main-layout"
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}
      >
        <header>
          <a id="aH1" href="../"><h1>GYM Training Manager</h1></a>
          <LoginButtons />
          <nav id="navMain">
            <a className="aNav" href="/clients">Clients</a>
            <a className="aNav" href="/grups_musculars">Grups Musculars</a>
            <a className="aNav" href="/exercicis">Exercicis</a>
            <a className="aNav" href="/rutines">Rutines</a>
          </nav>
        </header>
        <main>
          {content}
        </main>
      </div>
    )}
  </Transition>
);