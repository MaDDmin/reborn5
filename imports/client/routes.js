// React
import React from 'react';

// Renderitzador d'Arunoda per a React
import { mount } from 'react-mounter';

// L'estructura bàsica comuna de la web sobre la que renderitzem els continguts que canvien
import { MainLayout } from './ui/layouts/MainLayout.jsx';

import App from './ui/App.jsx';
import ClientDetails from './ui/ClientDetails.jsx';
import Clients from './ui/Clients.jsx';
import GrupsMusculars from './ui/GrupsMusculars.jsx';
import Exercicis from './ui/Exercicis.jsx';
import Rutines from './ui/Rutines.jsx';

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
        <GrupsMusculars />
      )
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

FlowRouter.route('/rutines', {
  action(){
    mount(MainLayout, {
      content: (
        <Rutines />
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
