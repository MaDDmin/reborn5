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

//import FineUploaderTraditional from 'react-fine-uploader';
//import Gallery from 'react-fine-uploader/components/gallery';


import Game from './ui/components/tictactoe/TicTacToe';

import EasyTaken from './ui/components/easytaken/EasyTaken';

import Immutable from './ui/components/immutable/Immutable';
import D3Select from './ui/components/d3/D3Select.jsx';
import D3SelectAll from './ui/components/d3/D3SelectAll.jsx';
import D3Bars1 from './ui/components/d3/D3Bars1.jsx';
import D3Bars2 from './ui/components/d3/D3Bars2.jsx';

// const uploader = new FineUploaderTraditional({
//     options: {
//         chunking: {
//             enabled: true
//         },
//         deleteFile: {
//             enabled: true,
//             endpoint: '/uploads'
//         },
//         request: {
//             endpoint: '/uploads'
//         },
//         retry: {
//             enableAuto: true
//         }
//     }
// });


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

// FlowRouter.route('/uploader', {
//   action(params){
//     mount(MainLayout, {
//       content: (
//         <div>
//           <Gallery uploader={uploader} />
//         </div>
//       )
//     });
//   }
// });


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

FlowRouter.route('/et', {
  action(params){
    mount(MainLayout, {
      content: (
        <div>
          <EasyTaken />
        </div>
      )
    });
  }
});

FlowRouter.route('/imm', {
  action(params){
    mount(MainLayout, {
      content: (
        <div>
          <Immutable />
        </div>
      )
    });
  }
});

FlowRouter.route('/JSexp', {
  action(params){
    mount(MainLayout, {
      content: (
        <div>
          <Experiment_0 />
        </div>
      )
    });
  }
});

FlowRouter.route('/d3select', {
  action(params){
    mount(MainLayout, {
      content: (
        <div>
          <D3Select />
        </div>
      )
    });
  }
});

FlowRouter.route('/d3selectAll', {
  action(params){
    mount(MainLayout, {
      content: (
        <div>
          <D3SelectAll />
        </div>
      )
    });
  }
});

FlowRouter.route('/d3bars1', {
  action(params){
    mount(MainLayout, {
      content: (
        <div>
          <D3Bars1 />
        </div>
      )
    });
  }
});

FlowRouter.route('/d3bars2', {
  action(params){
    mount(MainLayout, {
      content: (
        <div>
          <D3Bars2 />
        </div>
      )
    });
  }
});
