import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from './ui/layouts/MainLayout.jsx';
import App from './ui/App.jsx';
import ResolutionDetails from './ui/ResolutionDetails.jsx';
import About from './ui/About.jsx';

import ReactAtellier from 'react-atellier';

import FineUploaderTraditional from 'react-fine-uploader';
import Gallery from 'react-fine-uploader/components/gallery';

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
          }]}
        />)
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
