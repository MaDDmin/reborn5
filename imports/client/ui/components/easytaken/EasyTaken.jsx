// EasyTaken és un component de mera prova. No n'he fet encara cap des de zero i vaig a començar a explorar les possibilitats de React amb aquest.
// En principi constarà de 2 parts, Intro i Results, A Intro es podràn introduir 2 camps de text que passaràn els seus valors a Results.

// EasyTaken
//   Intro
//     InComp
//     InComp
//   Results


import React, {Component} from 'react';
import './EasyTaken.scss';



class Intro extends Component {
  render(){
    return (
      <fieldset>
        <legend>Intro:</legend>

        <div>
          <label>Text 1: </label>
          <input
            type="text"
            value={this.props.txt1}
            onChange={(e)=>{this.props.onTxt1Change(e)}} />
          <input
            type="checkbox"
            checked={this.props.chk1}
            onChange={(inChk)=>{this.props.onChk1Change(inChk.checked)}} />
        </div>
        <div>
          <label>Text 2: </label>
          <input
            type="text"
            value={this.props.txt2}
            onChange={(e)=>{this.props.onTxt2Change(e)}} />
          <input
            type="checkbox"
            checked={this.props.chk2}
            onChange={(inChk)=>{this.props.onChk2Change(inChk.checked)}} />
        </div>

      </fieldset>
    );
  }
}

class Results extends Component {
  render(){
    const classes1 = this.props.chk1 ? "checked" : "";
    const classes2 = this.props.chk2 ? "checked" : "";

    return (
      <fieldset>
        <legend>Results:</legend>
        <span className={classes1}>
          {this.props.txt1}
        </span>
        <span className={classes2}>
          {this.props.txt2}
        </span>
      </fieldset>
    );
  }
}


export default class EasyTaken extends Component {
  constructor(){
    super();
    this.state = {
      intros1: {
        txt: "Text 1: ",
        chk: false
      },
      intros2: {
        txt: "Text 2: ",
        chk: true
      }
    };
  }

  handleTxtChange1(e){
    this.setState({
      intros1: Object.assign({}, this.state.intros1, {txt: e.target.value})
    });
  }

  handleChkChange1(){
    this.setState({
      intros1: Object.assign({}, this.state.intros1, {chk: !this.state.intros1.chk})
    });
  }

  handleTxtChange2(e){
    this.setState({
      intros2: Object.assign({}, this.state.intros2, {txt: e.target.value})
    });
  }

  handleChkChange2(){
    this.setState({
      intros2: Object.assign({}, this.state.intros2, {chk: !this.state.intros2.chk})
    });
  }

  render(){
    return (
      <div>
        <Intro
          onTxt1Change={this.handleTxtChange1.bind(this)}
          onTxt2Change={this.handleTxtChange2.bind(this)}
          onChk1Change={this.handleChkChange1.bind(this)}
          onChk2Change={this.handleChkChange2.bind(this)}
          txt1={this.state.intros1.txt}
          txt2={this.state.intros2.txt}
          chk1={this.state.intros1.chk}
          chk2={this.state.intros2.chk} />
        <Results
          txt1={this.state.intros1.txt}
          txt2={this.state.intros2.txt}
          chk1={this.state.intros1.chk}
          chk2={this.state.intros2.chk} />
      </div>
    );
  }
}
