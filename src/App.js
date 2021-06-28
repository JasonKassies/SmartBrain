import './App.css';
import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';

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


function App() {
  return (
    <div className="App">
		<Particles className='particles' params={particlesOpts} />
    	<Navigation />
		<Logo />
		<Rank />
		<ImageLinkForm />
    </div>
  );
}

export default App;
