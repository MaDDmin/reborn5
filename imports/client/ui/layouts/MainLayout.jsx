import React, {Component} from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <header>
      <h1>GYM Train Manager</h1>
      <LoginButtons />
      <nav>
        <a className="aNav" href="/clients">Clients</a>
        <a className="aNav" href="/grup_muscular">Grup Muscular</a>
        <a className="aNav" href="/exercici">Exercici</a>
        <a className="aNav" href="/rutina">Rutina</a>
      </nav>
    </header>
    <main>
      {content}
    </main>
  </div>
);
