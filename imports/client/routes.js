// React
import React from 'react';

// Renderitzador d'Arunoda per a React
import { mount } from 'react-mounter';

// L'estructura bàsica comuna de la web sobre la que renderitzem els continguts que canvien
import { MainLayout } from './ui/layouts/MainLayout.jsx';

import App from './ui/App.jsx';
import Clients from './ui/Clients.jsx';
import ClientDetails from './ui/ClientDetails.jsx';
import GrupsMusculars from './ui/GrupsMusculars.jsx';
import GrupsMuscularsForm from './ui/GrupsMuscularsForm.jsx';
import GrupMuscularDetails from './ui/GrupMuscularDetails.jsx';
import Exercicis from './ui/Exercicis.jsx';
import ExerciciDetails from './ui/ExerciciDetails.jsx';
import Rutines from './ui/Rutines.jsx';
//import MobX from './ui/MobX.jsx';
import Experimental from './ui/Experimental.jsx';
import Experimental2 from './ui/Experimental2.jsx';

FlowRouter.route('/', {
  action(){
    mount(MainLayout, {
      content: (<App />)
    });
  }
});

FlowRouter.route('/clients', {
  action(){
    mount(MainLayout, {
      content: (
        <Clients />
      )
    });
  }
});

FlowRouter.route('/client/:id', {
  action(params){
    mount(MainLayout, {
      content: (<ClientDetails params={{id: params.id}} />)
    });
  }
});

FlowRouter.route('/grups_musculars', {
  action(){
    mount(MainLayout, {
      content: (
        <GrupsMusculars form={<GrupsMuscularsForm />} />
      )
    });
  }
});

FlowRouter.route('/grup_muscular/:id', {
  action(params){
    mount(MainLayout, {
      content: (<GrupMuscularDetails params={{id: params.id}} />)
    });
  }
});

FlowRouter.route('/exercicis', {
  action(){
    mount(MainLayout, {
      content: (
        <Exercicis />
      )
    });
  }
});

FlowRouter.route('/exercici/:id', {
  action(params){
    mount(MainLayout, {
      content: (<ExerciciDetails params={{id: params.id}} />)
    });
  }
});

FlowRouter.route('/rutines', {
  action(){
    mount(MainLayout, {
      content: (
        <Rutines />
      )
    });
  }
});

FlowRouter.route('/mobx', {
  action(){
    mount(MainLayout, {
      content: (
        <h1>De moment no res... </h1>
      )
    });
  }
});

FlowRouter.route('/experimental', {
  action(){
    mount(MainLayout, {
      content: (
        <Experimental />
      )
    });
  }
});

FlowRouter.route('/experimental2', {
  action(){
    mount(MainLayout, {
      content: (
        <Experimental2 clau={666} />
      )
    });
  }
});

FlowRouter.route('/file', {
  action(){
    mount(MainLayout, {
      content: (
        <div />
      )
    });
  }
});



FlowRouter.notFound = {
    // Subscriptions registered here don't have Fast Render support.
    subscriptions: function() {
    },
    action: function() {
      FlowRouter.go('/');
    }
};
