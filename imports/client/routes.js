// React
import React from 'react';

// Renderitzador d'Arunoda per a React
import { mount } from 'react-mounter';

// L'estructura bàsica comuna de la web sobre la que renderitzem els continguts que canvien
import { MainLayout } from './ui/layouts/MainLayout';

import App from './ui/App';
import ResolutionDetails from './ui/ResolutionDetails';
import About from './ui/About';

import ReactAtellier from 'react-atellier';

import FineUploaderTraditional from 'react-fine-uploader';
import Gallery from 'react-fine-uploader/components/gallery';


import Game from './ui/components/reacteaster/TicTacToe';

const uploader = new FineUploaderTraditional({
    options: {
        chunking: {
            enabled: true
        },
        deleteFile: {
            enabled: true,
            endpoint: '/uploads'
        },
        request: {
            endpoint: '/uploads'
        },
        retry: {
            enableAuto: true
        }
    }
});


FlowRouter.route('/', {
  action(){
    mount(MainLayout, {
      content: (<App />)
    });
  }
});

FlowRouter.route('/about', {
  action(){
    mount(MainLayout, {
      content: (
        <About />
      )
    });
  }
});

FlowRouter.route('/resolution/:id', {
  action(params){
    mount(MainLayout, {
      content: (<ResolutionDetails params={{id: params.id}} />)
    });
  }
});

FlowRouter.route('/atellier', {
  action(params){
    mount(MainLayout, {
      content: (
        <ReactAtellier
          components={[{
              componentName: "Component App",
              component: App
            }, {
              componentName: "TicTacToe Game",
              component: Game
            }
          ]}
        />
      )
    });
  }
});

FlowRouter.route('/uploader', {
  action(params){
    mount(MainLayout, {
      content: (
        <div>
          <Gallery uploader={uploader} />
        </div>
      )
    });
  }
});


FlowRouter.route('/ttt', {
  action(params){
    mount(MainLayout, {
      content: (
        <div>
          <Game />
        </div>
      )
    });
  }
});
