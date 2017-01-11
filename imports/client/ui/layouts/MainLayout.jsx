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
        {/*<a className="aNav" href="/uploader">Uploader</a>*/}
        <a className="aNav" href="/about">About</a>
        <a className="aNav" href="/ttt">TicTacToe</a>
        <a className="aNav" href="/et">EasyTaken</a>
        <a className="aNav" href="/imm">IMMUTABLE</a>
        <a className="aNav" href="/JSexp">Experiment_0</a>
        <a className="aNav" href="/d3select">D3_select</a>
        <a className="aNav" href="/d3selectAll">D3_selectAll</a>
        <a className="aNav" href="/d3bars1">D3_Bars1</a>
        <a className="aNav" href="/d3bars2">D3_Bars2</a>
        <a className="aNav" href="/d3bars3">D3_Bars3</a>
        <a className="aNav" href="/d3barsFinal">D3BarsFinal</a>
      </nav>
    </header>
    <main>
      {content}
    </main>
  </div>
);
