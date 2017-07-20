import React, { Component } from 'react';
import { mount } from 'react-mounter';
import { MainLayout } from '../ui/layouts/MainLayout.jsx';

function tick(){
    const elem = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>  
    );

    mount(MainLayout, {
        content: elem
    });
}

setInterval(tick, 1000);

export default class Experimental extends Component{
    constructor(props){
        super(props);
    
        /* this.scale = [`grey`, `red`, `blue`, `lime`, `fuchsia`, `cyan`, `gold`];

        this.state = {
            color: "grey"
        }

        this.changeColor = this.changeColor.bind(this); */
    }

    /* changeColor(){
        return () => {
            this.setState((prevState)=>{
                color: `${this.scale[this.scale.indexOf(prevState.color)+1]}`
            });
        };
    } */
    
    render(){
        return (
            <div>
                <SubExperimental 
                    ref={0} 
                    color={`grey`} 
                    mida={50} />
                
                <SubExperimental 
                    ref={1} 
                    color={`grey`} 
                    mida={50} />

                <SubExperimental 
                    ref={2} 
                    color={`grey`} 
                    mida={50} />
            </div>
        )
    }
}

// Ara definim els sub-components:

class SubExperimental extends Component{
    constructor(props){
        super(props);

        //this.applyChangeColor = this.applyChangeColor.bind(this);
    }

    /* applyChangeColor(){
        //alert(`Sub`);
        props.changeColor;
    }
 */
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
