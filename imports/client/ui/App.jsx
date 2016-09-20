import React, {Component, PropTypes} from 'react';
import '../../api/collections/Resolutions.js';
import {createContainer} from 'meteor/react-meteor-data';

class App extends Component{
  constructor(props){
    super(props);
  }
  getResolutions(){
    return this.props.resolutions;
  }
  addResolution(event){
    event.preventDefault();
    let text = this.refs.resolution.value.trim();
    Resolutions.insert({
      text,
      completed: false,
      createdAt: new Date()
    });
    this.refs.resolution.value = "";
  }
  render(){
    let resol = this.getResolutions();
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
        <ul>
          <li>{resol[0].text}</li>
        </ul>
      </div>
    );
  }
}
App.propTypes = {
  resolutions: PropTypes.array.isRequired
};
export default AppContainer = createContainer(()=>{
  return {
    resolutions: Resolutions.find().fetch()
  }
}, App);
