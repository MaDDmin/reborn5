import React, {Component} from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';

export const MainLayout = ({content}) => (
  <div className="main-layout">
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
);
