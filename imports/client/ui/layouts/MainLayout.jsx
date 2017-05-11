import React, {Component} from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <header>
      <a id="aH1" href="../"><h1>GYM Train Manager</h1></a>
      <LoginButtons />
      <nav>
        <a className="aNav" href="/clients">Clients</a>
        <a className="aNav" href="/grups_musculars">Grup Muscular</a>
        <a className="aNav" href="/exercicis">Exercici</a>
        <a className="aNav" href="/rutines">Rutina</a>
      </nav>
    </header>
    <main>
      {content}
    </main>
  </div>
);
