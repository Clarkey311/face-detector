import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';

const ParticleOptions = {
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
      <Particles className='particles'
        params={ParticleOptions}
        />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*<Logo />
      <ImageLinkForm />
      <FaceRecognition />
      */}
    </div>
  );
}

export default App;
