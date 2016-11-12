import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from './ui/layouts/MainLayout.jsx';
import App from './ui/App.jsx';
import ResolutionDetails from './ui/ResolutionDetails.jsx';
import About from './ui/About.jsx';

import ReactAtellier from 'react-atellier';

import { FilesCollection } from 'meteor/ostrio:files';
import FileIndividualFile from './ui/components/uploader/FileIndividualFile.jsx';
import FileUploadComponent from './ui/components/uploader/FileUpload.jsx';

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
      {/*    <FileIndividualFile />
          <FileUploadComponent />
      */}
        </div>
      )
    });
  }
});

FlowRouter.route('/aux', {
  action(params){
    mount(MainLayout, {
      content: (
        <div>

        </div>
      )
    });
  }
});
