import './App.css';
import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
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
			box: {}
		}
	}

	calculateFaceLocation = (data) => {
		const face = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: face.leftCol * width,
			topRow: face.topRow * height,
			rightCol: width - (face.rightCol * width),
			bottomRow: height - (face.bottomRow * height)
		}
	}

	displayFaceBox = (box) => {
		this.setState = ({box: box});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value})
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models.predict(
			'e466caa0619f444ab97497640cefc4dc', 
			this.state.input)
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
			.catch(err => console.log(err))
	}

	render() {
		return (
			<div className="App">
				<Particles className='particles' params={particlesOpts} />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm onInputChange={this.onInputChange} 
							onButtonSubmit={this.onButtonSubmit}/>
				<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
			</div>
		);
	}
  
}

export default App;

//console.log(response.outputs[0].data.regions[0].data.concepts[0].name)
//response.outputs[0].data.regions[0].region_info.bounding_box
//response.outputs[0].data.regions[0].data.concepts[0].name
