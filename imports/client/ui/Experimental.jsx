import React, { Component } from 'react';
import { mount } from 'react-mounter';
import { MainLayout } from '../ui/layouts/MainLayout.jsx';

class Clock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    FormattedDate(props) {
        return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <this.FormattedDate date={this.state.date} />
            </div>  
        );
    }
}

/* function tick(){
    mount(MainLayout, {
        content: <Clock />
    });
} */

//---------------------------------------------

const ActionLink = (props) => {
    const handleClick = (e) => {
        e.preventDefault();
        console.log(`The link was clicked.`);
    };

    return (
        <a href="#" onClick={handleClick} >
            {props.caption}
        </a>
    );
};

//----------------------------------------------

class Toggle extends Component {
    constructor(props) {
        super(props);

        this.state = { isToggleOn: true };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((prevState) => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick} >
                {this.state.isToggleOn ? `ON` : `OFF`}
            </button>
        );
    }
}
//---------------------------------------------

class LoggingButton extends Component {
    
    handleClick = () => {
        console.log(`this is:`, this);
    };

    render() {
        return (
            <button onClick={this.handleClick} >
                Click me!
            </button>
        );
    }
}

//----------------------------------------------

class LoggingButtonArrowCB extends Component {

    handleClick() {
        console.log(`this is:`, this);
    }

    render() {
        return (
            <button onClick={(e) => this.handleClick(e)} >
                Clica'm!
            </button>
        );
    }
}

//---------------------------------------------

function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

//---------------------------------------------------

function LoginButton(props) {
    return (
        <button onClick={props.onClick} >
            Login
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick} >
            Logout
        </button>
    );
}

class LoginControl extends Component {
    constructor(props) {
        super(props);

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);

        this.state = {
            isLoggedIn: false
        };
    }

    handleLoginClick() {
        this.setState({ 
            isLoggedIn: true 
        });
    }

    handleLogoutClick() {
        this.setState({
            isLoggedIn: false
        });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        let button = null;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return (
            <div>
                {/*<Greeting isLoggedIn={isLoggedIn} />*/}
                The user is <em>{isLoggedIn?`currently`:`not`}</em> logged in.
                {button}
            </div>
        );
    }
}

//---------------------------------------------------------------

function Mailbox(props) {
    const unreadMessages = props.unreadMessages;

    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 &&
                <h2>
                    You have {unreadMessages.length} unread messages.
                </h2>
            }
        </div>
    );
}

const messages = [`React`, `Re: React`, `Re:Re: React`];
//--------------------------------------------------------------

function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }

    estilBanner={
        background: `orange`,
        border: `1px solid yellow`,
        color: `red`
    };

    return (
        <div className="warning">
            Warning!
        </div>
    );
}

class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showWarning: true
        };

        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(prevState => ({
            showWarning: !prevState.showWarning
        }));
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning?`Hide`:`Show`}
                </button>
            </div>
        );
    }
}

//--------------------------------------

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => 2*x);
console.log(doubled);

const listItems = numbers.map(x => <li>{x}</li>);

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

                <Clock />
                <Clock />
                <Clock />

                <ActionLink caption="Cliqueja'm!" />
                <Toggle />
                <LoggingButton />
                <LoggingButtonArrowCB />

                <Greeting isLoggedIn={true} />
                <hr />
                <LoginControl />
                <hr />
                <Mailbox unreadMessages={messages} />
                <hr />
                <Page />
                <hr />
                <ul>{listItems}</ul>
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
