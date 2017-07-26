import React, { Component } from 'react';
import { mount } from 'react-mounter';
import { MainLayout } from '../ui/layouts/MainLayout.jsx';
import './Experimental.scss';

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

const listItems = numbers.map(x => <li key={x.toString()}>{x}</li>);

//------------------------------------------------

function NumberList(props) {
	const numbers = props.numbers;
	const listItems = numbers.map(x => <li key={x.toString()}>{x}</li>);

	return (
		<ul>{listItems}</ul>
	);
}

//--------------------------------------------------------

function Blog(props) {
	const sidebar = (
		<ul>
			{props.posts.map(post =>
				<li key={post.id} id={post.id}>
					{post.title}
				</li>
			)}
		</ul>
	);

	const content = props.posts.map(post =>
		<div key={post.id} id={post.id}>
			<h3>{post.title}</h3>
			<p>{post.content}</p>
		</div>
	);

	return (
		<div>
			{sidebar}
			<hr />
			<hr />
			{content}
		</div>
	);
}

const content = [
	{id: 1, title: `Hello World`, content: `Welcome to learning React!`},
	{id: 2, title: `Installation`, content: `You can install React from npm.`}
];

//-------------------------------------------------------
function ListItem(props) {
	return <li>{props.value}</li>;
}


function NumberListEmbedMap(props) {
	const numbers = props.numbers;
	return (
		<ul>
			{numbers.map(n =>
				<ListItem key={n.toString()}
						value={n} />
			)}
		</ul>
	);
}
//-----------------------------------------------------------------

class NameForm extends Component {
	constructor(props) {
		super(props);

		this.state = { value: `` };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value.toUpperCase() });
	}

	handleSubmit(event) {
		event.preventDefault();
		alert(`A name was submitted: ${this.state.value}`);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Name:
					<input
						type="text"
						value={this.state.value}
						onChange={this.handleChange}
					/>
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}
//---------------------------------------

class EssayForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: `Please write an essay about your favorite DOM element.`
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();

		alert(`An essay was submitted: ${this.state.value}`);
		this.setState({value: ``});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} >
				<label>
					El text:
					<textarea value={this.state.value}
						onChange={this.handleChange}
					/>
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

//-----------------------------------------

class FlavorForm extends Component {
	constructor(props) {
		super(props);

		this.state = { value: `coconut` };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();

		alert(`Your favorite flavor is: ${this.state.value}`);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} >
				Pick your favorite La Croix flavor:
				<select value={this.state.value} onChange={this.handleChange} >
					<option value="grapefruit">Grapefruit</option>
					<option value="lime">Lime</option>
					<option value="coconut">Coconut</option>
					<option value="mango">Mango</option>
				</select>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

//-------------------------------------------------
class Reservation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isGoing: true,
			numberOfGuests: 2
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const
			target = event.target,
			value = target.type === `checkbox` ? target.checked : target.value,
			name = target.name;

		this.setState({
			[name]: value
		});
	}

	render() {
		return (
			<form>
				<label>
					Is going:
					<input
						name="isGoing"
						type="checkbox"
						checked={this.state.isGoing}
						onChange={this.handleInputChange}
					/>
				</label>
			</form>
		);
	}
}

//--------------------------------------------------------------
// UNCONTROLLED COMPONENTS (REFS + DOM CONTROL)

class NameFormUncontrolled extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();

		alert(`A name was submitted: ${this.input.value}`);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} >
				<label>
					Name:
					<input
						defaultValue="Boub"
						type="text"
						ref={input => this.input = input}
					/>
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}
//------------------------------------------------------
// LIFTING STATENameFormUncontrolledNameFormUncontrolled

class Calculator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			temperature: ``,
			scale: `c`
		};

		this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
	}

	handleCelsiusChange(temperature) {
		this.setState({
			temperature,
			scale: `c`
		});
	}

	handleFahrenheitChange(temperature) {
		this.setState({
			temperature,
			scale: `f`
		});
	}

	render() {
		const
			scale = this.state.scale,
			temperature = this.state.temperature,
			celsius = scale === `f` ? tryConvert(temperature, toCelsius) : temperature,
			fahrenheit = scale === `c` ? tryConvert(temperature, toFahrenheit) : temperature;

		return (
			<fieldset>
				<legend>Enter temperature: </legend>
				<TemperatureInput
					scale="c"
					temperature={celsius}
					onTemperatureChange={this.handleCelsiusChange}
				/>
				<TemperatureInput
					scale="f"
					temperature={fahrenheit}
					onTemperatureChange={this.handleFahrenheitChange}
				/>
				<BoilingVerdict
					celsius={parseFloat(temperature)}
				/>
			</fieldset>
		);
	}
}

function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p>The water would boil.</p>;
	}
	return <p>The water would not boil.</p>;
}

const scaleNames = {
	c: `Celsius`,
	f: `Fahrenheit`
};

class TemperatureInput extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.onTemperatureChange(e.target.value);
	}

	render() {
		const
			temperature = this.props.temperature,
			scale = this.props.scale;

		return (
			<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}: </legend>
				<input value={temperature}
					onChange={this.handleChange}
				/>
			</fieldset>
		);
	}
}

function toCelsius(fahrenheit) {
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
	return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
	const
		input = parseFloat(temperature),
		output = convert(input),
		rounded = Math.round(output * 1000) / 1000;

	if (Number.isNaN(input)) {
		return ``;
	}

	return rounded.toString();
}

//-------------------------------------------------------------
// FUNCTIONS AS CHILDREN

function Repeat(props) {
	let items = [];
	for (let i = 0; i < props.numTimes; i++) {
		items.push(props.children(i));
	}

	return <div>{items}</div>;
}

function ListOfTenThings() {
	return (
		<Repeat numTimes={10}>
			{ index => <div key={index}>This is item {index} in the list</div> }
		</Repeat>
	);
}

//-----------------------------------------------------
// REFS AND THE DOM

class CustomTextInput extends Component {
	constructor(props) {
		super(props);

		this.focus = this.focus.bind(this);
	}

	focus() {
		this.textInput.focus();
	}

	render() {
		return (
			<div>
				<input
					type="text"
					ref={input => {
						this.textInput = input;
					}}
				/>
				<input
					type="button"
					value="Focus the text input"
					onClick={this.focus}
				/>
			</div>
		);
	}
}

class AutoFocusTextInput extends Component {
	componentDidMount() {
		this.textInput.focus();
	}

	render() {
		return (
			<CustomTextInput
				ref={input => this.textInput = input}
			/>
		);
	}
}

//---------------------------------------------------------

function CustomTextInput(props) {
	return (
		<div>
			<input ref={props.inputRef} />
		</div>
	);
}

function Parent(props) {
	return (
		<div>
			My input: <CustomTextInput inputRef={props.inputRef} />
		</div>
	);
}

class Grandparent extends Component {
	render() {
		return (
			<Parent
				inputRef={el => this.inputElement = el}
			/>
		);
	}
}
//--------------------------------------------------------------
// PUJA ARXIUS:

class PujaArxius extends Component {
    constructor(props){
    	super(props);

		this.fileSelect = this.fileSelect.bind(this);
		this.sendFiles = this.sendFiles.bind(this);
    	//this.selArxiusAmbAnchor = this.selArxiusAmbAnchor.bind(this);
	}
	
	fileSelect(ev) {
		const
			arxius = ev.target.files,
			preview = document.querySelector("#divPreview");

		for (let i=0; i < arxius.length; i++) {
			let
				arx = arxius[i],
				imageType = /^image\//;

				// if (!imageType.test(arx.type)){
				//   continue;
				// }
			let divArx = document.createElement("div");
			divArx.classList.add("divArx");
			preview.appendChild(divArx);

			let img = document.createElement("img");
			img.classList.add("obj");
			img.file = arx;
			divArx.appendChild(img);

			let prog = document.createElement("progress");
			prog.setAttribute("max", "100");
			prog.setAttribute("value", "0");
			divArx.appendChild(prog);

			//div.children.push(img).push(prog);
			//preview.appendChild(div);

			let reader = new FileReader();
			reader.onload = ((aImg) => {
				return (e) => aImg.src = e.target.result;
			})(img);
			reader.readAsDataURL(arx);
		}

		console.dir(arxius);
		//alert("Arxius seleccionats. Missatge a la consola.");

		this.sendFiles();
	}

    sendFiles() {
      	function FileUpload(img, file, prog) {
      		const reader = new FileReader();

            this.ctrl = prog;
            this.ctrl.update = (val) => this.ctrl.value = val;

      		const xhr = new XMLHttpRequest();
      		this.xhr = xhr;

      		const self = this;
      		this.xhr.upload.addEventListener("progress", function(e) {
      			if (e.lengthComputable) {
      				const percentage = Math.round((e.loaded * 100) / e.total);
					self.ctrl.update(percentage);
					console.log(`${percentatge}% uploaded`);  
      			}
      		}, false);

			xhr.upload.addEventListener("load", function(e) {
      			self.ctrl.update(100);
      		}, false);

      		xhr.open("PUT", "http://localhost:3000/file");
      		//xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
      		/* reader.onload = (evt) => {
      			xhr.send(evt.target.result);
			  }; */
			xhr.onload = (event) => {
				console.log('Done Uploading.');
			}
			
			//reader.readAsBinaryString(file);
			xhr.send(file);
  	    }

        const divArxs = document.querySelectorAll(`.divArx`);
	    //const imgs = document.querySelectorAll(`.obj`);

    	divArxs.forEach((divArx) => {
            const
                img = divArx.querySelector(`.obj`),
                prog = divArx.querySelector(`progress`);

            new FileUpload(img, img.file, prog);
        });
    }

  // selArxiusAmbAnchor(ev) {
  //   const inputFile = document.querySelector("#inFile");
  //
  //   inputFile.click();
  //   ev.preventDefault();
  // }

  render() {
  	return (
  	  <div>
  		<input type="file"
  		  id="inFile"
  		  multiple accept="image/*"
  		  style={{display: `none`}}
  		  onChange={this.fileSelect}
  		/>
  	  {/*  <a href="#" id="aSelArxius" onClick= this.selArxiusAmbAnchor}>Selecciona imatges (anchor)</a> */}
  		<label htmlFor="inFile">Selecciona imatges (label)</label>
  		<div id="divPreview" />
  	  </div>
  	);
  }
}


//********************************************************

const colorScale = [`grey`, `red`, `blue`, `lime`, `fuchsia`, `cyan`, `gold`];

export default class Experimental extends Component{
	constructor(props){
		super(props);

		this.state = {
			colorIndex: 0
		};

		this.changeColor = this.changeColor.bind(this);
	}

	changeColor() {
		this.setState(prevState => ({
			colorIndex: (prevState.colorIndex + 1) % colorScale.length
		}));
	}

	render(){
		return (
			<div>
				<SubExperimental
					color={colorScale[this.state.colorIndex]}
					mida={50}
					colorChange={this.changeColor}
				/>

				<SubExperimental
					color={colorScale[this.state.colorIndex]}
					mida={50}
					colorChange={this.changeColor}
				/>

				<SubExperimental
					color={colorScale[this.state.colorIndex]}
					mida={50}
					colorChange={this.changeColor}
				/>

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
				<hr />
				<NumberList numbers={numbers} />
				<hr />
				<Blog posts={content} />
				<hr />
				<NumberListEmbedMap numbers={numbers} />
				<hr />
				<hr />

				<NameForm />
				<hr />
				<EssayForm />
				<hr />
				<FlavorForm />
				<hr />
				<Reservation />
				<hr />
				<NameFormUncontrolled />

				<div id="divLiftingState">
					<h2>Lifting State: </h2>
					<Calculator />
				</div>

				<div id="divFunctionsAsChildren">
					<h2>Functions as children: </h2>
					<ListOfTenThings />
				</div>

				<div id="divRefsAndTheDOM">
					<h2>Refs and the DOM: </h2>
					<CustomTextInput />
					<AutoFocusTextInput />
				</div>

				<div id="divExposingDOMRefsToParentComponents">
					<h2>Exposing DOM Refs to Parent Components: </h2>
					<Grandparent />
				</div>

				<div id="divPujaArxius">
				  <h2>Puja Arxius: </h2>
				  <PujaArxius />
				</div>
			</div>
		)
	}
}

// Ara definim els sub-components:

class SubExperimental extends Component{
	constructor(props){
		super(props);

		this.applyColorChange = this.applyColorChange.bind(this);
	}

	applyColorChange() {
		this.props.colorChange();
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
			<div style={estil} onClick={this.applyColorChange}/>
		);
	}
}
