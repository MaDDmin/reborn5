import React, {Component} from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <header>
      <h1>Reborn 5: POCA BROMA JA!</h1>
      <LoginButtons />
      <nav>
        <a className="aNav" href="/">Home</a>
        <a className="aNav" href="/atellier">Atellier</a>
        <a className="aNav" href="/uploader">Uploader</a>
        <a className="aNav" href="/about">About</a>
        <a className="aNav" href="/ttt">TicTacToe</a>
        <a className="aNav" href="/et">EasyTaken</a>
      </nav>
    </header>
    <main>
      {content}
    </main>
  </div>
);
