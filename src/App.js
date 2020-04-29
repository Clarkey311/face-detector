import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import { render } from 'react-dom';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'd31ac431680f47478c760f80dfec5230'
});

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

class App extends Component {
  constructor() {
    super ();
    this.state = {
      input: '',
      imageURL: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
    console.log(event.target.value);

  }

  onSubmit = () => {
    this.setState({imageURL: this.state.input})
    console.log('click');
    app.models
    .predict(
    Clarifai.COLOR_MODEL, this.state.input
    )
    .then(function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={ParticleOptions}
          />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecognition imageURL={this.state.imageURL}/>
      </div>
    );
  }

}

export default App;
