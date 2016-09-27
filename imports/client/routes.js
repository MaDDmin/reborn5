import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from './ui/layouts/MainLayout.jsx';
import App from './ui/App.jsx';

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
        <h2>Un altre contingut. :)))</h2>
      )
    });
  }
});
