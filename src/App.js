import './App.css';
import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'

const app = new Clarifai.App({
	apiKey: '344ca45399914e78a05b74f1e8aa7d4a'
})


const particlesOpts = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
}


class App extends Component {
	constructor() {
		super();
		this.state = {
			input : '',
			imageUrl: '',
			stateBox: {},
			route: 'signin',
			isSignedIn: false,
		}
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		console.log(data.outputs[0].data.regions[0].data.concepts[0].name);
		return {
			leftCol: clarifaiFace.left_col * width,
      		topRow: clarifaiFace.top_row * height,
     		rightCol: width - (clarifaiFace.right_col * width),
     		bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	displayFaceBox = (newBox) => {
		this.setState = ({stateBox: newBox});
		console.log(newBox);
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models.predict(
			'e466caa0619f444ab97497640cefc4dc', 
			this.state.input)
		.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
		.catch(err => console.log(err))
	}

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState({isSignedIn: false})
		} else if (route === 'home') {
			this.setState({isSignedIn: true})
		}
		this.setState({route: route});
	}

	render() {
		return (
			<div className="App">
				<Particles className='particles' params={particlesOpts} />
				<Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
				{ this.state.route === 'home'
					? <div>
						<Logo />
						<Rank />
						<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
						<FaceRecognition box={this.state.stateBox} imageUrl={this.state.imageUrl}/>
					</div>
					: (this.state.route === 'signin' 
						? <SignIn onRouteChange={this.onRouteChange}/>
						: <Register onRouteChange={this.onRouteChange}/>
					)
				}
			</div>
		);
	}
  
}

export default App;

//console.log(response.outputs[0].data.regions[0].data.concepts[0].name)
//response.outputs[0].data.regions[0].region_info.bounding_box
//response.outputs[0].data.regions[0].data.concepts[0].name
