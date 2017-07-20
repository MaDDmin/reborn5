import React, { Component } from 'react';


class SubExperimental extends Component{
    constructor(props){
        super(props);

        this.applyChangeColor = this.applyChangeColor.bind(this);
    }

    applyChangeColor(){
        //alert(`Sub`);
        props.changeColor;
    }

    render(){
        let estil = {
            border: `solid 2px black`,
            width: `${this.props.mida}px`,
            height: `${this.props.mida}px`,
            background: `${this.props.color}`,
            cursor: `pointer`,
            display: `inline-block`,
            margin: `2em`
        };

        return (
            <div style={estil} onClick={this.changeColor} />
        );
    }
}

export default class Experimental extends Component{
    constructor(props){
        super(props);
    
        this.scale = [`grey`, `red`, `blue`, `lime`, `fuchsia`, `cyan`, `gold`];

        this.state = {
            color: "grey"
        }

        this.changeColor = this.changeColor.bind(this);
    }

    changeColor(){
        return () => {
            this.setState((prevState)=>{
                color: `${this.scale[this.scale.indexOf(prevState.color)+1]}`
            });
        };
    }

    render(){
        return (
            <div>
                <SubExperimental 
                    ref={0} 
                    color={this.state.color} 
                    mida={50} 
                    changeColor={this.changeColor} 
                    onClick={this.changeColor()} />
                <SubExperimental 
                    ref={1} 
                    color={this.state.color} 
                    mida={50} 
                    changeColor={this.changeColor} 
                    onClick={this.changeColor()} />
                <SubExperimental 
                    ref={2} 
                    color={this.state.color} 
                    mida={50} 
                    changeColor={this.changeColor} 
                    onClick={this.changeColor()} />
            </div>
        )
    }
}