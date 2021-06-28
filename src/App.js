import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import Rank from './Components/Rank/Rank'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'

function App() {
  return (
    <div className="App">
    	<Navigation />
		<Logo />
		<Rank />
		<ImageLinkForm />
    </div>
  );
}

export default App;
