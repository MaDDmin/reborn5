import React, {Component} from 'react';

export default class App extends Component{
  addResolution(event){
    event.preventDefault();
    let text = this.refs.resolution.value.trim();
    console.log(text);
    this.refs.resolution.value = "";
  }
  render(){
    return (
      <div>
        <h1>Reborn 5: POCA BROMA JA!</h1>
        <h2>My Resolutions</h2>
        <form className="new-resolution" onSubmit={this.addResolution.bind(this)}>
          <input
            type="text"
            ref="resolution"
            placeholder="Nova resolució"
          />
        </form>
      </div>
    );
  }
};
