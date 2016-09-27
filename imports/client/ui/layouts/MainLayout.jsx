import React, {Component} from 'react';

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <header>
      <h1>Reborn 5: POCA BROMA JA!</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
    </header>
    <main>
      {content}
    </main>
  </div>
);
