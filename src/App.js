import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
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
      imageURL: '',
      box: {},
      route: 'signIn',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {

    const clariaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clariaiFace.left_col * width,
      topRow: clariaiFace.top_row * height,
      rightCol: width - (clariaiFace.right_col * width),
      bottomRow: height - (clariaiFace.bottom_row * height)
    }
  };

  displayBox = (box) => {
    console.log('Box', box);
    this.setState({box: box});
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
    Clarifai.FACE_DETECT_MODEL, this.state.input
    )
    .then(response => this.displayBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signOut'){
      this.setState({isSignedIn: false})
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={ParticleOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <FaceRecognition imageURL={imageURL} box={box}/>
          </div>
        :(
          route === 'signIn'
          ? <SignIn onRouteChange={this.onRouteChange} />
          : <Register onRouteChange={this.onRouteChange} />
          )
        }     
      </div>
    );
  }
}



export default App;
